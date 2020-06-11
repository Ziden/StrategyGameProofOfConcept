import { Engine, HemisphericLight, Scene, Vector3 } from "@babylonjs/core"
import WorldRenderer from "../Render/world-renderer"
import Socket from "../Net/socket"
import WorldPacketListener from "../WorldMap/listener";
import GameCamera from "./camera"
import AuthEvent from "../ClientEvents/AuthEvent";

export default class Game {

    public scene:Scene
    public engine:Engine
    public socket:Socket
    public canvas:HTMLCanvasElement
    public camera:GameCamera
    public worldRenderer:WorldRenderer

    constructor() {
        this.canvas = document.getElementById("view") as HTMLCanvasElement
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
        this.camera = new GameCamera(this);
        this.worldRenderer = new WorldRenderer(this.scene)

        this.startWorld();
        this.startNetworking();  
        this.startLoop();  
    }

    startNetworking() {
        WorldPacketListener.register();
        this.socket = new Socket();
        this.socket.connect().then(this.sendInitialRequest.bind(this))
    }

    sendInitialRequest(e) {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('user');
        this.socket.send(new AuthEvent(userId));
    }

    startWorld() {
        new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            this.scene
        )
    }

    startLoop() {
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }
}