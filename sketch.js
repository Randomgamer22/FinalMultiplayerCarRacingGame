var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;

var form, allPlayers = [], player, game;

var cars = [], car1, car2, car3, car4;
var carImage1, carImage2, carImage3, carImage4, track, ground;

function preload() {
  carImage1 = loadImage("car1.png");
  carImage2 = loadImage("car2.png");
  carImage3 = loadImage("car3.png");
  carImage4 = loadImage("car4.png");

  track = loadImage("track.jpg");

  ground = loadImage("ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth-20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  if(playerCount === 4){
    game.update(1);
  }

  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
