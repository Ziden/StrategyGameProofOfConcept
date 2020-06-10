
import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
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

const _genTree = (x:number, y:number, renderer: WorldRenderer) => {
    var size = renderer.rnd.choice([0.4, 0.5, 0.6, 0.7])
    var log = _genStump(x, y, size, renderer)
    var box = Objects.sphere("leaves_oak", new Color3(0.2,0.8,0.2), 0.3, 0.5, renderer, 2, StandardMaterial)
    var cm = box.material as StandardMaterial;
    cm.opacityTexture = cm.diffuseTexture
    cm.diffuseTexture.hasAlpha = true;
    box.position.y = size + (0.25);
    box.position.x = x
    box.position.z = y
    box.parent = renderer.ground;
}

export default (x:number, y:number, renderer:WorldRenderer) => {

    var size = renderer.rnd.choice([0.4, 0.5, 0.6, 0.7])

    let amt = renderer.rnd.nextRange(1, 4)

    var near = renderer.map.getNearbyTiles(x, y);

    for(var dir in near) {
        var tile = near[dir]
        if(tile.hasTileData(TileData.FOREST))
            amt += 2;
    }

    while(amt--) {
        const tX = x + renderer.rnd.nextFloat() - 0.5;
        const tY = y + renderer.rnd.nextFloat() - 0.5;
        _genTree(tX, tY, renderer);
    }
   


    const sizes = [0.1, 0.2, 0.3]

    
}