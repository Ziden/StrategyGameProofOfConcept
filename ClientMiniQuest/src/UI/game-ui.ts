
import { GUI3DManager } from "@babylonjs/gui";
import Unit from "../WorldMap/unit";
import UserData from "../Net/user-data";
import { Scene } from "@babylonjs/core";

export default class GameUI {

    manager:GUI3DManager

    constructor(scene:Scene) {
        this.manager = new GUI3DManager(scene);
    }

}