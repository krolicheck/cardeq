let Game = require('./lib/game.js');

let settings = { 
	width : 800 ,
	height : 600,
	debug : true,
	ctx : me
};

let game = new Game(settings);		

me.device.onReady(function onReady() {    
    game.onload();
});