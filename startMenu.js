function startMenu(){
    background('blue');
    textFont(font);
    fill(255);
    textAlign(CENTER);

    if(player.y<=height-154){
        player.x = width/2-8;
        player.y +=10;
        player.animate();
    }
    else{
        background('white');
        fill('red');
        textSize(45);
        text('A-W-D to move',width/2, height - 64);
        text('space-bar to begin',width/2, height - 18);
        fill('blue');
        textSize(24);
        text('Hint: Some walls may not be what they seem',width/2, height/2);
        player.animate();
    }

    textSize(72);
    text('FARE HOPPER',width/2, 64);
}
