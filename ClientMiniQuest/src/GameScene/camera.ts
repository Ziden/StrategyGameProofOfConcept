import { UniversalCamera, FreeCamera, Vector3 } from "@babylonjs/core"
import Game from "./game-class"
import CameraInput from "./camera-input"

export default class GameCamera  {

    private gameScene:Game
    public camera: FreeCamera

    constructor(gameScene: Game) {
        this.gameScene = gameScene;
        this.camera = new UniversalCamera("FreeCamera", new Vector3(0, 8, 0), gameScene.scene);
        this.camera.rotation = new Vector3(45, Math.PI, 0);
        this.camera.attachControl(gameScene.canvas)
        this.camera.rotation.y = 40;
        var inputManager = this.camera.inputs;
      
        inputManager.clear();
        inputManager.add(new CameraInput());
        console.log("Registered input");
    }
    
}