import * as BABYLON from '@babylonjs/core'
import MainScene from '../scene'


export default class Axes { 

    private object: BABYLON.AxesViewer

    constructor(private _node: BABYLON.Node) {
        this.object = new BABYLON.AxesViewer(
            MainScene.instance.engine.scene, 3,
            undefined, undefined, undefined, undefined, 3
        )
        this.object.xAxis.parent = this._node
        this.object.yAxis.parent = this._node
        this.object.zAxis.parent = this._node
    }

    public dispose() {
        this.object.dispose()
        return undefined
    }
}