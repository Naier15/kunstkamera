import * as BABYLON from '@babylonjs/core'
import MainScene from '../scene'
import Hdri from './hdri'
import { toRadians } from '../utils'


export default class Environ {
    public isActive: boolean
    public sphere:   BABYLON.Mesh

    constructor() {
        const material = new BABYLON.StandardMaterial('sphere_mat', MainScene.instance.engine.scene)
        material.backFaceCulling = false
        material.alpha = 0
        this.sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {}, MainScene.instance.engine.scene)
        this.sphere.position = new BABYLON.Vector3(0, 0, 0)
        this.sphere.scaling = new BABYLON.Vector3(1000, -1000, 1000)
        this.sphere.material = material

        this.createAlphaAnimation()
        this.isActive = false
    }

    public prepare(rotation: number, texture: string) {
        this.rotate(rotation)
        this.setTextute(texture)
    }

    public rotate(rotation: number) {
        const rotationInDegrees = toRadians(rotation)
        const rotationMatrix = BABYLON.Matrix.RotationAxis(BABYLON.Axis.Y, rotationInDegrees)
        this.sphere.setPivotMatrix(rotationMatrix, false)
    }

    public setTextute(texture: string) {
        const material = this.sphere.material as BABYLON.StandardMaterial
        const tex = new BABYLON.Texture(texture)
        tex.onLoadObservable.add(() => { Hdri.canPlayAnim = true })
		material.diffuseTexture = tex
    }

    public playForward() {
        this.isActive = true
        MainScene.instance.engine.scene.beginAnimation(this.sphere, 0, 30, false, 2.5)
    }

    public playBackward() {
        this.isActive = false
        MainScene.instance.engine.scene.beginAnimation(this.sphere, 30, 0, false, 2.5)
    }

    private createAlphaAnimation() {
		if (!this.sphere) { return }
		const animationAlpha = new BABYLON.Animation(
            "move", 
            "material.alpha", 
            30, 
            BABYLON.Animation.ANIMATIONTYPE_FLOAT, 
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
        )
		animationAlpha.setKeys([
            { frame: 0, value: 0 },
            { frame: 30, value: 1 },
        ])
		this.sphere.animations.push(animationAlpha)
    }
}