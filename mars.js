let nodesLink = "https://headlight-tournament-4.herokuapp.com/nodes";
let botsLink = "https://headlight-tournament-4.herokuapp.com/bots";


//CREATING NODES FOR THE MINERAL NODES
var nodesCall = new XMLHttpRequest();
nodesCall.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    }

    for(z=0;data.Nodes.length;z++) {
      var newdiv = document.createElement("div");
      newdiv.setAttribute('style', `
      left: ${data.Nodes[z].Location.X * 30}px;
      bottom: ${data.Nodes[z].Location.Y * 30}px;
      `);
      newdiv.setAttribute('class', 'node');
      newdiv.setAttribute('id', 'node' + z);

     document.getElementById('main-grid').appendChild(newdiv);

  }
}
nodesCall.open("GET", nodesLink, true);
nodesCall.send();


//CREATING NODES FOR THE BOTS
var botsCall = new XMLHttpRequest();
botsCall.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
  }

  for(z=0;z<data.Bots.length;z++) {
    var newdiv = document.createElement("div");
    newdiv.setAttribute('style', `
    left: ${data.Bots[z].Location.X * 30}px;
    bottom: ${data.Bots[z].Location.Y * 30}px;
    `);
    newdiv.setAttribute('class', 'bot');
    newdiv.setAttribute('id', data.Bots[z].Id);
    newdiv.setAttribute('onClick',`
    document.getElementById('botinfo').innerHTML="${data.Bots.length}";

    `);

   document.getElementById('main-grid').appendChild(newdiv)
}

}
botsCall.open("GET", botsLink, true);
botsCall.send();



//UPDATING THE BOTS REGULARLY VIA AJAX

setInterval(function(){

  var updateBotsCall = new XMLHttpRequest();
  updateBotsCall.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
    }

    for(z=0;z<data.Bots.length;z++) {
      var botnode = document.getElementById(data.Bots[z].Id);
      botnode.setAttribute('style', `
      left: ${data.Bots[z].Location.X * 30}px;
      bottom: ${data.Bots[z].Location.Y * 30}px;
      `);
  }

  }
  updateBotsCall.open("GET", botsLink, true);
  updateBotsCall.send();

}, 1500);
