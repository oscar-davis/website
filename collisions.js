function viewport(){
    //translate x to follow the player
    translateX = width/2-player.x;

    //translate y to follow the player
    translateY = (height/2)-player.y;

    //boundary checks
    if(translateX<=-(canvasDim-width+32)){
        translateX =-(canvasDim-width+32);
    }
    if(translateX>=32){//32 because of HUD edges
        translateX = 32;
    }
    if(translateY<=-(canvasDim-height+32)){
        translateY = -(canvasDim-height+32);
    }
    if(translateY>=32){ //correct
        translateY = 32;
    }

    //translate canvas
    translate(translateX,translateY);
}

function boundaries(){
    //PLAYER
    //left
    if(player.x<=1){
        player.x=0;
    }
    //right
    else if(player.x>canvasDim-tileDim*2-1){
        player.x=canvasDim-tileDim*2;
    }
    //top
    else if(player.y<=3){
        player.y=0;
    }
    //bottom
    else if(player.y>canvasDim-tileDim*3){
        player.y=canvasDim-tileDim*3;
    }
}

function playerCollisions(){
    var x = [];
    var y = [];

    //variables of the pixel coords of:
    //x, xmax, y, ymid, ymax
    x[0] = player.x+3;
    x[1] = player.x + tileDim -1;
    x[2] = player.x + tileDim*2 -3;
    y[0] = player.y;
    y[1] = player.y + tileDim + 2;
    y[2] = player.y + (tileDim*2)+2;
    y[3] = player.y + tileDim*3;

    //tile coord variables
    var left0 = grid2Array(pixel2Grid(x[0]),pixel2Grid(y[0]));
    var centre0 = grid2Array(pixel2Grid(x[1]),pixel2Grid(y[0]));
    var right0 = grid2Array(pixel2Grid(x[2]),pixel2Grid(y[0]));
    var left1 = grid2Array(pixel2Grid(x[0]),pixel2Grid(y[1]));
    var centre1 = grid2Array(pixel2Grid(x[1]),pixel2Grid(y[1]));
    var right1 = grid2Array(pixel2Grid(x[2]),pixel2Grid(y[1]));
    var left2 = grid2Array(pixel2Grid(x[0]),pixel2Grid(y[2]));
    var centre2 = grid2Array(pixel2Grid(x[1]),pixel2Grid(y[2]));
    var right2 = grid2Array(pixel2Grid(x[2]),pixel2Grid(y[2]));
    var left3 = grid2Array(pixel2Grid(x[0]),pixel2Grid(y[3]));
    var centre3 = grid2Array(pixel2Grid(x[1]),pixel2Grid(y[3]));
    var right3 = grid2Array(pixel2Grid(x[2]),pixel2Grid(y[3]));

    //CHECK FEET
    if(currentTileset[centre3].solid == true ){
                    player.y = currentTileset[centre3].y-(tileDim*3);
                    player.onFloor = true;//let jump mechanics know that you are on the floor, so can jump
    }
    else{//let jump mechanics know that you are in the air, so cant jump
      player.onFloor = false;
    }

    //CHECK HEAD
    if(currentTileset[centre0].solid == true){
                    player.y = currentTileset[centre0].y + tileDim;
    }

    //CHECK LEFT
    //if any of the left tiles are solid then move the player so that it is at the edge of the tiles
    if(currentTileset[left1].solid == true || currentTileset[left2].solid == true ){
                    player.x = currentTileset[left0].x + tileDim - 3;
    }
    // pick up oyster
    else if(currentTileset[left2].name == 'oyster'){
        currentTileset[left2].name = 'see-through';
        currentTileset[left2].skin = clear;
        oysterGet.play();
        player.oyster = true;
        HUDtext = 'You have an oyster card!';
    }
    //pick up coin
    else if(currentTileset[left2].name == 'coin'){
        score ++;
        currentTileset[left2].name = 'see-through';
        currentTileset[left2].skin = clear;
        coinGet.play();
        HUDtext = 'You have ' + score + ' coins';
    }


    //CHECK RIGHT
    if(currentTileset[right1].solid == true || currentTileset[right2].solid == true){
                    player.x = currentTileset[right2].x -tileDim*2 + 6;

            //gate mechanics
            if(currentTileset[right2].name == 'gate'){

                if(player.oyster == true && score > 1){
                    currentTileset[right2].name = 'gate_open';
                    currentTileset[right2].skin = gate_open.get(0,16,16,16);
                    currentTileset[right2].solid = 'gate_open';

                    currentTileset[right1].name = 'see-through';
                    currentTileset[right1].skin = gate_open.get(0,0,16,16);
                    currentTileset[right1].solid = false;

                    oysterGet.play();

                    HUDtext = 'Well done you have completed the level!!!';
                }
                else if(player.oyster == false){
                    HUDtext = 'You need to get an oyster card!';
                }
                else if(score < 16){
                    HUDtext = 'You need more coins to travel';
                }
            }
    }
    // pick up oyster
    else if(currentTileset[right2].name == 'oyster'){
        currentTileset[right2].name = 'see-through';
        currentTileset[right2].skin = clear;
        oysterGet.play();
        player.oyster = true;
        HUDtext = 'You have an oyster card!';
    }
    //pick up coin
    else if(currentTileset[right2].name == 'coin'){
        score ++;
        currentTileset[right2].name = 'see-through';
        currentTileset[right2].skin = clear;
        coinGet.play();
        HUDtext = 'You have ' + score + ' coins';
    }

    //enter next level
    else if (currentTileset[right0].name == 'sign'){
        if(player.level==2){
          player.level+=1;
          player.oyster = false;
          score = 0;
          changeLevel(tilesets[player.level],botsets[player.level],3,canvasDim-(tileDim*5));
        }
        else if (player.level==3){
        player.gameState = 2;
        }
        else{
        player.level+=1;
        player.oyster = false;
        score = 0;
        changeLevel(tilesets[player.level],botsets[player.level],0,5);
        }
    }
  }

function botCollisions(bot){
    //check for end of platform
    var nextTileRight = grid2Array(pixel2Grid(bot.x+36), pixel2Grid(bot.y+52));
    var nextTileLeft = grid2Array(pixel2Grid(bot.x-5), pixel2Grid(bot.y+52));
    if (currentTileset[nextTileRight].solid == false || currentTileset[nextTileLeft].solid == false ) {
        bot.dirX = bot.dirX * -1;
    }

    //map boundaries
    //left
    if(bot.x<0){
        bot.dirX=1;
    }
    //right
    else if(bot.x>canvasDim-tileDim*2){
        bot.dirX=-1;
    }
    //player bot botCollisions
    //bot + player tiles
    var botLocation = grid2Array(pixel2Grid(bot.x),pixel2Grid(bot.y));
    var playerLocation = grid2Array(pixel2Grid(player.x),pixel2Grid(player.y));

    if(botLocation == playerLocation){
        overlayOn = true;
        player.x = 5;
        player.y = 5;
    }
}
