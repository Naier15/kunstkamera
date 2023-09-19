import * as BABYLON from '@babylonjs/core'


export default class Engine extends BABYLON.Engine {

    private _scene?: 	BABYLON.Scene
	private _camera?:   BABYLON.FreeCamera
    private _sun?: 	    BABYLON.HemisphericLight

    public addScene() {
        this._scene = new BABYLON.Scene(this)
		this._scene.clearColor = new BABYLON.Color4(0, 0, 0, 1)
        return this
    }

    public addCamera(canvas: HTMLCanvasElement, position: BABYLON.Vector3, fov: number) {
        if (!this._scene) throw new Error('Engine does not have a scene')
		this._camera = new BABYLON.FreeCamera('Main Camera', position, this._scene)
        this._camera.fov = fov
		this._camera.inputs.addMouse()
		this._camera.attachControl(canvas, true)
        return this
    }

    public addLight(color: BABYLON.Color3, intensity: number) {
        if (!this._scene) throw new Error('Engine does not have a scene')
        this._sun = new BABYLON.HemisphericLight('Sun', new BABYLON.Vector3(0, 1, 0), this._scene)
		this._sun.diffuse = color
		this._sun.intensity = intensity
        return this
    }

    public loop() {
        this.runRenderLoop(async () => this._scene!.render())
    }

    public addListenerEvent(action: (kbInfo: BABYLON.KeyboardInfo) => Promise<void>) {
        this.scene.onKeyboardObservable.add(action)
    }

    public get scene() {
        if (!this._scene) throw new Error('Engine does not have a scene')
        return this._scene
    }

    public get camera() {
        if (!this._camera) throw new Error('Engine does not have a camera')
        return this._camera
    }
}