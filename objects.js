//OBJECT FUNCTIONS
function Tile(name,x,y,skin,solid) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.xMax = x + tileDim;
    this.yMax = y + tileDim;
    this.skin = skin;
    this.solid = solid;
    this.plx;
    this.ply;

    this.show = function() {
        image(this.skin,this.x,this.y);
    }
}

function Player(){
    this.gameState = 0;
    this.level = 1;
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.onFloor = false;
    this.jumping = false;
    this.skin;
    this.oyster = false;
    this.index = 0;

    this.animate = function() {
        var animation = [];
        var skin;
        //if moving to the right
        if(dirX == 1){
            skin = characterRight;
            animation[0] = skin.get(0,0,32,48);
            animation[1] = skin.get(32,0,32,48);
            animation[2] = skin.get(0,48,32,48);
            animation[3] = skin.get(32,48,32,48);
            this.index += 0.1;
            this.skin = animation[Math.floor(this.index) % animation.length];
            image(this.skin,this.x,this.y);
        }
        //if moving to the left
        else if(dirX == -1){
            skin = characterLeft;
            animation[0] = skin.get(0,0,32,48);
            animation[1] = skin.get(32,0,32,48);
            animation[2] = skin.get(0,48,32,48);
            animation[3] = skin.get(32,48,32,48);
            this.index += 0.1;
            this.skin = animation[Math.floor(this.index) % animation.length];
            image(this.skin,this.x,this.y);
        }
        else if(dirY == -1){
            skin = characterJump;
            image(this.skin,this.x,this.y);
        }
        else{
            skin = characterIdle;
            animation[0] = skin.get(0,0,32,48);
            animation[1] = skin.get(0,48,32,48);
            this.index += 0.1;
            this.skin = animation[Math.floor(this.index) % animation.length];
            image(this.skin,this.x,this.y);
        }


    }

    this.moveX = function() {
        this.x += dirX * speedX;
    }

    this.moveY = function(){
        this.y = this.y + speedY;
    }
}

function Bot(name,x,y,skin){
    this.name = name;
    this.x = x;
    this.y = y;
    this.skin = skin;

    this.dirX = 0;
    this.dirY = 0;
    this.index = 0;

    this.animate = function() {
        var animation = [];
        var skin;

        //if moving to the right
        if(this.dirX == 1){
            skin = botSkin;
            animation[0] = skin.get(0,0,32,48);
            animation[1] = skin.get(32,0,32,48);
            animation[2] = skin.get(0,48,32,48);
            animation[3] = skin.get(32,48,32,48);
            this.index += 0.1;
            this.skin = animation[Math.floor(this.index) % animation.length];
            image(this.skin,this.x,this.y);
        }
        //if moving to the left
        else if(this.dirX == -1){
            skin = botSkin1;
            animation[0] = skin.get(0,0,32,48);
            animation[1] = skin.get(32,0,32,48);
            animation[2] = skin.get(0,48,32,48);
            animation[3] = skin.get(32,48,32,48);
            this.index += 0.1;
            this.skin = animation[Math.floor(this.index) % animation.length];
            image(this.skin,this.x,this.y);
        }
    }

    this.moveX = function() {
        this.x += this.dirX * 2;
    }

    this.moveY = function(){
      this.y += 0;
    }
}

function Item(name,x,y,skin,solid) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.xMax = x + tileDim;
    this.yMax = y + tileDim;
    this.skin = skin;
    this.solid = solid;

    this.show = function() {
        image(this.skin,this.x,this.y);
    }
}
