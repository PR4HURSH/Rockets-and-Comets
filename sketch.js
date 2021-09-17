//Code might take a few seconds to load in Live Server but it works fine
var rocket,rocketspr;
var cometimg;
var star;
var space,spaceimg;
var START=1;
var PLAY=2;
var END=3;
var gameState=1;
var score=0;
var cometg;
var starzg;
var gameover;
var point;
var mus;

function preload(){
//obstacles
cometimg=loadImage("picscut-meteor-clipart-flash-golden-png-image_16544-removebg-preview.png")
//rocket to dodge comets
rocket=loadImage("15125823lKZYLCom.png")
//points to acquire
star=loadImage("57-574430_transparent-stars-clipart-on-transparent-background-cartoon-transparent-removebg-preview.png")
//background
spaceimg=loadImage("milky-way-2695569__480.jpg")
//gameover sound
gameover=loadSound("sound.mp3")
//points sound
point=loadSound("points.mp3");
//background music
//wasnt working so i removed it
mus=loadSound("NCS.mp3")
}

function comett(){
    if(World.frameCount%150==0){
    var comet=createSprite(1600,Math.round(random(100,550), 10, 10))
    comet.addImage(cometimg);
    comet.velocityX=space.velocityX-1;
    comet.scale=0.5;
    // comet.debug=true;
    comet.setCollider("rectangle",0,0,300,150)
    cometg.add(comet)
    }

}

function points(){
    if(World.frameCount%250===0){
    var starz=createSprite(1600,Math.round(random(50,550), 10, 10))
    starz.addImage(star);
    starz.scale=0.1;
    starz.velocityX=space.velocityX-1.5;
    // starz.debug=true;
    starzg.add(starz)
    }
}

function setup() {
createCanvas(1000,600)
//background
space=createSprite(200,200);
space.addImage(spaceimg)
space.scale=1.9;
//creating rocket
 rocketspr=createSprite(140,80,20,20);
 rocketspr.addImage("rocket2",rocket)
 rocketspr.scale=0.4;
 rocketspr.setCollider("rectangle",40,0,400,200)
 
 createEdgeSprites;
 cometg=new Group();
 starzg=new Group();


}

function draw() {
    background("black")
    drawSprites();
fill("red")
textSize(20)
    
space.velocityX=-3

if(gameState===1){
    rocketspr.visible=false;
    space.velocityX=0;
    
    
    fill("red")
    textSize(40)
    text("Press Space to Start!",330,250)
}

if(keyDown("space")&&gameState===1){
gameState=2

}

if(gameState===2){
rocketspr.visible=true;
space.velocityX=-(5+score/2);

// rocketspr.debug=true;
fill("cyan")

text("Stars = +1 points",830,570)



comett();
points();


text("Score: "+score,800,30)
rocketspr.y=mouseY
if(rocketspr.isTouching(cometg)){
    gameState=3;
    gameover.play();
    

    


}

if(rocketspr.isTouching(starzg)){
score=score+1
starzg.destroyEach()
point.play();

}
}

if(gameState===3){
    text("Score: "+score,800,30)
rocket.velocityY=0
space.velocityX=0
starzg.setVelocityXEach(0)
cometg.setVelocityXEach(0)
fill("red");
textSize(40)
text("Game Over",400,250);
textSize(20)
text("Press 'R' to restart",420,300);
if(keyDown("r")){
gameState=1
starzg.destroyEach();
cometg.destroyEach();
}
}

if(space.x<190){
space.x=400;

}





}