import Store from '../utils/store'
import Hdri from './hdri'
import MainScene from '../scene'
import Graph, { Link } from '../utils/graph'
import { ITouchable } from './touchable'

export type Pos2D = {
	x: number
	y: number
}

export interface DotState {
	id: 		number
	position: 	Pos2D
	active: 	boolean
	texture: 	string
	rotation: 	number
	links: 		Link[]
	touchables: ITouchable[]
}

export interface DotStateOptions {
	id?: 		number
	position?: 	Pos2D
	active?: 	boolean
	texture?: 	string
	rotation?: 	number
	links?: 	Link[]
}

enum DotColor {
	ACTIVE = '#F18772',
	UNACTIVE = 'transparent',
}

export default class Dot {
	public static readonly LinksOn : string = 'LINKS ON'
    public static readonly LinksOff : string = 'LINKS OFF'
	public static dotsCounter: number = 0
	public static activeTag?: HTMLDivElement = undefined
	public static activeDot?: Dot = undefined
	public static dots: Map<number, Dot> = new Map()
	public static graph: Graph = new Graph()
	public static firstRender: boolean = true

	public name: string
	public store: Store
	private isDragging: boolean = false
	private enable: boolean = true
	public position: Pos2D = { x: 0, y: 0 }

	constructor(
		public element: HTMLDivElement,
		public hdri: Hdri,
		public startPosition: Pos2D,
		public active: boolean,
		public id: number
	) {
		this.name = `dot-#${id}`
		this.store = new Store(this.id, this.name)
		this.hdri.setParentDot(this)

		if (this.element && MainScene.instance.location.pathname === '/admin') {
			document.addEventListener('mousedown', this.onMouseDown.bind(this))
			document.addEventListener('mouseup', this.onMouseUp.bind(this))
			document.addEventListener('mousemove', this.onMouseMove.bind(this))
		}
	}

	public async start() {
		await this.loadData()
		if (this.active) {
			await this.activate()
			while (Dot.firstRender) {
				await new Promise(resolve => setTimeout(resolve, 500))
			}
			MainScene.instance.setIsLoading(false)
		}
		return this
	}

	public async remove() {
		document.removeEventListener('mousedown', this.onMouseDown.bind(this))
		document.removeEventListener('mouseup', this.onMouseUp.bind(this))
		document.removeEventListener('mousemove', this.onMouseMove.bind(this))
	}

	private async onMouseDown(event: MouseEvent) {
		const target = event.target as HTMLDivElement

		if (target && this.element === target) {
			// Создание связи активной точки с текущей точки
			if (Dot.graph.shownLinks && Dot.activeDot !== this) {
				await this.toggleLinkHandler()
				return
			}
			// Выйти из текущей точки
			if (Dot.activeDot) {
				await Promise.all([
					Dot.activeDot.hdri.disappear(),
					Dot.activeDot.deactivate(),
				])
			}
			// Удаление точки
			if (event.altKey === true) {
				await this.deleteDotHandler(target)
				return
			}
			// Начало передвижения точки
			await this.mouseDownHandler(target)
			this.isDragging = true
			this.startPosition = {
				x: this.element.offsetLeft - event.pageX,
				y: this.element.offsetTop - event.pageY,
			}
		}
	}

	private async onMouseMove(event: MouseEvent) {
		if (this.isDragging && this.element === Dot.activeTag) {
			window.getSelection()?.removeAllRanges()
			const x = event.pageX + this.startPosition.x
			const y = event.pageY + this.startPosition.y
			await this.save({ position: { x, y } }, false)
		}
	}

	private async onMouseUp(event: MouseEvent) {
		if (this.element === Dot.activeTag) {
			Dot.activeTag = undefined
			this.isDragging = false
			await this.save({ position: undefined })
		}
	}

	public async activate() {
		this.active = true
		this.element.style.background = DotColor.ACTIVE
		Dot.activeTag = this.element as HTMLDivElement
		Dot.activeDot = this
		await Promise.all([this.hdri.start(), this.store.save({ active: true })])
	}

	public async deactivate() {
		this.active = false
		this.element.style.background = DotColor.UNACTIVE
		await this.store.save({ active: false })
	}

	public async getPosition() {
		const left = this.element.style.left
		const top = this.element.style.top
		const x = typeof left === 'string' ? parseInt(left, 10) : left
		const y = typeof top === 'string' ? parseInt(top, 10) : top
		return { x, y } as Pos2D
	}

	private async toggleLinkHandler() {
		const linkedDots = Dot.graph.get(Dot.activeDot!.id)
		if (!linkedDots) return
		if (linkedDots.some(link => link.id === this.id)) {
			Dot.graph.removeLink(this, Dot.activeDot!)
		} else {
			Dot.graph.addLink(this, Dot.activeDot!)
		}
	}

	private async deleteDotHandler(target: HTMLDivElement) {
		this.enable = false
		Dot.dots.delete(this.id!)
		Dot.graph.deleteLink(this)
		target.parentElement?.removeChild(target)
		Dot.activeDot = undefined
		localStorage.removeItem(this.name)
	}

	public async mouseDownHandler(target: HTMLDivElement) {
		Dot.activeTag = target
		Dot.activeDot = this
		await this.activate()
	}

	private async loadData() {
		const state = await this.store.load()
		await this.hdri.loadTexture()
		await this.save({
			texture: state && state.texture ? state.texture : this.hdri.texture,
			rotation: state && state.rotation ? state.rotation : this.hdri.rotation,
			position: state && state.position ? state.position : this.startPosition,
		})
	}

	public async save(
		state: DotStateOptions,
		saveInLocalstorage: boolean = true
	) {
		let dataToSave = {} as DotStateOptions
		for (const key in state) {
			switch (key) {
				case 'texture':
					this.hdri.texture = state.texture!
					dataToSave = { texture: state.texture, ...dataToSave }
					break
				case 'rotation':
					if (state.rotation) {
						this.hdri.rotation = state.rotation
					}
					dataToSave = { rotation: this.hdri.rotation, ...dataToSave }
					break
				case 'position':
					if (state.position) {
						this.element.style.left = state.position.x + 'px'
						this.element.style.top = state.position.y + 'px'
						this.position = state.position
					} else {
						this.position = await this.getPosition()
					}
					dataToSave = { position: this.position, ...dataToSave }
					break
				default:
					break
			}
		}
		if (this.enable && saveInLocalstorage) {
			await this.store.save(dataToSave)
		}
	}

	public static async New(
		hdri: Hdri,
		position: Pos2D,
		active: boolean,
		id?: number
	) {
		const newDotTag = document.createElement('div')
		newDotTag.id = `dot`
		document.getElementById('dots')?.appendChild(newDotTag)
		if (!id) {
			while (Dot.dots.has(Dot.dotsCounter)) {
				Dot.dotsCounter++
			}
			id = Dot.dotsCounter
		}
		const newDot = new Dot(newDotTag, hdri, position, active, id)
		Dot.dots.set(newDot.id, newDot)
		return newDot
	}

	public static async delete() {
		Dot.dots.forEach(async dot => await dot.remove())
		await Dot.activeDot?.hdri.disappear()
		Dot.dotsCounter = 0
		Dot.activeDot = undefined
		Dot.activeTag = undefined
		Dot.dots.clear()
		Hdri.clear()
		Dot.graph.clear()
		const dots = document.getElementById('dots')
		dots?.querySelectorAll('*').forEach(child => child.remove())
	}

}
