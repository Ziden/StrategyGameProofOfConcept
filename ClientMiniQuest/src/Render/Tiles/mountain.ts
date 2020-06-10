
import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
import WorldRenderer from "../world-renderer";
import Objects from "../objects"


const genStone = (x, y, renderer, sizes, thickness) => {
    var size = renderer.rnd.choice(sizes)
    var thick = renderer.rnd.choice(thickness)
    var sphere = Objects.sphere("stone_andesite", new Color3(1,1,1), thick, size, renderer,2)
    sphere.position.x = x;
    sphere.position.z = y;
    sphere.position.y = 0;
    sphere.parent = renderer.ground
    return sphere
}

export default (x:number, y:number, renderer:WorldRenderer) => {

    var mainStone = genStone(x, y, renderer, [1, 1.5, 2], [0.8, 0.9, 1])
    
    let floorRocks = renderer.rnd.nextRange(4, 8)
    while(floorRocks--) {
        var stone = genStone(x, y, renderer, [0.3, 0.5, 0.7, 0.9], [0.3, 0.5, 0.7]);
        stone.position.x = x + renderer.rnd.nextFloat() - 0.5;
        stone.position.z = y + renderer.rnd.nextFloat() - 0.5;
    }
    /*
    var box = Objects.box("stone_andesite", new Color3(1,1,1), 1, 0.6, renderer, 2)
    box.position.x = x;
    box.position.z = y;
    box.position.y = 0.3;
    box.parent = renderer.ground;
    
    const amt = renderer.rnd.nextRange(1, 5)
    const sizes = [0.1, 0.2, 0.3]

    for(var c = 0; c < amt; c++) {
        var sizeX = renderer.rnd.choice(sizes);
        var sizeY = renderer.rnd.choice(sizes);
        var box = Objects.box("stone_andesite", new Color3(1,1,1), sizeX, sizeY, renderer, 1.2)
        box.position.x = x + renderer.rnd.nextFloat() - 0.5;
        box.position.z = y + renderer.rnd.nextFloat() - 0.5;
        box.position.y = 0.6 + sizeY/2;
        box.parent = renderer.ground;
    }
    */

}