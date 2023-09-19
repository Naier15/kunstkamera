import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'
import Dot, { Pos2D } from "./dot"
import { Link } from '../utils/graph'
import Hdri from './hdri'
import Axes from '../utils/axes'
import Control, { IMovable, KeyTransform } from '../utils/control'


export default class Teleport implements IMovable {
    public static readonly TeleportsOn  : string = 'TELEPORTS ON'
    public static readonly TeleportsOff : string = 'TELEPORTS OFF'

    public static isMovable:    boolean = false
    public static movableOne?:  Teleport

    private static teleports:   Teleport[] = []
    private disc:               BABYLON.Mesh
    private texture:            GUI.AdvancedDynamicTexture
    private button:             GUI.Button
    private img:                GUI.Image
    private isDraggable:        boolean = false
    private position:           Pos2D
    private linkedDot:          Dot
    private axes?:              Axes

    constructor(public parentDot: Dot, public link: Link) {
        this.img = new GUI.Image('image', 'assets/unactive_dot.png')
        if (Dot.firstRender) {
            if (this.img.isLoaded) { Dot.firstRender = false }
            else { this.img.onImageLoadedObservable.add(() => { Dot.firstRender = false }) }
        }

        this.linkedDot = Dot.dots.get(link.id) as Dot
        this.position = link.position

        this.disc = BABYLON.MeshBuilder.CreateDisc('disc', { radius: 1.3 })
        this.disc.position = new BABYLON.Vector3(this.position.x, -10, this.position.y)
        this.disc.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, Math.PI/2, 0);

        this.texture = GUI.AdvancedDynamicTexture.CreateForMesh(this.disc)
        this.texture.addControl(this.img)

        this.button = GUI.Button.CreateSimpleButton('but', '')
        this.button.hoverCursor = 'pointer'
        this.button.onPointerEnterObservable.add(() => {
            this.disc.scaling = new BABYLON.Vector3(1.2, 1.2, 1.2)
        })
        this.button.onPointerOutObservable.add(() => {
            this.disc.scaling = new BABYLON.Vector3(1, 1, 1)
        })
        this.button.onPointerClickObservable.add(async () => {
            if (Teleport.isMovable) { // Режим админа (активировать перемещение)
                if (this.isDraggable) {
                    this.deactivateMove()
                } else {
                    Teleport.movableOne?.deactivateMove()
                    this.activateMove()
                }
                return
            }
            Hdri.canPlayAnim = false
            if (Dot.activeDot && this.parentDot) {
                await Promise.all([
                    Dot.activeDot.hdri.disappear(),
                    Dot.activeDot.deactivate(),
                    this.linkedDot.mouseDownHandler(this.parentDot.element)
                ])
            }
        })

        this.texture.addControl(this.button)
        Teleport.teleports.push(this)
    }

    public static realiseAll() {
        Teleport.teleports.forEach(teleport => teleport.dispose())
		Teleport.teleports = []
    }

    private activateMove() {
        this.axes = new Axes(this.disc)
        Teleport.movableOne = this
        this.isDraggable = true
    }

    private deactivateMove() {
        this.axes = this.axes?.dispose()
        Teleport.movableOne = undefined
        this.isDraggable = false
    }

    public dispose() {
        this.disc.dispose()
    }

    public static toggleMovable() {
        if (Teleport.isMovable) {
            Teleport.isMovable = false
            Teleport.movableOne?.deactivateMove()
        } else {
            Teleport.isMovable = true
        }
        return Teleport.isMovable
    }

    public async transform(key: KeyTransform) {
        if (key === KeyTransform.UP || key === KeyTransform.DOWN) return
        const newPosition = Control.transform(this.disc.position, key)
        if (!newPosition) return
        this.disc.position = newPosition
        await Dot.graph.updateLinkPositions(
            this.parentDot.id, 
            this.linkedDot.id, 
            { x: newPosition.x, y: newPosition.z }
        )
    }

}