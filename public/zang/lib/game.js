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