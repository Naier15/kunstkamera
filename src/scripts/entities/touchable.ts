import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'
import { Dispatch, SetStateAction } from 'react'
import { Pos3D } from './hdri'
import { ModalHistory } from '../../components/Tour'
import Dot from './dot'
import MainScene from '../scene'
import Axes from '../utils/axes'
import { serverHost } from '../..'
import { Modal, ModalDataType, RoomModalType } from '../../store/modalSlice'
import Control, { IMovable, KeyTransform } from '../utils/control'

interface IErrorResponse {
	code: number
	status: string
}

export interface IHooks {
	room: number
	setModalData: Dispatch<SetStateAction<Modal>>
	setModalHistory: Dispatch<SetStateAction<ModalHistory>>
}

interface IResponse extends RoomModalType, IErrorResponse {}

export interface ITouchable {
	position: Pos3D
	radius?: number
	modalName: string
	modalType: string
	cupboard: boolean
}

export default class Touchable implements IMovable {
    public static readonly TouchablesOn  : string = 'TOUCHACHABLES ON'
    public static readonly TouchablesOff : string = 'TOUCHACHABLES OFF'

    public static touchables:   Touchable[] = []
	public static isMovable:    boolean = false
	public static movableOne?:  Touchable
    public object:              BABYLON.TransformNode

    private static data?:       RoomModalType 
    private static cache:       Map<number, RoomModalType> = new Map<number, RoomModalType>()
	private isDraggable:        boolean = false
	private button:             GUI.Button
    private axes?:              Axes


	public static async Init(id: number) {
		if (!Touchable.cache.has(id)) {
			const result = await Touchable.getModalData(id)
			if (!result) return
			Touchable.cache.set(id, result)
		}
        Touchable.data = Touchable.cache.get(id)
	}

	constructor(private settings: ITouchable, private hooks: IHooks) {
        const transformNode = new BABYLON.TransformNode('', MainScene.instance.engine.scene)
		let obj: BABYLON.Mesh, wrapper: GUI.Image, inner: GUI.Image
		const icon = new GUI.Container('icon')
		if (this.settings.modalType === 'room') {
			obj = BABYLON.MeshBuilder.CreatePlane('rect', { width: 1.8, height: 1.8 })
			wrapper = new GUI.Image('tour-info-wrap', 'assets/tour-info-wrap.svg')
			inner = new GUI.Image('tour-info-inner', 'assets/tour-info-inner.svg')
		} else {
			obj = BABYLON.MeshBuilder.CreateDisc('disc', {
				radius: this.settings.radius || 0.6
			})
			wrapper = new GUI.Image('touchable-wrap', 'assets/touchable-wrap.svg')
			inner = new GUI.Image('touchable-inner', 'assets/touchable-inner.svg')
		}

		wrapper.scaleX = wrapper.scaleY = 0.9
		icon.addControl(wrapper)
		inner.scaleX = inner.scaleY = 0.6
		icon.addControl(inner)

		transformNode.position = new BABYLON.Vector3(
			this.settings.position.x,
			this.settings.position.y,
			this.settings.position.z
		)
        
		obj.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL
		const texture = GUI.AdvancedDynamicTexture.CreateForMesh(obj)
		texture.addControl(icon)
		this.button = GUI.Button.CreateSimpleButton('but', '')
		this.button.hoverCursor = 'pointer'
		this.button.onPointerEnterObservable.add(() => {
			wrapper.scaleX = wrapper.scaleY = 1
		})
		this.button.onPointerOutObservable.add(() => {
			wrapper.scaleX = wrapper.scaleY = 0.9
		})
		this.button.onPointerClickObservable.add((_, eventState: BABYLON.EventState) => {
            if (eventState.userInfo?.event.altKey) {
                this.delete()
                return
            }
			if (Touchable.isMovable) { // Режим админа (активировать перемещение)
                if (this.isDraggable) {
                    this.deactivateMove()
                } else {
                    Touchable.movableOne?.deactivateMove()
                    this.activateMove()
                }
                return
            }
			const item = Touchable.data?.modals.find((item: ModalDataType) => 
                item.modalName === this.settings.modalName
            )
			if (item === undefined) { return }

			this.hooks.setModalData({
				show: true,
				id: Touchable.data!.id,
				modalType: this.settings.modalType,
				modalName: this.settings.modalName,
				cupboard: this.settings.cupboard,
				info: item.info,
				data: item.content,
			})
			this.hooks.setModalHistory({
				modalType: this.settings.modalType,
				data: item.content,
				info: item.info,
			})
		})
		texture.addControl(this.button)
        obj.parent = transformNode
        this.object = transformNode
        Touchable.touchables.push(this)
	}

    public static realiseAll() {
        Touchable.touchables.forEach(value => value.dispose())
        Touchable.touchables = []
    }

    private static async getModalData(id: number) {
		const response = await fetch(`${serverHost}/modal/?id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
		if (!response.ok) return
		const data = (await response.json()) as IResponse
		if (data.code && data.code === 404) return
		return data
	}

	private activateMove() {
        this.axes = new Axes(this.object)
        Touchable.movableOne = this
        this.isDraggable = true
    }

    private deactivateMove() {
        this.axes = this.axes?.dispose()
        Touchable.movableOne = undefined
        this.isDraggable = false
    }

	public static toggleMovable() {
        if (Touchable.isMovable) {
            Touchable.isMovable = false
            Touchable.movableOne?.deactivateMove()
            Touchable.movableOne = undefined
        } else {
            Touchable.isMovable = true
        }
        return Touchable.isMovable
    }

    public stayBeyondCamera(distance: number = 15) {
        this.object.rotate(BABYLON.Axis.Y, MainScene.instance.engine.camera.rotation.y)
        this.object.translate(BABYLON.Axis.Z, distance)
        this.object.rotate(BABYLON.Axis.Y, -MainScene.instance.engine.camera.rotation.y)
    }

	public async transform(key: KeyTransform) {
        const newPosition = Control.transform(this.object.position, key)
        if (!newPosition) return
        this.object.position = newPosition
        if (!Dot.activeDot) return
        Dot.activeDot.hdri.updateTouchableDataPosition(this.settings.modalName, newPosition)
    }

    public delete() {
        if (!Dot.activeDot) return
        this.dispose()
        Dot.activeDot.hdri.touchablesInfo = Dot.activeDot.hdri.touchablesInfo.filter(
            (touchable: ITouchable) => touchable.modalName !== this.settings.modalName
        )
    }

    public dispose() {
        this.object.dispose()
    }
}
