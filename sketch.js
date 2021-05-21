var mario;
var platformGroup, obstacleGroup;
var marioAnimation, obstacleAnimation, wallAnimation, groundAnimation;
var flag;
var LOSE=0;
var PLAY=1;
var WIN=2;
var gameState=PLAY;
function preload()
{
  marioAnimation=loadAnimation("images/Capture1.png","images/Capture4.png","images/Capture3.png");
  obstacleAnimation=loadAnimation("images/obstacle1.png");
  wallAnimation=loadAnimation("images/wall.png");
  groundAnimation=loadAnimation("images/ground.png");  
  flagAnimation=loadAnimation("images/Flag.png");
}

function setup() {
  //Creating canvas equal to width and height of display
  createCanvas(displayWidth,668);
  var xPosition = 0;
  var platform;
  var gap;
  
  //creating a player mario
  mario = new Player();
  
  //creating a group
  platformGroup= createGroup();
  obstacleGroup=createGroup();
  //adding platforms to stand for mario
  for (var i=0;i<5;i++)
	 {
     frameRate(30);
      platform = new Platform(xPosition);
      platformGroup.add(platform.spt);
      gap=random([0,0,0,0,200]);
      xPosition = xPosition + platform.spt.width + gap; 
      //adding wall to the game
      if(i%3===0)
      {
      wall=new Wall(xPosition);
      platformGroup.add(wall.spt);
      }
      //adding obstacles to the game
      if(i%4==0)
      {
      obstacle=new Obstacle(xPosition);
      obstacleGroup.add(obstacle.spt);
      }
  }
  flag=createSprite(xPosition-150,height-320);
  flag.addAnimation("flag",flagAnimation);
  flag.scale=0.09;
}

function draw()
 {
  background('skyblue');
  translate(-mario.spt.x + width/2 , 0);
  if(gameState==PLAY)//Play state
  {  
        mario.applyGravity();
        mario.spt.collide(platformGroup);
        if (keyDown("left"))  
        { 
          mario.moveLeft();
        }
        if (keyDown("right")) 
        { 
          mario.moveRight();
        }
        if (keyDown("up") && mario.spt.velocityY===0) 
        {
          mario.jump();
        }
        if(obstacleGroup.isTouching(mario.spt)||mario.spt.y > height)
        {
          gameState = LOSE;
        }
        
        if(flag.isTouching(mario.spt))
        {
            gameState = WIN;
        }
        
   }


if(gameState === LOSE)
{
  textSize(30);
  text("GAME OVER",mario.spt.x,350);
  obstacleGroup.destroyEach();
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
}

if(gameState === WIN)
{
  textSize(30);
  text("CONGRATS! YOU WIN",mario.spt.x,350);
  obstacleGroup.destroyEach();
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
}
 
   drawSprites();
}