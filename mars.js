let nodesLink = "https://headlight-tournament-4.herokuapp.com/nodes";
let botsLink = "https://headlight-tournament-4.herokuapp.com/bots";


//FOR SCALING
const gridsize = 20; //for a 20x20 grid
const cssgridsize = 600; //for a 600px grid
const nodesize = cssgridsize/gridsize //size for each bot and node



//CREATING NODES FOR THE MINERAL NODES
var nodesCall = new XMLHttpRequest();
nodesCall.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var data = JSON.parse(this.responseText);
    }

    for(z=0;data.Nodes.length;z++) {
      var newdiv = document.createElement("div");
      newdiv.setAttribute('style', `
      left: ${data.Nodes[z].Location.X * nodesize}px;
      bottom: ${data.Nodes[z].Location.Y * nodesize}px;
      `);
      newdiv.setAttribute('class', 'node');
      newdiv.setAttribute('id', 'node' + z);
      newdiv.setAttribute('onClick',`
      document.getElementById('nodeinfo').innerHTML="<h4>NODE INFO</h4>Node Value: ${data.Nodes[z].Value}</b><br>Claimed By: ${data.Nodes[z].ClaimedBy} <br>";
      `);

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
    left: ${data.Bots[z].Location.X * nodesize}px;
    bottom: ${data.Bots[z].Location.Y * nodesize}px;
    `);
    newdiv.setAttribute('class', 'bot');
    newdiv.setAttribute('id', data.Bots[z].Id);
    newdiv.setAttribute('onClick',`
    document.getElementById('botinfo').innerHTML="<h4>BOT INFO</h4><b>${data.Bots[z].Id}</b><br>Number of Claims: ${data.Bots[z].Claims.length} <br>Score: ${data.Bots[z].Score} <br>";
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
      left: ${data.Bots[z].Location.X * nodesize}px;
      bottom: ${data.Bots[z].Location.Y * nodesize}px;
      `);
  }

  }
  updateBotsCall.open("GET", botsLink, true);
  updateBotsCall.send();

}, 1000);
