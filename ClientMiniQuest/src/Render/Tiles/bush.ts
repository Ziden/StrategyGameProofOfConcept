
import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
import {CellMaterial} from "@babylonjs/materials"
import WorldRenderer from "../world-renderer";
import Objects from "../objects"
import TileData from "../../WorldMap/tile-data";


const _genTree = (x:number, y:number, renderer: WorldRenderer) => {
    var box = Objects.sphere("leaves_oak", new Color3(0.2,0.8,0.2), 0.3, 0.5, renderer, 2, StandardMaterial)
    var cm = box.material as StandardMaterial;
    cm.opacityTexture = cm.diffuseTexture
    cm.diffuseTexture.hasAlpha = true;

    box.position.y = 0;
    box.position.x = x
    box.position.z = y
    box.parent = renderer.ground;
}

export default (x:number, y:number, renderer:WorldRenderer) => {
    var size = renderer.rnd.choice([0.4, 0.5, 0.6, 0.7])
    let amt = renderer.rnd.nextRange(2, 6)
    var near = renderer.map.getNearbyTiles(x, y);
    const dirs = Object.keys(near)

    for(var dir in near) {
        var tile = near[dir]
        if(tile.hasTileData(TileData.BUSHES))
            amt += 4;
    }

    while(amt--) {
        const tX = x + renderer.rnd.nextFloat() - 0.5;
        const tY = y + renderer.rnd.nextFloat() - 0.5;
        _genTree(tX, tY, renderer);
    }
   


    const sizes = [0.1, 0.2, 0.3]

    
}