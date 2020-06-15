import { Texture, Scene, Color3, Mesh, SpriteManager, Sprite } from "@babylonjs/core"
import { CellMaterial } from "@babylonjs/materials"

export default class Textures {

    scene:Scene
    spriteManagers:Record<string, SpriteManager> = {}
    cache: Record<string, CellMaterial> = {}

    constructor(scene: Scene) {
        this.scene = scene;
    }

    getSpriteSheet(name:string) {
        if(name in this.spriteManagers) {
            return this.spriteManagers[name];
        } 
        var url = "/resources/textures/sprites/"+name+".png";
        this.spriteManagers[name] = new SpriteManager("sprites", url, 256, 32, this.scene);
        return this.spriteManagers[name]
    }

    createSprite(id:number) {
        var sheet = this.getSpriteSheet("sprites");
        var player = new Sprite("sprite", sheet);
        player.cellIndex = id * 2;
        player.width = 0.3;
        player.height = 0.3;
        return player;
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
