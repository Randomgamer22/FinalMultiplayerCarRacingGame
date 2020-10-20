class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      car1 = createSprite(100, 200);
      car2 = createSprite(300, 200);
      car3 = createSprite(500, 200);
      car4 = createSprite(700, 200);

      car1.addImage(carImage1);
      car2.addImage(carImage2);
      car3.addImage(carImage3);
      car4.addImage(carImage4);

      cars = [car1, car2, car3, car4];
    }
  }

  play(){
    form.hide();
    player.readRank();
    textSize(30);
    Player.getPlayerInfo();
    var x = 175, y = 0;
    if(allPlayers != undefined){
      background(ground);
      image(track, 0, -displayHeight*4, displayWidth, displayWidth*10.2992125984252);
      var index = 0;
      for(var i in allPlayers){
        index++;
        x = x+200;
        y = displayHeight-allPlayers[i].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          push();
          rectMode(CENTER);
          fill("red");
          rect(cars[index-1].x, cars[index-1].y, 60, 90);
          pop();
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      }
    }
    if(keyDown(UP_ARROW) && player.index != null){
      player.distance += 10;
      player.updateName(player.name);
    }
    if(player.distance >= 3660){
      gameState = 2;
      player.rank++;
      Player.updateRank(player.rank);
      window.alert(player.name+" has ranked "+player.rank);
      console.log(player.rank);
    }
    drawSprites();
  }

  end() {
    //gameState = 2;
  }
}
