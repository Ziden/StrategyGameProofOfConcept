import { Engine, HemisphericLight, Scene, Vector3, Sprite } from "@babylonjs/core"
import WorldRenderer from "../Render/world-renderer"
import Socket from "../Net/socket"
import WorldPacketListener from "../WorldMap/listener";
import GameCamera from "./camera"
import AuthEvent from "../ClientEvents/AuthEvent";
import Unit from "../WorldMap/unit";
import GameUI from "../UI/game-ui";
import ClientEvents from "./commands";

export default class Game {

    public scene:Scene
    public engine:Engine
    public socket:Socket
    public canvas:HTMLCanvasElement
    public camera:GameCamera
    public worldRenderer:WorldRenderer
    public ui:GameUI
    public events:ClientEvents

    constructor() {
        this.canvas = document.getElementById("view") as HTMLCanvasElement
        this.engine = new Engine(this.canvas, true);
        this.scene = new Scene(this.engine);
        this.camera = new GameCamera(this);
        this.worldRenderer = new WorldRenderer(this.scene)
        this.scene.autoClear = false;
        this.scene.autoClearDepthAndStencil = false; 
        this.events = new ClientEvents(this);
        this.ui = new GameUI(this.worldRenderer)

        //var click = () => { setTimeout( , 1)}
        //this.scene.onPointerDown = click;
        this.scene.onPointerUp = this.onClick.bind(this);
        this.scene.onPointerMove = this.onPointerMove.bind(this);
        this.startWorld();
        this.startNetworking();  
        this.startLoop();  
    }

    onPointerMove(ev:PointerEvent) {
        var picks = this.scene.pick(this.scene.pointerX, this.scene.pointerY, mesh => mesh == this.worldRenderer.ground);
        if(picks.hit) {
            const x = Math.floor(picks.pickedPoint.x-0.5)
            const z = Math.floor(picks.pickedPoint.z-0.5); 
            this.ui.onMouseMove(x, z);
        }
    }

    getCursorTile() {
        var picks = this.scene.pick(this.scene.pointerX, this.scene.pointerY, mesh => mesh == this.worldRenderer.ground);
        const x = Math.floor(picks.pickedPoint.x-0.5)+1;
        const z = Math.floor(picks.pickedPoint.z-0.5)+1; 
        return this.worldRenderer.map.tiles[x][z];
    }

    onClick(evt:PointerEvent) {
        const controllingCamera = this.camera.input.onPointerUp(evt);
        if(controllingCamera) {
            return;
        }

        var pick = this.scene.pickSprite(this.scene.pointerX, this.scene.pointerY);
        if (pick.hit) {

            // Selecting Unit
            if(pick.pickedSprite) {
                const unitId = pick.pickedSprite.name;
                var unit = this.worldRenderer.map.units.getUnit(unitId);
                this.ui.unitDisplay.display(unit);
            }     
         
        } else {
            if(this.ui.unitDisplay.displaying) {
                const tile = this.getCursorTile();
                if(tile)
                    this.ui.displayUnitOptions(this.ui.unitDisplay.displaying, tile);
            }
            //
            // this.ui.unitDisplay.display(null);     
        }

        var picks = this.scene.pick(this.scene.pointerX, this.scene.pointerY);
        if(picks.hit) {

        }
    }

    proccessDeltas() {
        console.log("Processing Deltas");
        Unit.DeltaFlagged.forEach(unit => {
            this.worldRenderer.unitRenderer.updateUnitMesh(unit);
            this.worldRenderer.map.units.updateUnit(unit);
        });
        Unit.DeltaFlagged = [];
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