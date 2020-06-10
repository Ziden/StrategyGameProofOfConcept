import Tile from "./tile";
import GameStream from "../Net/game-stream";
import WorldMap from "./world-map"

export default class Chunk {

    public x: number
    public y: number
    public tiles: Tile[][];

    deserialize(reader: GameStream) {
        this.tiles = []
        this.x = reader.readUnsignedInt16();
        this.y = reader.readUnsignedInt16();
        console.log("Received chunk "+this.x+" "+this.y+" of chunk size "+WorldMap.CHUNK_SIZE);
        for(var x = 0 ; x < WorldMap.CHUNK_SIZE; x++) {
            this.tiles[x] = []
            for(var y = 0; y < WorldMap.CHUNK_SIZE; y++) {
                var tile = new Tile();
                tile.deserialize(reader);
                this.tiles[x][y] = tile;
            }
        }
    }
}