function changeLevel(tile,bot,x,y){
  currentTileset = tile;
  currentBotset = bot;
  player.x=x;
  player.y=y;
}


function winsize(){
    winwid = windowWidth;
    winhgt = windowHeight;
    if (winwid>canvasDim){
        winwid = canvasDim;
    }
    if (winhgt>canvasDim){
        winhgt = canvasDim;
    }
}

//move mouse around tile by tile, displaying selected tile coord
function tiledMouse(){
    var gridX = pixel2Grid(mouseX)*16;
    var gridY = pixel2Grid(mouseY)*16;
    fill(255, 0, 255, 80)
    rect(gridX,gridY,tileDim,tileDim);
    noStroke();
    var s = "X: " + gridX/16 + " Y: " + gridY/16;
    fill(0);
    text(s, 0, canvasDim);
}

function check(){
    for(var i = 0; i < tile.length; i++){
        var t = intersects(tile[i]);
        if(t && tile[i].solid == true){
            text('intersects', 0, canvasDim);
        }
    }
}

function intersects(t){
        var xIntersect;
        var yIntersect;
        //x intersect
        if(player.x > t.xMax || player.xMax < t.x){
            xIntersect = true;
        }
        else{
            xIntersect = true;
        }

        //y intersect
        if(player.y > t.yMax || player.yMax < t.y){
            yIntersect = false;
        }
        else{
            yIntersect = true;
        }

        //x and y
        if (xIntersect == true && yIntersect == true){
            return true;
        }
        else{
            return false;
        }
    }

//state if the tile that player is in is a solid
function checkSolid(){

}

function checkSolidAllOld(){
    //xMin, xMax, yMin, yMax
    //x variables
//    var xMin = pixel2Grid(player.x);
//    var xMax = pixel2Grid(player.x + tileDim);
//
//    //y variables
//    var yMin = pixel2Grid(player.y);
//    var yMid = pixel2Grid(player.y + tileDim);
//    var yMax = pixel2Grid(player.y + tileDim*2);
//
//    //find the tile that the corner is in
//    var tl = grid2Array(xMin,yMin);
//    var tr = grid2Array(xMax,yMin);
//    var ml = grid2Array(xMin,yMid);
//    var mr = grid2Array(xMax,yMid);
//    var bl = grid2Array(xMin,yMax);
//    var br = grid2Array(xMax,yMax);
//
    //indicators
//    if(tile[tl].solid == true || tile[ml].solid == true || tile[bl].solid == true){
//        dirX = 1;
//        player.moveX();
//    }
//    if(tile[tr].solid == true || tile[mr].solid == true || tile[br].solid == true){
//        dirX = -1;
//        player.moveX();
//    }
//
//    if(tile[bl].solid == true || tile[br].solid == true){
//        //text('floor', 0, canvasDim);
//        fall = false;
//    }
//    else{
//        fall=true;
//    }
//    //xMax, xMin, yMax, yMin
//    var xMax = player.x + tileDim;
//    var xMin = player.x;
//    var yMax = player.y + tileDim*2;
//    var yMin = player.y;
//
//    //which grid reference is it
//    var xMaxGrid = pixel2Grid(xMax);
//    var xMinGrid = pixel2Grid(xMin);
//    var yMaxGrid = pixel2Grid(yMax);
//    var yMinGrid = pixel2Grid(yMin);
//
//    //which tile is it
//    var tl = grid2Array(xMinGrid,yMinGrid);
//    var tr = grid2Array(xMaxGrid,yMinGrid);
//    var bl = grid2Array(xMinGrid,yMaxGrid);
//    var br = grid2Array(xMaxGrid,yMaxGrid);
//
    var xMin = pixel2Grid(player.x);
    var xMax = pixel2Grid(player.x + tileDim);

    //y variables
    var yMin = pixel2Grid(player.y);
    var yMid = pixel2Grid(player.y + tileDim);
    var yMax = pixel2Grid(player.y + tileDim*2);

    //find the tile that the corner is in
    var tl = grid2Array(xMin,yMin);
    var tr = grid2Array(xMax,yMin);
    var ml = grid2Array(xMin,yMid);
    var mr = grid2Array(xMax,yMid);
    var bl = grid2Array(xMin,yMax);
    var br = grid2Array(xMax,yMax);

    //if that tile is solid, put player at the edge of that tile
    if(tile[bl].solid == true || tile[br].solid == true){
        player.y = tile[bl].y - (tileDim*2);
    }

    if(tile[bl].solid == true || tile[ml].solid == true || tile[tl].solid == true){
        player.x = tile[bl].x + tileDim;
    }

    if(tile[br].solid == true || tile[mr].solid == true || tile[tr].solid == true){
        player.x = tile[br].x;
    }
}

function checkSolidAll(){

}

//convert pixel coord to grid coord
function pixel2Grid(pixel){
    var grid = Math.floor(pixel/tileDim);
    return grid;
}

//convert 2d index to 1d index
function grid2Array(row, column){
    //(global variables for number of columns and rows:cols,rows used)
    var i = row + cols*column;
    return i;
}

//combine the above two functions
function playerGridCoords(){
    var x = pixel2Grid(player.x);
    var y = pixel2Grid(player.y);
    var i = grid2Array(x,y);
    return i;
}
