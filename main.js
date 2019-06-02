///////////////////////////////////////
//Fare Hopper : A game by Oscar Davis//
//          Copyright 2018           //
///////////////////////////////////////

//GLOBAL VARIABLES
//player
var player;
var score = 0;
var prevX;
var prevY;
var speedX = 4;
var speedY = 6;
var speedAcc = 0;
var dirX = 0;
var dirY = 1;

//canvas
var cols = 64;
var rows = 64;
var tileDim = 16;
var canvasDim = cols * tileDim;
var scaleFactor = 2;
var viewPort = (canvasDim);

//translation
var translateX = 0;
var translateY = 0;

////IMAGES
var floor;
var floorEnd;
var wall;
var stairs;
var clear;

var characterRight;
var characterLeft;
var characterIdle;
var characterjump;
var botSkin;
var botSkin1;
var oyster;
var tfl_logo;
var coin;
var gate;
var trainSign;

//audio
var oysterGet;
var ambience;

//font + text
var font;
var HUDtext;

var winwid;
var winhgt;

////SYSTEM FUNCTIONS
function preload() {
    //load images
    clear = loadImage('data/clear.png');
    wall = loadImage('data/wall.png');
    stairs = loadImage('data/stairs.png');
    floor = loadImage('data/floor.png');
    floorEnd = loadImage('data/floorEnd.png');
    tfl_logo = loadImage('data/tfl_logo.png');
    coin = loadImage('data/coin.png');

    characterIdle = loadImage('data/player_idle.png');
    characterLeft = loadImage('data/player_walking1.png');
    characterRight = loadImage('data/player_walking.png');
    characterJump = loadImage('data/player_jump.png');
    botSkin = loadImage('data/conductor.png');
    botSkin1 = loadImage('data/conductor1.png');
    oyster = loadImage('data/oyster.png');
    trainSign = loadImage('data/train.png');
    gate_closed = loadImage('data/gate_closed.png');
    gate_open = loadImage('data/gate_open.png');

    //load sounds
    ambience = loadSound('data/ambience.mp3');
    oysterGet = loadSound('data/oysterGet.mp3');
    coinGet = loadSound('data/oysterGet.ogg');

    //load font
    font = loadFont('data/font.TTF');
}

function setup() {
    //create player + maps
    player = new Player();
    createMap(tilesets[0],map0,botsets[0]);
    createMap(tilesets[1],map1,botsets[1]);
    createMap(tilesets[2],map2,botsets[2]);
    createMap(tilesets[3],map3,botsets[3]);

    //system
    createCanvas(720,620);
    frameRate(60);
}

function draw(){
    if(player.gameState == 0){
        startMenu();
    }
    else if(player.gameState == 1){
        //movement
        if(speedY<0){
          speedAcc = speedAcc + speedY;
        }
        if(speedAcc<-120){
          speedY = 7;
          speedAcc = 0;
          dirY = 1;
        }
        prevX = player.x;
        prevY = player.y;
        player.moveX();
        player.moveY();

        for (var i = 0; i < currentBotset.length;i++){
            botCollisions(currentBotset[i]);
            currentBotset[i].moveX();
        }

        //collisions&boundaries
        boundaries();
        playerCollisions();
        boundaries();

        //draw
        viewport();
        background('dodgerblue');
        drawMap(currentTileset);
        for (var i = 0; i < currentBotset.length;i++){
            currentBotset[i].animate();
        }
        player.animate();
        HUD();
    }
    else if (player.gameState == 2){
        endScreen();
        tiledMouse();
    }
}
