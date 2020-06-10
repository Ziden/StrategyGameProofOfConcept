import Tile from "./tile";
import GameStream from "../Net/game-stream";
import ChunkMap from "./chunk-map";
import forEach2D from "./arrays";
import Chunk from "./chunk";
import Direction from "./direction";

export default class WorldMap {
    
    static CHUNK_SIZE: number

    seed: number
    chunkMap: ChunkMap
    tiles: Tile[][]

    deserialize(reader: GameStream) {
        var version = reader.readByte();
  
        WorldMap.CHUNK_SIZE = reader.readUnsignedInt16();
        this.seed = reader.readUnsignedInt16();
        console.log("World Version "+version);
        console.log("Chunk size "+WorldMap.CHUNK_SIZE);
        console.log("SEED: "+this.seed);

        this.chunkMap = new ChunkMap();
        this.chunkMap.deserialize(reader);
        this._copyChunkToTileArray();
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
        for(var chunkX=0; chunkX < this.chunkMap.chunks.length; chunkX++) {
            for(var chunkY=0; chunkY < this.chunkMap.chunks.length; chunkY++) {
                var chunk = this.chunkMap.chunks[chunkX][chunkY];
                for(var tileX = 0; tileX < WorldMap.CHUNK_SIZE; tileX++) {
                    var tileXX = (chunk.x * WorldMap.CHUNK_SIZE) + tileX;
                    if(this.tiles[tileXX]==undefined) {
                        this.tiles[tileXX] = []
                    }
                    for(var tileY = 0; tileY < WorldMap.CHUNK_SIZE; tileY++) {
                        var tileYY = (chunk.y * WorldMap.CHUNK_SIZE) + tileY;
                        this.tiles[tileXX][tileYY] = chunk.tiles[tileX][tileY];
                    }
                }
            }
        }
    }
}

