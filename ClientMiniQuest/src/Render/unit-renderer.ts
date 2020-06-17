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
        var sprite = this.renderer.textures.createSprite(unit.sprite);
        sprite.position.x = unit.x
        sprite.position.z = unit.y
        sprite.position.y = 1;
        sprite.playAnimation(0, 1, true, 150, ()=>{});
        sprite.name = unit.id.toString()
        return sprite;
    }

    updateUnitMesh(unit:Unit) {
        var mesh = null;
        var idStr = unit.id.toString()
        console.log(unit);
        if(idStr in this.units) {
            mesh = this.units[idStr];
        } else {
            mesh = this.createUnitMesh(unit);
            this.units[idStr] = mesh
        }
        if(mesh.position.x != unit.x || mesh.position.y != unit.y) {
            console.log("Updating unit mesh");
            mesh.position.x = unit.x;
            mesh.position.z = unit.y;
            mesh.position.y = 1;
        }
    }
}