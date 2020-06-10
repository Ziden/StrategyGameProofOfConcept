import GameStream from "../Net/game-stream"

export default class Tile {
    
    tiledata: number
    resource: number
    owner: number
    building: number

    hasTileData(tileData:number) {
        return (this.tiledata & tileData) != 0;
    }

    deserialize(reader: GameStream) {
        this.tiledata = reader.readByte()
        this.resource = reader.readByte();
        this.building = reader.readByte();
        this.owner = reader.readByte();
    }

}