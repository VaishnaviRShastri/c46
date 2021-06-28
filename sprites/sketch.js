
var car;
var carImg;
var road,roadImg;
var obstacle,obstacleImg,obastacleGrp;
var gameState="Play";
var rand;
var barImg;
var coinImg,fuelImg;
var coinCount=0,fuelCount=50;

function preload(){
  carImg=loadImage("Car.png.png");
  roadImg=loadImage("track_img3.jpg");
  obstacleImg=loadImage("Cone.png");
  barImg=loadImage("barricade2.png");
  coinImg= loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png");
  fuelImg=loadImage("fuel-removebg-preview.png");
}
function setup() {
  createCanvas(400, 600);
 

road=createSprite(350,200)
road.addImage("road",roadImg);
road.scale=2;


car =createSprite(130,550,10,20);
car.addImage("car",carImg);
car.scale=0.1;

obstacleGrp=new Group();
coinGrp=new Group();
fuelGrp=new Group();
}

function draw() {
  background("black"); 
   
  if(gameState==="Play"){

    road.velocityY=5;

    if(keyDown("left")){
      car.x=car.x-15;   
    }
    
    if(keyDown("right")){
      car.x=car.x+15;
    }
    if(road.y>380){
        road.y=height/2
    }
     
    spawnObstacle()
    spawnCoin()
    spawnFuel()

    if(coinGrp.isTouching(car)){
      coinGrp.destroyEach();
      coinCount+=1;      
    }

    if(fuelGrp.isTouching(car)){
      fuelGrp.destroyEach();
      fuelCount+=50;      
    }
    


    if(obstacleGrp.isTouching(car)){
      road.velocityY=0;
      car.x=130;
      car.y=550;
      obstacleGrp.destroyEach();
      obstacleGrp.setVelocityYEach(0);
      gameState="End";

  }
  drawSprites();
  fill("white")
    textSize(20)
    text("Coin:"+coinCount,100,20);
    text("Fuel:"+fuelCount,250,20);
  }

  if(gameState==="End"){
    background("black");
    fill("Yellow");
    textSize(30);
    text("Game Over", 150,300);
    textSize(24);
    text("Press Space To Restart",100,370);
    if(keyDown("Space")){
      gameState="Play";
    }
  }
  
  

  
  
  //car.velocityY=-5;
  
  
}

function spawnObstacle(){
    if(frameCount%60===0){
      obstacle=createSprite(Math.round(random(110,280),-20,10,10))
       //obstacle.addImage(obstacleImg);
      obstacle.velocityY=3;
      rand=Math.round(random(1,2))
      switch(rand){
        case 1 : obstacle.addImage(obstacleImg)
        obstacle.scale=0.2;
        break;
        case 2 : obstacle.addImage(barImg)
        obstacle.scale=0.3;
        break;
        
      }
    
    obstacle.lifetime=200
    obstacleGrp.add(obstacle)
     }
}

function spawnFuel(){
  if(frameCount%120===0){
    var fuel=createSprite(Math.round(random(110,280),-20,10,10))
     fuel.velocityY=3;
     fuel.addImage(fuelImg);
    fuel.lifetime=200
    fuelGrp.add(fuel);
    fuel.scale=0.3
   }
}
function spawnCoin(){
  if(frameCount%180===0){
    var coin=createSprite(Math.round(random(110,280),-20,10,10))
     coin.velocityY=3;
     coin.addAnimation("coin",coinImg);
    coin.lifetime=200;
    coinGrp.add(coin);
    coin.scale=0.8;
   }
}