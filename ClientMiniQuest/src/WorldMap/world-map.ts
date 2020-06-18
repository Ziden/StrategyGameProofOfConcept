import Tile from "./tile";
import GameStream from "../Net/game-stream";
import ChunkMap from "./chunk-map";
import Direction from "./direction";
import WorldUnits from "./world-units";
import { js as PathFinder } from "easystarjs"

export default class WorldMap {
    
    static CHUNK_SIZE: number

    pathfinder: PathFinder 
    seed: number
    chunkMap: ChunkMap
    tiles: Tile[][]
    pathfindMap: number[][]
    units: WorldUnits

    deserialize(reader: GameStream) {
        var version = reader.readByte();
        WorldMap.CHUNK_SIZE = reader.readUshort();
        this.seed = reader.readUshort();
        console.log("World Version "+version);
        console.log("Chunk size "+WorldMap.CHUNK_SIZE);
        console.log("SEED: "+this.seed);
        this.units = new WorldUnits(this);
        this.chunkMap = new ChunkMap(this);
        this.chunkMap.deserialize(reader);
        this._copyChunkToTileArray();
        this.pathfinder = new PathFinder();
        this.pathfinder.setGrid(this.pathfindMap)
        this.pathfinder.setAcceptableTiles([0]);
        this.pathfinder.setIterationsPerCalculation(100);
        this.pathfinderCalculationTick();
    }

    pathfinderCalculationTick() {
        this.pathfinder.calculate(); // continue async path calculations
        setTimeout(this.pathfinderCalculationTick.bind(this), 1000);
    }

    getNearbyTiles(x:number, y:number) {
        const near:Record<number, Tile> = {}
        if(x+1 < this.tiles.length)
            near[Direction.EAST] = this.tiles[x+1][y];
        if(x-1 >= 0)
            near[Direction.WEST] = this.tiles[x-1][y];
        if(y+1 < this.tiles.length)
            near[Direction.NORTH] = this.tiles[x][y+1];
        if(y-1 >= 0)
            near[Direction.SOUTH] = this.tiles[x][y-1];
        return near;
    }

    _copyChunkToTileArray() {
        this.tiles = []
        this.pathfindMap = []
        for(var chunkX=0; chunkX < this.chunkMap.chunks.length; chunkX++) {
            for(var chunkY=0; chunkY < this.chunkMap.chunks.length; chunkY++) {
                var chunk = this.chunkMap.chunks[chunkX][chunkY];
                for(var tileX = 0; tileX < WorldMap.CHUNK_SIZE; tileX++) {
                    var tileXX = (chunk.x * WorldMap.CHUNK_SIZE) + tileX;
                    if(this.tiles[tileXX]==undefined) {
                        this.tiles[tileXX] = []
                        this.pathfindMap[tileXX] = []
                    }

                    for(var tileY = 0; tileY < WorldMap.CHUNK_SIZE; tileY++) {
                        var tileYY = (chunk.y * WorldMap.CHUNK_SIZE) + tileY;
                        this.tiles[tileXX][tileYY] = chunk.tiles[tileX][tileY];
                        var tile = this.tiles[tileXX][tileYY];
                        tile.x = tileXX;
                        tile.y = tileYY;
                        this.pathfindMap[tileXX][tileYY] =  tile.isPassable() ? 0 : 1
                    }
                }
            }
        }
    }
}

