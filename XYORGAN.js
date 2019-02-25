var canvas;
var x;
var Row = [];


var colour0;
function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-1');
    x = width;
    frameRate();
    for(i=0;i<35;i++){
        var rando = random(255);
        var indMax = map(rando,0,255,0,3);
        var x = random(0,width);
        var d = map(rando, 255, 0, 15, 200);
        var c = color(random(255),random(255),random(255),200);
        var inc = -1;
        var s = 10;
        var freq = map(rando, 0, 255, 90, 600);
        var newRow = new createRow(rando,x,(i*35)+15,d,c,inc,s,indMax,freq);
        Row.push(newRow);
    }
}

function draw(){
    background(255,255,255);
    for(i=0;i<25;i++){
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

    // fill(255);
    // textAlign(RIGHT);
    // textSize(35);
    // textStyle(BOLD);
    // text('OSCARDAVIS.CO.UK ∿',width-70,63);
}

function createRow(rando,x,y,d,c,inc,s,indMax,freq){
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
    this.env = new p5.Envelope(0.1,0.25,map(rando,0,255,4,0.5),0.1,1,0);
    this.osc.amp(this.env);
    this.osc.start();

    this.animate = function(){
        this.index += 0.1;
        this.osc.pan(map(this.x,0,width,-0.5,0.5))
        if(this.index>this.indexMax){
            this.x += this.s * this.incX;
            this.y += this.s * this.incY;
            if(this.x<-this.d){
                this.incX = this.incX*-1;
                this.env.play();
            }
            else if(this.x>width+this.d){
                this.incX = this.incX*-1;
                this.env.play();
            }
            if(this.y>height-(this.d)){
                this.incY = this.incY*-1;
                this.env.play();
            }
            else if(this.y<-this.d){
                this.incY = this.incY*-1;
                this.env.play();
            }
            this.index = 0;
        }
    }

    this.show = function(){
        //noStroke();
        fill(this.c);
        rect(this.x,this.y,this.d,this.d);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
