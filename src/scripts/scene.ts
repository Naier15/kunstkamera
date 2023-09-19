import * as BABYLON from '@babylonjs/core'
import Hdri from './entities/hdri'
import Dot, { DotState, Pos2D } from './entities/dot'
import Store from './utils/store'
import Notification from './utils/notification';
import { Dispatch, SetStateAction } from 'react'
import { EditMode, ModalHistory } from '../components/Tour'
import { Location } from 'react-router-dom'
import Teleport from './entities/teleport'
import { serverHost } from '..'
import Touchable, { IHooks } from './entities/touchable'
import { Modal } from '../store/modalSlice'
import Control from './utils/control'
import Engine from './entities/engine'


interface IData {
	mapSize: 		IBlock
	cameraRotation: number
	dots: 			DotState[]
}

interface IErrorResponse {
	code: 	number
	status: string
}

interface IResponse extends IData, IErrorResponse {}

export interface IBlock extends Pos2D {
	width: 	number
	height: number
}

export default class MainScene implements IHooks {
	public static instance: MainScene
	public mapSize?: 		IBlock
	public room: 			number = 0
	public coef: 			IBlock = { x: 0, y: 0, width: 1, height: 1 }
	public engine: 			Engine

	private notification: 	Notification
	private resizeTimeout: 	NodeJS.Timeout | undefined

	constructor(
		public canvas: 			HTMLCanvasElement,
		public setIsLoading: 	Dispatch<SetStateAction<boolean>>,
		public setModalData: 	Dispatch<SetStateAction<Modal>>,
		public setModalHistory: Dispatch<SetStateAction<ModalHistory>>,
		public location: 		Location
	) {
		MainScene.instance = this
		this.engine = new Engine(this.canvas, true, {}, true)
			.addScene()
			.addCamera(canvas, BABYLON.Vector3.Zero(), 1.2)
			.addLight(new BABYLON.Color3(1, 1, 1), 5.5)
		this.notification = new Notification('notif')
	}

	public start() {
		this._resize()
		Store.reset()
		// Глобальные события
		if (this.location.pathname === '/admin') {
			this.engine.addListenerEvent(async (kbInfo) => {
				await Promise.all([
					Control.transformEvent(kbInfo, Touchable.movableOne!),
					Control.transformEvent(kbInfo, Teleport.movableOne!),
					Control.rotateEvent(kbInfo, Dot.activeDot!.hdri),
				])
			})
		}
		return this
	}

	public async loop() {
		this.engine.loop()
	}

	public static toggleChangeMode(mode: EditMode) {
		switch (mode) {
			case EditMode.Hdri:
				Teleport.toggleMovable()
				MainScene.instance.notification.display(Teleport.TeleportsOn)
				break
			case EditMode.Modal:
				Teleport.toggleMovable()
				Touchable.toggleMovable()
				MainScene.instance.notification.display(Touchable.TouchablesOn)
				break
			case EditMode.None:
				if (Touchable.isMovable) Touchable.toggleMovable()
				MainScene.instance.notification.display(Notification.ChangesOff)
				break
			default:
				return
		}
	}

	public async toggleLinks() {
		const shownLinks = await Dot.graph.toggleLinks()
		await this.notification.display(shownLinks ? Dot.LinksOn : Dot.LinksOff)
	}

	private resizeAction() {
		if (this.resizeTimeout) clearTimeout(this.resizeTimeout)
		this.resizeTimeout = setTimeout(async () => {
			this.engine.resize()
			this.createMapSize(true)
			await this.onRoomChanged(this.room)
		}, 800)
	}

	private _resize() {
		window.addEventListener('resize', this.resizeAction.bind(this))
		this.createMapSize()
	}

	private async getCoefs(receivedMapSize: IBlock): Promise<IBlock> {
		while (!this.mapSize) {
			await new Promise(resolve => setTimeout(resolve, 500))
		}
		return {
			x: receivedMapSize ? Math.abs(this.mapSize!.x - receivedMapSize.x) : 0,
			y: receivedMapSize ? Math.abs(this.mapSize!.y - receivedMapSize.y) : 0,
			width: receivedMapSize ? this.mapSize!.width / receivedMapSize.width : 1,
			height: receivedMapSize ? this.mapSize!.height / receivedMapSize.height : 1
		}
	}

	private createMapSize(now: boolean = false) {
		const dots = document.getElementById('dots')
		if (!dots) return
		const mapInner = document.getElementById('map-inner') as HTMLElement
		const action = () => {
			this.mapSize = {
				x: dots.offsetLeft,
				y: dots.offsetTop,
				width: dots.clientWidth,
				height: dots.clientHeight,
			}
		}
		action()
		if (!now) mapInner.addEventListener('load', () => action())
	}

	private async makeRequest() {
		const response = await fetch(`${serverHost}/scene/?stage=${this.room}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
		if (!response.ok) return
		const data = (await response.json()) as IResponse
		if (
			(data.code && data.code === 404) ||
			(data.dots && Object.keys(data.dots).length === 0)
		) {
			this.setIsLoading(false)
			return
		}
		return data as IData
	}

	private async getCache(data: IData) {
		this.engine.camera.rotation = new BABYLON.Vector3(0, data.cameraRotation || 0, 0)
		this.coef = await this.getCoefs(data.mapSize)
		
		const dots = data.dots.map(async (dotState: DotState) => {
			Dot.graph.set(dotState.id, dotState.links)
			return (
				await Dot.New(
					new Hdri(
						dotState.texture, 
						dotState.rotation, 
						dotState.touchables
					),
					{
						x: dotState.position.x * this.coef.width + this.coef.x,
						y: dotState.position.y * this.coef.height + this.coef.y,
					},
					dotState.active,
					dotState.id
				)
			).start()
		})
		await Promise.all(dots) // asynchronously start all dots
	}

	public async saveCache() {
		const dotsData = await Promise.all(
			Array.from(Dot.dots.values()).map(async dot => {
				const data = await dot.store.load()
				data.active = data.active || false
				data.links = Dot.graph.get(data.id) || []
				data.touchables = dot.hdri.touchablesInfo
				return data
			})
		)
		const data = {
			mapSize: this.mapSize,
			cameraRotation: this.engine.camera.rotation.y,
			dots: dotsData,
		}
		await fetch(`${serverHost}/scene/?stage=${this.room}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data as IData),
		})
	}

	public async onRoomChanged(room: number) {
        if (room === this.room) return
        this.setIsLoading(true)
        this.room = room
        const request = this.makeRequest()
		Store.reset()
        await Dot.delete()
        const response = await request
        if (response) await this.getCache(response)
	}

	public async exit() {
		this.room = 0
		Store.reset()
		this.engine.dispose()
		window.removeEventListener('resize', this.resizeAction.bind(this))
		await Dot.delete()
	}

}
