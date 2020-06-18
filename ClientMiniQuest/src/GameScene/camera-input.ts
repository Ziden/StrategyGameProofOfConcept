import { FreeCamera, Vector3, ICameraInput, Axis } from "@babylonjs/core"
import GameScene from "./game"

export default class CameraInput implements ICameraInput<FreeCamera> {
    public camera: FreeCamera
    private _keys: [number]
    private keysLeft: [number]
    private keysRight: [number]
    private keysUp: [number]
    private keysDown: [number]
    private sensibility: number

    private startingPoint:Vector3
    private currentDragPoint:Vector3
    public draggingCamera:boolean
    private rotate:boolean

    constructor() {
        this._keys = [-1];
        this.keysLeft = [37];
        this.keysRight = [39];
        this.keysUp = [38];
        this.keysDown = [40];

        this.sensibility = 1;
        window.addEventListener("keydown", this._onKeyDown.bind(this), false);
        window.addEventListener("keyup", this._onKeyUp.bind(this), false);

        window.addEventListener("pointerdown", this.onPointerDown.bind(this), false);
        //window.addEventListener("pointerup", this.onPointerUp.bind(this), false);
        window.addEventListener("pointermove", this.onPointerMove.bind(this), false);
        window.addEventListener("wheel", this.onMouseWheel.bind(this), false);
        
    }

    onMouseWheel(event) {
        const delta = Math.sign(event.deltaY);
        this.camera.position.y += delta;
    }
   
    getCurrentGroundPoint() {
        var scene = this.camera._scene
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == GameScene.worldRenderer.ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }
        return null;
    }

    getHoverMesh() {
        var scene = this.camera._scene
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== GameScene.worldRenderer.ground; });
        return pickInfo
    }

    onPointerUp(evt:PointerEvent) {
        if (this.currentDragPoint) {
            const totalMoved = this.camera.position.subtract(this.startingPoint);
            const pixelsMoved = Math.abs(totalMoved.x) + Math.abs(totalMoved.z);
            this.currentDragPoint = null;
            this.draggingCamera = false;
            if(pixelsMoved > 1) {
                evt.preventDefault();
                evt.stopPropagation();
                return true;
            }
        }
        return false;;
    }

    onPointerDown(evt:MouseEvent) {
        if(evt.button==0) {
            this.currentDragPoint = this.getCurrentGroundPoint();
            this.startingPoint = this.camera.position.clone();
            this.rotate = false;
        } else if(evt.button == 2) {
            this.currentDragPoint = this.getCurrentGroundPoint();
            this.rotate = true;
        }   
    }

    onPointerMove(evt:MouseEvent) {
       this.draggingCamera = true;
    }

    getClassName(): string {
        return "RTSCamera"
    }

    getTypeName() {
        return "RTSGameCamera"
    }

    getSimpleName() {
        return "rtscam";
    }

    _onKeyDown(evt:KeyboardEvent, noPreventDefault?:boolean) {
        console.log(evt.keyCode);
        if (
            this.keysLeft.indexOf(evt.keyCode) !== -1 ||
            this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
            var index = this._keys.indexOf(evt.keyCode);
            if (index === -1) {
                this._keys.push(evt.keyCode);
            }
            if (!noPreventDefault)
                evt.preventDefault();
            //}
        }
    }

    _onKeyUp(evt:KeyboardEvent, noPreventDefault?:boolean) {
        if (
            this.keysLeft.indexOf(evt.keyCode) !== -1 ||
            this.keysRight.indexOf(evt.keyCode) !== -1
        ) {
            var index = this._keys.indexOf(evt.keyCode);
            if (index >= 0) {
                this._keys.splice(index, 1);
            }
            if(!noPreventDefault)
                evt.preventDefault();
            // 
        }
    }

    attachControl(element, noPreventDefault) {
        console.log("Attaching input");
        //element.addEventListener("keydown", this._onKeyDown.bind(this), false);
        //element.addEventListener("keyup", this._onKeyUp.bind(this), false);
        /*
        BABYLON.Tools.RegisterTopRootEvents(canvas, [
            { name: "blur", handler: this._onLostFocus }
        ]);
        */
    }

    detachControl(element) {
        if (this._onKeyDown) {
            element.removeEventListener("keydown", this._onKeyDown);
            element.removeEventListener("keyup", this._onKeyUp);
            /*
            BABYLON.Tools.UnregisterTopRootEvents(canvas, [
              { name: "blur", handler: this._onLostFocus }
            ]);
            */
            this._keys = [-1];
            this._onKeyDown = null;
            this._onKeyUp = null;
          }
     }

    checkInputs() { 
        if(this.draggingCamera) {
            if (!this.currentDragPoint) {
                return;
            }
            var groundPoint = this.getCurrentGroundPoint();
             
            if (!groundPoint) {
                return;
            }
    
            var diff = groundPoint.subtract(this.currentDragPoint);

            if(!this.rotate) {
                this.camera.position.subtractInPlace(diff);
                groundPoint.subtractInPlace(diff);
            }
            else 
                GameScene.worldRenderer.ground.rotate(Axis.Y, 0.1);

            this.currentDragPoint = groundPoint;
        }

        if (this._onKeyDown) {
            var camera = this.camera;
            for (var index = 0; index < this._keys.length; index++) {
              var keyCode = this._keys[index];
            }
          }
    }

}