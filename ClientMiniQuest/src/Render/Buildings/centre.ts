
import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
import {CellMaterial} from "@babylonjs/materials"
import WorldRenderer from "../world-renderer";
import Objects from "../objects"
import TileData from "../../WorldMap/tile-data";

var _genStump = (x:number, y:number, size: number, renderer:WorldRenderer) => {
    var log = Objects.box("log_oak", new Color3(1,1,1), 0.1, size, renderer)
    log.position.y = size/2;
    log.position.x = x
    log.position.z = y
    log.parent = renderer.ground;
    return log;
}

export default (x:number, y:number, renderer:WorldRenderer) => {
    console.log("CENTROOOOOO");
    var log = _genStump(x, y, 0.5, renderer);
    log.rotation.z = 45;
}