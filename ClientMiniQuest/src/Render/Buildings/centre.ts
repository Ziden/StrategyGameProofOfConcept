import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
import {CellMaterial} from "@babylonjs/materials"
import WorldRenderer from "../world-renderer";
import Objects from "../objects"
import TileData from "../../WorldMap/tile-data";

var _genStump = (x:number, y:number, size: number, renderer:WorldRenderer) => {
    var log = Objects.box("log_oak", new Color3(1,1,1), 0.1, size, renderer, 0.5)
    log.position.y = size/2;
    log.position.x = x
    log.position.z = y
    log.parent = renderer.ground;
    return log;
}

export default (x:number, y:number, renderer:WorldRenderer) => {

    var box = Objects.box("planks_oak", new Color3(1,1,1), 0.9, 0.4, renderer, 2);
    box.position.x = x;
    box.position.y = 0.2;
    box.position.z = y;
    box.parent = renderer.ground;

    var plane = Objects.plane("door_spruce_lower", new Color3(1,1,1),0.15, 0.3, renderer, 1);
    plane.position.x = x-0.5;
    plane.rotation.y = Math.PI / 2;
    plane.position.y = 0.2;
    plane.position.z = y;
    plane.parent = renderer.ground;

    var log = _genStump(x-0.5, y-0.5, 0.5, renderer);

    var log = _genStump(x-0.45, y, 1, renderer);
    log.position.y = 0.5;
    log.rotation.x = Math.PI/2;

    
    var log = _genStump(x+0.45, y, 1, renderer);
    log.position.y = 0.5;
    log.rotation.x = Math.PI/2;

    /*
    var log = _genStump(x+0.45, y-0.25, 0.5, renderer);
    log.position.y = 0.75;
    log.rotation.x = Math.PI/4;

    var log = _genStump(x-0.45, y-0.25, 0.5, renderer);
    log.position.y = 0.75;
    log.rotation.x = Math.PI/4;
    */

    var log = _genStump(x-0.5, y+0.5, 0.5, renderer);
    var log = _genStump(x+0.5, y+0.5, 0.5, renderer);
    var log = _genStump(x+0.5, y-0.5, 0.5, renderer);

} 