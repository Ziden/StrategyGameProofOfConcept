
import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
import WorldRenderer from "../world-renderer";
import Objects from "../objects"
import Direction from "../../WorldMap/direction";
import TileData from "../../WorldMap/tile-data";



const genHill = (x, y, renderer, sizes, thickness) => {
    var size = renderer.rnd.choice(sizes)
    var thick = renderer.rnd.choice(thickness)
    var sphere = Objects.sphere("grass_top", WorldRenderer.GRASS_COLOR, thick, size, renderer,2)
    sphere.position.x = x;
    sphere.position.z = y;
    sphere.position.y = 0;
    sphere.parent = renderer.ground
    return sphere
}


export default (x:number, y:number, renderer:WorldRenderer) => {

    var size = renderer.rnd.choice([0.6, 0.7, 0.8])
    var sphere = Objects.sphere("grass_top", WorldRenderer.GRASS_COLOR, 1, size, renderer,2)
    sphere.position.x = x;
    sphere.position.z = y;
    sphere.position.y = -0.1;
    sphere.parent = renderer.ground

    /*
    let floorRocks = renderer.rnd.nextRange(1, 4)
    while(floorRocks--) {
        var stone = genHill(x, y, renderer, [0.2, 0.3, 0.4], [0.6, 0.8, 0.9]);
        stone.position.x = x + renderer.rnd.nextFloat() - 0.5;
        stone.position.z = y + renderer.rnd.nextFloat() - 0.5;
    }
    */

    var stone = genHill(x, y, renderer, [0.4], [1.2]);
    stone.position.x = x
    stone.position.z = y;

    var near = renderer.map.getNearbyTiles(x, y)
    if(Direction.SOUTH in near && near[Direction.SOUTH].hasTileData(TileData.HILL)) {
        var sphere = Objects.sphere("grass_top", WorldRenderer.GRASS_COLOR, 1, size, renderer,2)
        sphere.position.x = x;
        sphere.position.z = y-0.5;
        sphere.position.y = -0.1;
        sphere.parent = renderer.ground
    } 

    if(Direction.EAST in near && near[Direction.EAST].hasTileData(TileData.HILL)) {
        var sphere = Objects.sphere("grass_top", WorldRenderer.GRASS_COLOR, 1, size, renderer,2)
        sphere.position.x = x+0.5;
        sphere.position.z = y;
        sphere.position.y = -0.1;
        sphere.parent = renderer.ground
    } 

    /*
    var box = Objects.box("grass_top", new Color3(1,1,1), 1, 0.2, renderer, 2)
    box.position.x = x;
    box.position.z = y;
    box.position.y = 0.2;
    box.parent = renderer.ground;
    
    const amt = renderer.rnd.nextRange(1, 5)
    const sizes = [0.1, 0.2, 0.3]

    for(var c = 0; c < amt; c++) {
        var sizeX = renderer.rnd.choice(sizes);
        var sizeY = renderer.rnd.choice(sizes);
        var box = Objects.box("grass_top", new Color3(1,1,1), sizeX, sizeY, renderer, 1.2)
        box.position.x = x + renderer.rnd.nextFloat() - 0.5;
        box.position.z = y + renderer.rnd.nextFloat() - 0.5;
        box.position.y = 0.6 + sizeY/2;
        box.parent = renderer.ground;
    }
    */

}