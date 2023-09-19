import * as BABYLON from '@babylonjs/core'


export interface IMovable {
    transform: (key: KeyTransform) => Promise<void>
}

export interface IRotatable {
    rotate: (degree: number) => Promise<void>
}

export enum KeyTransform {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT,
    UP,
    DOWN
}

export default class Control {

    public static async transformEvent(keyboardInfo: BABYLON.KeyboardInfo, movable?: IMovable) {
        if (!movable) return
        if (keyboardInfo.type === 1) {
            switch (keyboardInfo.event.code) {
                case 'KeyW':
                    await movable.transform(KeyTransform.FORWARD)
                    break
                case 'KeyS':
                    await movable.transform(KeyTransform.BACKWARD)
                    break
                case 'KeyA':
                    await movable.transform(KeyTransform.LEFT)
                    break
                case 'KeyD':
                    await movable.transform(KeyTransform.RIGHT)
                    break
                case 'KeyQ':
                    await movable.transform(KeyTransform.UP)
                    break
                case 'KeyE':
                    await movable.transform(KeyTransform.DOWN)
                    break
            }
        }
    }

    public static async rotateEvent(keyboardInfo: BABYLON.KeyboardInfo, rotatable: IRotatable) {
        if (!rotatable) return
        if (keyboardInfo.type === 1) {
            switch (keyboardInfo.event.code) {
                case 'Digit1':
                    await rotatable.rotate(1)
                    break
                case 'Digit3':
                    await rotatable.rotate(-1)
                    break
            }
        }
    }

    public static transform(position: BABYLON.Vector3, direction: KeyTransform) {
        let newPosition: BABYLON.Vector3 | undefined = position
        switch (direction) {
            case KeyTransform.FORWARD:
                newPosition = new BABYLON.Vector3(
                    ++position.x,
                    position.y,
                    position.z
                )
                break
            case KeyTransform.BACKWARD:
                newPosition = new BABYLON.Vector3(
                    --position.x,
                    position.y,
                    position.z
                )
                break
            case KeyTransform.LEFT:
                newPosition = new BABYLON.Vector3(
                    position.x,
                    position.y,
                    ++position.z
                )
                break
            case KeyTransform.RIGHT:
                newPosition = new BABYLON.Vector3(
                    position.x,
                    position.y,
                    --position.z
                )
                break
            case KeyTransform.UP:
                newPosition = new BABYLON.Vector3(
                    position.x,
                    ++position.y,
                    position.z
                )
                break
            case KeyTransform.DOWN:
                newPosition = new BABYLON.Vector3(
                    position.x,
                    --position.y,
                    position.z
                )
                break
            default:
                newPosition = undefined
        }
        return newPosition
    }
}