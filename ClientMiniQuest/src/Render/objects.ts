import {Scene, MeshBuilder, Mesh, StandardMaterial, Color3} from "@babylonjs/core"
import WorldRenderer from "./world-renderer";

export default class Objects {
    
    static cache: Record<string, Mesh> = {}

    static plane(text: string, color:Color3, w:number, h:number, renderer:WorldRenderer, textScale:number=1, type=null) {
        const key = "p"+text+":"+w+":"+h+""+color+""+textScale;
        if(!(key in this.cache)) {
            var plane = MeshBuilder.CreatePlane(text, {width:w, height:h,updatable:false}, renderer.scene)
            plane.material = renderer.textures.getBlock(text, color, textScale, type);
            this.cache[key] = plane;
        }
        return this.cache[key].clone();
    }

    static box(text:string, color:Color3, w:number, h:number, renderer:WorldRenderer, textScale:number=1, type=null) {
        const key = text+":"+w+":"+h+""+color+""+textScale;
        if(!(key in this.cache)) {
            var box = MeshBuilder.CreateBox(text, {size: w, height:h }, renderer.scene);
            var mat = renderer.textures.getBlock(text, color, textScale, type);
            box.material = mat;
            this.cache[key] = box;
        }
        return this.cache[key].clone();
    }

    static sphere(text:string, color :Color3, w:number, h:number, renderer:WorldRenderer, textScale:number=1, type=null) {
        const key = "s"+text+":"+w+""+h+""+color;
        if(!(key in this.cache)) {
            var box = MeshBuilder.CreateSphere(text, {diameterX: w, diameterZ:w, diameterY:h }, renderer.scene);
            var mat = renderer.textures.getBlock(text, color, textScale, type);
            box.material = mat;
            this.cache[key] = box;
        }
        return this.cache[key].clone();
    }

}