import Dot from './dot'
import { Link } from '../utils/graph'
import Teleport from './teleport'
import Environ from './environ'
import Touchable, { ITouchable } from './touchable'
import MainScene from '../scene'
import { IRotatable } from '../utils/control'
import * as BABYLON from '@babylonjs/core'


export type Pos3D = {
	x: number
	y: number
	z: number
}

export default class Hdri implements IRotatable {
	public static canPlayAnim: boolean = false
	public static counter: number = 0
	private static environs: Environ[] = []
	public parentDot?: Dot
	private _texture?: string
	private currEnviron?: Environ

	constructor(
		public texture: string,
		public rotation: number,
		public touchablesInfo: ITouchable[] = []
	) {
		if (Hdri.environs.length > 0) return
		Hdri.environs = [new Environ(), new Environ()]
	}

	public async start() {
		this.currEnviron = this.getEnviron()
		if (!this.currEnviron) return
		while (!this._texture) {
			await new Promise(resolve => setTimeout(resolve, 300))
		}
		this.currEnviron.prepare(this.rotation, this._texture)
		while (!Hdri.canPlayAnim) {
			await new Promise(resolve => setTimeout(resolve, 300))
		}
		await this.showObjects()
		this.currEnviron.playForward()
		
		return this
	}

	public async loadTexture() {
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('2d') as CanvasRenderingContext2D
		const texture = new Image()
		texture.src = this.texture
		texture.onload = () => {
			canvas.width = texture.naturalWidth
			canvas.height = texture.naturalHeight
			context.drawImage(texture, 0, 0)
			const data = canvas.toDataURL('image/jpeg')
			this._texture = data
		}
	}

	private async showObjects() {
		await Promise.all([
			this.showTouchables(), 
			this.showTeleports(this.parentDot!)
		])
	}

	private async showTouchables() {
		await Touchable.Init(MainScene.instance.room)
		this.touchablesInfo.forEach((info: ITouchable) => {
			new Touchable(info, MainScene.instance)
		})
	}

	private async showTeleports(parentDot: Dot) {
		const links = Dot.graph.get(parentDot.id)
		if (!links) { return }
		links.forEach((link: Link) => new Teleport(parentDot, link))
	}

	public async disappear() {
		Touchable.realiseAll()
		Teleport.realiseAll()
		while (!Hdri.canPlayAnim) {
			await new Promise(resolve => setTimeout(resolve, 300))
		}
		if (!this.currEnviron) return
		this.currEnviron.playBackward()
		this.currEnviron = undefined
	}

	public async rotate(degrees: number) {
		if (!this.currEnviron) return
		this.rotation += degrees
		this.currEnviron?.rotate(this.rotation)
		await Dot.activeDot?.save({ rotation: undefined })
	}

	private getEnviron() {
		const currEnviron = Hdri.environs.shift() as Environ
		Hdri.environs.push(currEnviron)
		return currEnviron
	}

	public setParentDot(parentDot: Dot) {
		this.parentDot = parentDot
	}

	public updateTouchableDataPosition(modalName: string, newPosition: BABYLON.Vector3) {
		const info = this.touchablesInfo.find((touchable: ITouchable) => 
            touchable.modalName === modalName
		)
		if (!info) return
        info.position = {
            x: newPosition.x, 
            y: newPosition.y, 
            z: newPosition.z
        }
	}

	public static clear() {
		Hdri.environs = []
	}
	
}