(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let entities = {};
/**
 *  a text entity to display mouse coords
 */
entities.TextEntity = me.Renderable.extend({
    init: function (x, y, width, height, callback) {
        this.text = "init";
        this.font_size = 20;
        this.font = new me.Font("courier", this.font_size, "white");

        // call the constructor
        this._super(me.Renderable, "init", [x, y , width, height]);

        this.anchorPoint.set(0, 0);
        this.floating = true;
		this.callback = callback;
        this.isKinematic = false;
    },

    onActivateEvent: function () {        
        if (this.callback) {
		 this.pointerMove = me.event.subscribe("pointermove", this.callback);
		} else {
			self.text = "Callback not defined";			
		}		        
    },	

    draw : function (renderer) {
        renderer.setColor("black");
        renderer.fillRect(
            this.left,  this.top,
            this.width, this.height
        );
        this.font.draw(renderer,this.text,this.pos.x, this.pos.y);
    },

    update : function () {
        return true;
    },
});

entities.BackGround = me.ImageLayer.extend({
    init:function (settings) {
            this._super(me.ImageLayer, "init", [x, y , { image: me.loader.getImage(settings.imageName), framewidth: settings.framewidth || 800, frameheight: settings.frameheight || 600}]);
            this.repeat = "no-repeat";
    }
});


module.exports = entities;
},{}],2:[function(require,module,exports){
let PlayScreen = require('./screens/play.js');

let Game = me.Object.extend({
	
	
	init : function(settings){
		let s = settings || {};
		this.ctx = settings.ctx;
		this.resources = s.resources || [];  
		this.state = me.state.LOADING  
		this.settings = s;
		
	},
	/**
     *
     * Initialize the application
     */
    onload: function() {

        // init the video
        if (!this.ctx.video.init(this.settings.width || 800, this.settings.height || 600, {wrapper : "screen", scale : "none"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }		
        // set all ressources to be loaded
        this.ctx.loader.preload(this.resources, this.loaded.bind(this));
    },


    /**
     * callback when everything is loaded
     */
    loaded: function () {
        		
		let playScreen = new PlayScreen(this.settings);				
		let c = this.ctx;
		
        c.state.set(c.state.PLAY, playScreen);
        c.state.set(c.state.LOADING, playScreen);

        // set the fade transition effect
        c.state.transition("fade","#000000", 250);

        // register on mouse event
        c.input.registerPointerEvent("pointermove", c.game.viewport, function (event) {
            c.event.publish("pointermove", [ event ]);
        },false);

        c.input.registerPointerEvent("pointerdown", c.game.viewport, function (event) {
            c.event.publish("pointerdown", [ event ]);
        },false);

        // enable the keyboard
        c.input.bindKey(c.input.KEY.LEFT,  "left");

        c.input.bindKey(c.input.KEY.RIGHT, "right");
        // switch to PLAY state
        this.state = c.state.PLAY;
        c.state.change(c.state.PLAY);
    }
	
});

module.exports = Game;
},{"./screens/play.js":3}],3:[function(require,module,exports){
let entities = require('../entities/entities.js');

PlayScreen = me.ScreenObject.extend({
    
	init : function(settings){
		this.settings = settings;
		this.ctx = settings.ctx;
	},
	
	/**
     *  action to perform on state change
     */
    onResetEvent: function() {		
		this.settings = this.settings || {};
		// load a level
        //var c = new me.Container(0, 0, this.settings.width || 800, this.settings.height || 600);
		//me.game.world.addChild(c);
        if(this.settings.debug){
			this.setDebug();
		}				            
    },
	
	setDebug: function(){
		var comp = new entities.TextEntity(0,0,this.settings.width || 800, 20, function (event) {
            if (event) {
				comp.text = event.gameWorldX + "," + event.gameWorldY;           
			}
        });
		this.ctx.game.world.addChild(comp);
	},

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {}
});


module.exports = PlayScreen;

},{"../entities/entities.js":1}],4:[function(require,module,exports){
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
},{"./lib/game.js":2}]},{},[4]);
