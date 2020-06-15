import Chunk from "./chunk";
import GameStream from "../Net/game-stream";
import Tile from "./tile";
import WorldMap from "./world-map";

export default class ChunkMap {

    chunks: Chunk[][]
    map: WorldMap

    constructor(map: WorldMap) {
        this.map = map;
    }

    deserialize(reader: GameStream) {
        var sizeX = reader.readUshort();
        var sizeY = reader.readUshort();
        this.chunks = [];
        console.log("Received chunk map "+sizeX+"x"+sizeY);
        for(var x = 0; x < sizeX; x++) {
            this.chunks[x] = [];
            for(var y = 0; y < sizeY; y++) {
                var chunk = new Chunk();
                chunk.map = this.map;
                chunk.deserialize(reader);
                this.chunks[x][y] = chunk;  
            }
        }
    }
}