import Game from "./game-class";
import Unit from "../WorldMap/unit";
import WorldMap from "../WorldMap/world-map";

export default class Commands {

    game:Game
    map: WorldMap

    constructor(game:Game) {
        this.game = game;
        this.map = game.worldRenderer.map
    }

    sendMoveEvent(unit:Unit, x:number, y:number) {
        this.map.pathfinder.findPath(unit.x, unit.y, x, y, path => {
            console.log(path);
        });
    }

}