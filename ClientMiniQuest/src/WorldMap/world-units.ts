import WorldMap from "./world-map";
import Unit from "./unit";
import e from "../Net/packets";
import Guid from "../Net/guid";

export default class WorldUnits {

    map:WorldMap
    units: Record<string, Unit> = {};

    constructor(map: WorldMap) {
        this.map = map;
    }

    getUnit(id:string) {
        return this.units[id];
    }

    updateUnit(unit:Unit) {
        var idString = unit.id.toString()
        if(!(idString in this.units)) {
            console.log("Creating new unit");
            this.units[idString] = unit;
            this.map.tiles[unit.x][unit.y].units[idString] =unit;
        } else {
            console.log("Updating unit position");
        }
    }

}