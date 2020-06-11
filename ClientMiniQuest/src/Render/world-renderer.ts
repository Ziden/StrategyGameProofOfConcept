import { Scene, Mesh, SubMesh, Texture, StandardMaterial, MeshBuilder, Color3, MultiMaterial, Material } from "@babylonjs/core"
import WorldMap from "../WorldMap/world-map"
import TileData from "../WorldMap/tile-data"
import Mountain from "./Tiles/mountain";
import Forest from './Tiles/forest';
import Textures from "./textures"

import {CellMaterial } from "@babylonjs/materials"
import URL from "../index";
import Randomizer from "./randomizer";
import bush from "./Tiles/bush";
import hill from "./Tiles/hill"
import cityCentre from "./Buildings/centre"

enum Materials {
    FOREST = 0, 
    WATER = 1, 
    MOUNTAIN = 2, 
    BUSH = 3,  
    HILL = 4,  
    NONE = 5    
}

enum Buildings {
    CITY_CENTRE = 1
}

export default class WorldRenderer {

    rnd: Randomizer
    scene: Scene
    ground: Mesh
    map: WorldMap
    floors: Record<number, Material> = {}
    textures: Textures
    static GRASS_COLOR = new Color3(0.38, 0.66, 0.37)

    constructor(scene) {
        this.scene = scene;
        this.floors = {};

        this.textures = new Textures(scene);

        this.floors[Materials.NONE] = this._createFloor("None", WorldRenderer.GRASS_COLOR, "grass_top");
        this.floors[Materials.FOREST] = this._createFloor("Forest",WorldRenderer.GRASS_COLOR, "grass_top");
        this.floors[Materials.WATER] = this._createFloor("Water", Color3.White(), "wool_colored_blue");
        this.floors[Materials.MOUNTAIN] = this._createFloor("Mountain", WorldRenderer.GRASS_COLOR, "grass_top");
        this.floors[Materials.BUSH] = this._createFloor("BUSH", new Color3(0.48, 0.66, 0.37), "grass_top");
        this.floors[Materials.HILL] = this._createFloor("HILL", WorldRenderer.GRASS_COLOR, "grass_top");
    }

    _createFloor(name:string, color:Color3, texture:string=null) {
        var mat = null;
        if(texture!=null && this.textures != undefined)
            mat = this.textures.getBlock(texture, color)
        else {
            mat = new StandardMaterial("block", this.scene);
            mat.diffuseColor = color;
        }
        //mat.diffuseColor = color;
        //mat.disableLighting = true;
        //mat.alpha = 0.9999;	
        //mat.alphaMode=BABYLON.Engine.ALPHA_COMBINE
        //mat.diffuseTexture.uScale = mat.diffuseTexture.vScale = 3;
        //mat.computeHighLevel = true;
        mat.freeze();
        return mat;
    }

    _decorate(world:WorldMap, x:number, y:number) {
        var tile = world.tiles[x][y];
        if(tile.hasTileData(TileData.FOREST)) {
            Forest(x, y, this);
        }
        if(tile.hasTileData(TileData.MOUNTAIN)) {
            Mountain(x, y, this);
        }
        if(tile.hasTileData(TileData.HILL)) {
            hill(x, y, this);
        }
        if(tile.building==Buildings.CITY_CENTRE)
            cityCentre(x, y, this);
    }

    getFloorMaterial(world:WorldMap, x:number, y:number) {
        var tile = world.tiles[x][y];
        if(tile.hasTileData(TileData.FOREST)) {
        
            return Materials.FOREST;
        }
        if(tile.hasTileData(TileData.MOUNTAIN)) {
            return Materials.MOUNTAIN;
        }
        if(tile.hasTileData(TileData.HILL)) {
            return Materials.HILL;
        }
        
        if(tile.hasTileData(TileData.WATER))
            return Materials.WATER;

        if(tile.hasTileData(TileData.BUSHES)) {
            bush(x, y, this);
            return Materials.BUSH;
        }
            
        return Materials.NONE
    }

    render(world: WorldMap) {
        console.log("Rendering world");
        this.rnd = new Randomizer(world.seed);
        this.map = world;
        const size = world.tiles.length;
        const groundSize = size;

        var grid = {w: size, h: size};
        var tileOptions = {
            xmin: -0.5, zmin: -0.5, xmax: groundSize-0.5, zmax: groundSize-0.5,
            subdivisions: grid,
            precision: {
                w:1, h:1
            }
        }

        var mats = Object.keys(Material);

        var multimat = new MultiMaterial("multi", this.scene);
        for(var m=0; m < mats.length; m++) {
            var mat = this.floors[m];
            multimat.subMaterials.push(mat);
        }
           
        var ground = MeshBuilder.CreateTiledGround("Ground", tileOptions, this.scene);
     
        ground.material = multimat;
        
        var verticesCount = ground.getTotalVertices();
        var tileIndicesLength = ground.getIndices().length / (grid.w * grid.h);

        this.ground = ground;

        ground.subMeshes = [];
        var base = 0;
        for (var row = 0; row < grid.h; row++) {
            for (var col = 0; col < grid.w; col++) {
                this._decorate(world, col, row);
                const idxMat = this.getFloorMaterial(world, col, row);
                const subMesh = new SubMesh(idxMat, 0, verticesCount, base , tileIndicesLength, ground);
                ground.subMeshes.push(subMesh);
                base += tileIndicesLength;
            }
        } 
    }
}