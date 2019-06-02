var overlayOn = false;
var counter = 0;

//HUD
function HUD(){
    //background
    noStroke();

    fill('blue');
    //top
    rect(-translateX,-translateY,width,32);
    //left
    rect(-translateX,-translateY,32,height);
    //right
    rect(-translateX+width-32,-translateY,32,height);

    //score etc
    fill('red');
    rect(-translateX,-translateY+height-32,width,32);

    //text
    fill(255);
    textAlign(CENTER);
    textFont(font);

    textSize(32);
    text('FARE HOPPER',-translateX+width/2,-translateY+28);

    //score etc
    textSize(16);
    text(HUDtext,-translateX+width/2,-translateY+height-10);

    //overlay image
    if(counter>60){
            overlayOn = false;
            counter = 0;
        }
    else if(overlayOn == true){
        rect(-translateX,-translateY,width,height);
        fill('red');
        textSize(48);
        text('You were caught!',width/2-translateX,height/2-translateY)
        player.x = 0;
        player.y = 0;
        counter ++;
    }
}
