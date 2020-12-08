var ground ,ground_image
var trex ,trex_running;
var cloud,could_image
var obstacle,o1,o2,o3,o4,o5,o6
var score
var play=1
var end=0
var gamestate=play
var cloudgroup
var obstaclegroup
var trexClloider
var gameover,gameoverImage
var restart,restartImage
var jumpsound
var gameoversound
var levelupsound
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
ground_image=loadImage("ground2.png")
  cloud_image=loadImage("cloud.png")
  o1=loadImage("obstacle1.png")
  o2=loadImage("obstacle2.png")
  o3=loadImage("obstacle3.png")
  o4=loadImage("obstacle4.png")
  o5=loadImage("obstacle5.png")
  o6=loadImage("obstacle6.png")
  trexClloider=loadAnimation("trex_collided.png")
  gameoverImage=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  jumpsound=loadSound("smb_fireball.wav")
  gameoversound=loadSound("mixkit-arcade-game-over-3068.wav")
  levelupsound=loadSound("smb_pause.wav")
}

function setup(){
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("c",trexClloider)
  ground=createSprite(0,180,600,10)
  trex.scale=0.6
  ground.addImage(ground_image)
  score=0
  cloudgroup=new Group()
  obstaclegroup=new Group()
  trex.setCollider("circle",0,0,20)
  trex.debug=false
  gameover=createSprite(250,50,20,20)
  gameover.addImage(gameoverImage)
  gameover.scale=0.5
  gameover.visible=false
  restart=createSprite(250,100,20,20)
  restart.addImage(restartImage)
  restart.scale=0.1
  restart.visible=false
}

function draw(){
  background("white")
  drawSprites();

  
  
  if(gamestate===play){
     score=score+Math.round(getFrameRate()/60)
    ground.velocityX=-4
  if(ground.x<0){
    ground.x=ground.width/2
    
  }
    if(score>0&&score%100===0){
      levelupsound.play()
      
    }
    if(keyDown("space")&&trex.y>100){
    trex.velocityY=-6
    jumpsound.play()
  }
 trex.velocityY=trex.velocityY+1
    clouds()
  obstacles()
    if(trex.isTouching(obstaclegroup)){
      gamestate=end
      gameoversound.play()
    }
    
  }
  else if(gamestate===end){
    ground.velocityX=0
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    trex.velocityY=0
    trex.changeAnimation("c",trexClloider)
    gameover.visible=true
    restart.visible=true
  }
 
  text("your score is "+score,500,50)
  
      
 trex.collide(ground) 
  if (mousePressedOver(restart)){
    reset()
    
    
  }
  
}
function reset(){
  gamestate=play
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  score=0
  gameover.visible=false
  restart.visible=false
  
}


function clouds(){
  if(frameCount%60===0){
  cloud=createSprite(600,50,20,20)
  cloud.velocityX=-4
    cloud.addImage(cloud_image)
    cloud.scale=random(0.5,1.2)
    cloud.y=Math.round(random(20,80))
    cloudgroup.add(cloud)
}
}

function obstacles(){
  if(frameCount%60===0){
  obstacle=createSprite(600,170,20,20)
  obstacle.velocityX=-4
    obstacle.scale=0.4
    obstaclegroup.add(obstacle)
    var r=Math.round(random(1,6))
    switch(r){
      case 1:obstacle.addImage(o1);
      break;
      case 2:obstacle.addImage(o2);
      break;
      case 3:obstacle.addImage(o3);
      break;
      case 4:obstacle.addImage(o4);
      break;
      case 5:obstacle.addImage(o5);
      break;
      case 6:obstacle.addImage(o6);
      break;
      default:break;
        
    }
    
  }
  
  
  
}