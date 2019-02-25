
var x;
var Row = [];

var colour0;
function setup(){
    createCanvas(windowWidth, windowHeight);
    x = width;
    frameRate();
    for(i=0;i<35;i++){
        var rando = random(255);
        var indMax = map(rando,0,255,1,3);
        var x = random(0,width);
        var d = map(rando, 0, 255, 15, 200);
        var c = color(random(255),random(255),random(255),200);
        var inc = -1;
        var s = 50;
        var freq = map(rando, 0, 255, 70, 600);
        var newRow = new createRow(x,(i*35)+15,d,c,inc,s,indMax,freq);
        Row.push(newRow);
    }
}

function draw(){
    background(255,255,255,20);
    for(i=0;i<15;i++){
        Row[i].animate();
        Row[i].show();
    }
    //text
   // textStyle(NORMAL);
   // fill(75);
   // textAlign(LEFT);
    //textSize(30);
    //text('info@oscardavis.co.uk ∿    +44(0)7806 547 799 ∿   ',70,63+70);
//    text('∿ +44(0)7806 547 799',70,126+75+140);

    fill(255);
    textAlign(RIGHT);
    textSize(35);
    textStyle(BOLD);
    text('OSCARDAVIS.CO.UK ∿',width-70,63);
}

function createRow(x,y,d,c,inc,s,indMax,freq){
    this.x = x;
    this.y = y;
    this.d = d;
    this.c = c;
    this.incX = inc;
    this.incY = inc;
    this.s = s;
    this.index = 0;
    this.indexMax = indMax;
    this.osc = new p5.Oscillator(freq,'sine');

    this.animate = function(){
        this.index += 0.1;
        if(this.index>this.indexMax){
            this.x += this.s * this.incX;
            this.y += this.s * this.incY;
            if(this.x<-10){
                this.incX = this.incX*-1;
            }
            else if(this.x>width+this.d/2){
                this.incX = this.incX*-1;
            }
            if(this.y>height-(this.d/2)){
                this.incY = this.incY*-1;
                this.osc.stop();
            }
            else if(this.y<(-this.d/2)){
                this.incY = this.incY*-1;
                this.osc.start();
                this.osc.amp(0.2);
            }
            this.index = 0;
        }
    }

    this.show = function(){
        noStroke();
        fill(this.c);
        ellipse(this.x,this.y,this.d,this.d);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
