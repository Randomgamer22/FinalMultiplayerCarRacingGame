class Player {
  constructor() {
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",function(data){
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  updateName(name){
    var playerIndex = "players/player" + this.index;
    this.name = name;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }

  static getPlayerInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on ("value", (data) => {
      allPlayers = data.val();
    })
  }

  removePlayers() {
    var playersRef = database.ref("players");
    playersRef.remove();
  }

  readRank() {
    var playerRankRef = database.ref("carsAtEnd");
    playerRankRef.on ("value", (data) => {
      this.rank = data.val();
    })
  }

  static updateRank(rank) {
    database.ref('/').update({
      carsAtEnd: rank
    })
  }
}
