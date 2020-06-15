import WorldRenderer from "./world-renderer";
import Unit from "../WorldMap/unit";
import Objects from "./objects";
import { Color3, Mesh, SpriteManager } from "@babylonjs/core";

export default class UnitRenderer {
    
    renderer: WorldRenderer
    units: Record<number, Mesh> = {}

    constructor(renderer:WorldRenderer) {
        this.renderer = renderer;
    }

    createUnitMesh(unit: Unit) {
        var sprite = this.renderer.textures.createSprite(0);
        sprite.position.x = unit.x
        sprite.position.z = unit.y
        sprite.position.y = 1;
        sprite.playAnimation(0, 1, true, 150, ()=>{});
    }

    updateUnitMesh(unit:Unit) {
        var mesh = null;
        var idStr = unit.id.toString()
        if(idStr in this.units) {
            mesh = this.units[idStr];
        } else {
            mesh = this.createUnitMesh(unit);
            this.units[idStr] = mesh
        }
        console.log("Updating unit");
        mesh.position.x = unit.x;
        mesh.position.z = unit.y;
        mesh.position.y = 1;
    }
}