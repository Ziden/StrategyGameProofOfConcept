import GameStream from "../Net/game-stream"
import Unit from "./unit"
import Chunk from "./chunk"
import GameScene from "../GameScene/game"

export default class Tile {
    
    chunk: Chunk
    tiledata: number
    resource: number
    owner: number
    building: number
    unexplored: boolean = false
    units: Record<number, Unit> = {}

    hasTileData(tileData:number) {
        return (this.tiledata & tileData) != 0;
    }

    deserialize(stream: GameStream) {
        var metaFlags:number = stream.readByte();
        if((metaFlags & TileMetaFlags.UNEXPLORED) != 0) {
            this.unexplored = true;
            return;
        }

        this.tiledata = stream.readByte();   

        if((metaFlags & TileMetaFlags.RESOURCE) != 0)
            this.resource = stream.readByte();   
        if((metaFlags & TileMetaFlags.BUILT) != 0) 
            this.building = stream.readByte();
        if((metaFlags & TileMetaFlags.OWNED) != 0) 
           this.owner = stream.readByte();    
        if((metaFlags & TileMetaFlags.HASUNITS) != 0) {
            var amt = stream.readByte();
            while(amt--) {
                var unit = new Unit()
                unit.deserialize(stream);
                unit.flagDelta();
            }
        }      
    }
}

enum TileMetaFlags
{
    NONE = 0,
    OWNED = 1 << 0,
    BUILT = 1 << 1,
    RESOURCE = 1 << 2,
    UNEXPLORED = 1 << 3,
    HASUNITS = 1 << 4
}