import { Texture, Scene, Color3, Mesh } from "@babylonjs/core"
import { CellMaterial } from "@babylonjs/materials"

export default class Textures {

    scene:Scene

    cache: Record<string, CellMaterial> = {}

    constructor(scene: Scene) {
        this.scene = scene;
    }

    getBlock(name:string, color:Color3, scale:number=1, matType=null) {
        if(matType==null)
            matType = CellMaterial

        const key = name+":"+color+""+scale+":"+matType;
        if(this.cache != undefined && key in this.cache) {
            return this.cache[key];
        }
        var url = "/resources/textures/blocks/"+name+".png";
        var mat = new matType(name, this.scene);
        mat.diffuseTexture = new Texture(url, this.scene);
        var tex = mat.diffuseTexture as Texture;
        tex.uScale = scale;
        tex.vScale = scale;
        mat.diffuseColor = color;
        this.cache[key] = mat;
        return mat;
    }
}
