//Creating FUNCTIONS
function createMap(tile, map, bot){
    var position = 0;
    var x;
    var y;
    for (var i = 0; i < cols; i ++) {
        for (var j = 0; j < rows; j ++){
            x = j * tileDim;
            y = i * tileDim;
            //draw map
            if (map[position] == 1){
                var newTile = new Tile('floor',x,y,floor,true);
                tile.push(newTile);
            }
            else if (map[position] == 'I'){
                var newTile = new Tile('fakeClear',x,y,clear,true);
                tile.push(newTile);
            }
            else if (map[position] == 2){
                var newTile = new Tile('wall',x,y,wall,true);
                tile.push(newTile);
            }
            else if (map[position] == 3){
                var newTile = new Tile('stairs',x,y,stairs,false);
                tile.push(newTile);
            }

            else if (map[position] == 4){
                var logo = tfl_logo.get(0,0,16,16);
                var newTile = new Tile('tfl_logo',x,y,logo,false);
                tile.push(newTile);
            }
            else if (map[position] == 5){
                var logo = tfl_logo.get(16,0,16,16);
                var newTile = new Tile('tfl_logo',x,y,logo,false);
               tile.push(newTile);
            }
            else if (map[position] == 6){
                var logo = tfl_logo.get(16,16,16,16);
                var newTile = new Tile('tfl_logo',x,y,logo,false);
                tile.push(newTile);
            }
            else if (map[position] == 7){
                var logo = tfl_logo.get(0,16,16,16);
                var newTile = new Tile('tfl_logo',x,y,logo,false);
                tile.push(newTile);
            }

            //gate
            else if (map[position] == 'w'){
                var gatePic = gate_closed.get(0,0,16,16);
                var newTile = new Tile('gate',x,y,gatePic,true);
                tile.push(newTile);
            }
            else if (map[position] == 'x'){
                var gatePic = gate_closed.get(0,16,16,16);
                var newTile = new Tile('gate',x,y,gatePic,true);
               tile.push(newTile);
            }

            //trains sign
            else if (map[position] == 'y'){
                var trainPic = trainSign.get(0,0,16,16);
                var newTile = new Tile('sign',x,y,trainPic,false);
                tile.push(newTile);
            }
            else if (map[position] == 'z'){
                var trainPic = trainSign.get(16,0,16,16);
                var newTile = new Tile('sign',x,y,trainPic,false);
               tile.push(newTile);
            }


            //draw coin
            else if (map[position] == 8){
                var newTile = new Tile('coin',x,y,coin,false);
                tile.push(newTile);
            }
            //draw oyster
            else if (map[position] == 9){
                var newTile = new Tile('oyster',x,y,oyster,false);
                tile.push(newTile);
            }
            else if (map[position] == 'b'){
                var newTile = new Tile('see-through',x,y,clear,false);
                tile.push(newTile);
                createBot(x,y,bot);
            }

            //draw background
            else {
                var newTile = new Tile('see-through',x,y,clear,false);
                tile.push(newTile);
            }
            position ++;
        }
    }
}

function createBot(x,y,bot){
    var newBot = new Bot('bot',x,y,botSkin);
    newBot.dirX = 1;
    bot.push(newBot);
}
