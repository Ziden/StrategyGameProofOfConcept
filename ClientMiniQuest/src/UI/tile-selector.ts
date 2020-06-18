import { Scene, Mesh, Vector3, MeshBuilder } from "@babylonjs/core";
import GameScene from "../GameScene/game"
import WorldRenderer from "../Render/world-renderer";

export default class TileSelector {

    mesh:Mesh
    scene:Scene

    constructor(renderer:WorldRenderer) {
        this.scene=renderer.scene;
        var size = 1;
        var myPoints = [
            new Vector3(0, size, 0),
            new Vector3(0, size, 1),
            new Vector3(1, size, 1),
            new Vector3(1, size, 0),
            new Vector3(0, size, 0),
            new Vector3(0, 0, 0),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(1, 0, 1),
            new Vector3(1, 0, 0),
            new Vector3(0, 0, 0),
            new Vector3(1, 0, 1),
            new Vector3(1, size, 1),
            new Vector3(0, size, 1),
            new Vector3(0, 0, 1),
            new Vector3(1, 0, 0),
            new Vector3(1, size, 0),
        ];
        this.mesh = MeshBuilder.CreateLines("tile-selector", {points: myPoints}, this.scene); 
        this.mesh.parent = renderer.ground
        this.mesh.setEnabled(false);
    }

    moveTo(x:number, y:number) {
        this.mesh.position.x = x+0.5;
        this.mesh.position.z = y+0.5;
    }
}