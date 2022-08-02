var bg,bgImg;
var player, shooterImg, shooter_shooting;
var life = 3
var score = 0



function preload(){
  
  shooterImg = loadAnimation("assets/shotgun/0.png","assets/shotgun/19.png")
 
  zumbiImage = loadAnimation("assets/zombieWalk/0.png","assets/zombieWalk/16.png")
  apImg = loadImage("assets/wpp.jpg")
  balaImage = loadImage("assets/bullet1.png")
  som = loadSound("assets/explosion.mp3")
  zombie = loadSound("assets/zumbi.mp3")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

 
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addAnimation("player",shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  zumbiGroup = new Group()
  balaGroup = new Group()

}

function draw() {
  background(0); 
  image(apImg, 0, 0, width, height)



  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("W")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("S")||touches.length>0){
 player.y = player.y+30
}

if(keyDown("D")||touches.length>0){
  player.x = player.x+30
 }
 
 if(keyDown("A")||touches.length>0){
  player.x = player.x-30
 }
 

if (zumbiGroup.isTouching(balaGroup)) {
  for(var i = 0 ; i < zumbiGroup.length; i++) {
    if (zumbiGroup[i].isTouching(balaGroup)) {
       zumbiGroup[i].destroy()
       balaGroup.destroyEach()
       zombie.play()
       score += 1
      
    }

  }

}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(mouseWentDown("leftButton")){
  atirar()

 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(mouseWentUp("leftButton")){
  player.addAnimation(shooterImg)
  som.play()
}
gerarZumbi()
drawSprites();
textSize(20) 
fill("white")
textFont("Georgia")
text("Vidas: " + life,displayWidth - 200, displayHeight/2 - 280)
text("Pontuação: " + score, displayWidth - 200, displayHeight/2 -250)
}

function gerarZumbi() {
  if(frameCount % 90 == 0) {
    zumbi = createSprite(width,random(500,height ))
    zumbi.addAnimation("zumbi", zumbiImage)
    zumbi.velocityX = -6
    zumbi.lifeTime = 800
    zumbiGroup.add(zumbi)
  }
}

function atirar() {
  bala = createSprite(player.x + 80, player.y + 30,20,10)
  bala.velocityX = 30
  bala.addImage(balaImage)
  bala.scale = 0.09
  bala.lifeTime = 800
  balaGroup.add(bala)
}

