//EVENT FUNCTIONS
function keyTyped() {
    if(player.gameState==0){
        if (key === 'a'){
            dirX = -1;
        }
        else if (key === 'd'){
            dirX = 1;
        }
        else if (key === ' '){
            ambience.loop();
            player.x = 0;
            player.y = 0;
            player.gameState=1;
        }
    }
    else{
        if (key === 'a'){
            dirX = -1;
        }
        else if (key === 'd'){
            dirX = 1;
        }
        else if (key === 'w'){//jump
          jump();
        }
        else if (key === '0'){
            changeLevel(tilesets[0],botsets[0],0,0);
        }
        else if (key === '1'){
            changeLevel(tilesets[1],botsets[1],0,0);
        }
        else if (key === '2'){
              changeLevel(tilesets[2],botsets[2],0,128);
        }
        else if (key === '3'){
            changeLevel(tilesets[3],botsets[3],0,128);
        }
        else if (key === '='){
            player.level += 1;
            if (player.level >3){
              player.gameState = 2;
            }
            else{
              changeLevel(tilesets[player.level],botsets[player.level],0,128);
            }
        }
    }
}
function keyReleased() {
    if (key === 'a'){
        dirX=0;
    }
    else if (key === 'd'){
        dirX=0;
    }
    else if (key === 'w'){//jump
      dirY = 1; //animate jump
      player.jumping = false;
      speedY = 7;
      speedAcc = 0;
    }
}

function jump(){
  player.jumping = true;
  dirY = -1;
  speedY = -7;
}
