
import { GUI3DManager, Button3D,TextBlock, StackPanel3D, AdvancedDynamicTexture, HolographicButton } from "@babylonjs/gui";
import Unit from "../WorldMap/unit";
import UserData from "../Net/user-data";
import { Scene, Vector3 } from "@babylonjs/core";
import UnitDisplay from "./unit-display";
import TileSelector from "./tile-selector";
import WorldRenderer from "../Render/world-renderer";
import Tile from "../WorldMap/tile";

export default class GameUI {

    manager:GUI3DManager
    unitDisplay: UnitDisplay
    tileSelector: TileSelector
    uitexture: AdvancedDynamicTexture
    renderer: WorldRenderer

    constructor(renderer:WorldRenderer) {
        this.manager = new GUI3DManager(renderer.scene);
        this.unitDisplay = new UnitDisplay();
        this.tileSelector = new TileSelector(renderer);
        this.uitexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.renderer = renderer;
    }

    buildUnitOptions() {
     
    }

    displayUnitOptions(unit: Unit, tile:Tile) {
           // Create a horizontal stack panel
           var panel = new StackPanel3D();
           this.manager.addControl(panel);
           panel.node.rotation.y = Math.PI;
           panel.node.rotate(new Vector3(0,1, 0), 2*Math.PI - Math.PI/3);
           panel.node.rotate(new Vector3(1,0, 0), Math.PI/3);
           panel.margin = 0.02;
           panel.position.x = tile.x;
           panel.position.z = tile.y;
           panel.isVertical = false;
           panel.position.y = 2;

           this.addButton(panel, "Move")
           this.addButton(panel, "Harvest")
           this.addButton(panel, "Check")
       
    }

    addButton(panel:StackPanel3D, text:string) {
        var button = new Button3D("orientation");
        panel.addControl(button);
        /*
        button.onPointerUpObservable.add(function(){
          
        });   
        */ 
        var text1 = new TextBlock();
        text1.text = text;
        text1.color = "white";
        text1.fontSize = 24;
        button.content = text1;  
    }

    onMouseMove(tileX:number, tileY:number) {
        if(this.unitDisplay.displaying) {
            if(!this.tileSelector.mesh.isEnabled()) {
                this.tileSelector.mesh.setEnabled(true);
            }
            this.tileSelector.moveTo(tileX, tileY);
        } else {
            if(this.tileSelector.mesh.isEnabled()) {
                this.tileSelector.mesh.setEnabled(false);
            }
        }
      
    }

}