import Unit from "../WorldMap/unit"

export default class UnitDisplay {

    unitInfo: HTMLElement
    unitName: HTMLElement
    unitIcon: HTMLElement
    displaying: Unit

    constructor() {
        this.unitInfo = document.getElementById("unit-info")
        this.unitName = document.getElementById("unit-name")
        this.unitIcon = document.getElementById("unit-icon")
    }

    display(unit: Unit) {
        this.displaying = unit;
        if(unit == null) {
      
            this.unitInfo.style.display = "none";
            return;
        }
        this.unitName.innerHTML = unit.name
        const unitSpriteIndex = -64 * unit.sprite;
        this.unitIcon.style.backgroundPositionX = unitSpriteIndex+"px";
        this.unitInfo.style.display = "block";
        console.log("Displaying unit "+unit.id.toString());
    }

}