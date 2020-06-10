import WorldMap from "../WorldMap/world-map";
import TileData from "../WorldMap/tile-data"
export default  {

    print(world: WorldMap) {
        console.log("Printing world");
        var mapSize = world.tiles.length;

        for(var x = 0 ; x < mapSize; x++) {
            var line ="";
            for(var y = 0 ; y < mapSize; y++) {
                var tile = world.tiles[x][y];
                
                if (tile == null)
                    line += "N";
                else if (tile.hasTileData(TileData.FOREST)) {
                    line += "|";
                }
                else if (tile.hasTileData(TileData.BUSHES)) {
                    line += "B";
                }
                else if (tile.hasTileData(TileData.MOUNTAIN)) {
                    line += "A";
                }
                else
                    line += "-";
            }
            console.log(line);
        }
    }

}