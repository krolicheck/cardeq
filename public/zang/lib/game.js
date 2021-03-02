let PlayScreen = require('./screens/play.js');

let Game = me.Object.extend({
	
	
	init : function(settings){
		let s = settings || {};
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
        if (!me.video.init(this.settings.width || 800, this.settings.height || 600, {wrapper : "screen", scale : "none"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // set all ressources to be loaded
        me.loader.preload(this.resources, this.loaded.bind(this));
    },


    /**
     * callback when everything is loaded
     */
    loaded: function () {
        		
		let playScreen = new PlayScreen(this.settings);				
	
        me.state.set(me.state.PLAY, playScreen);
        me.state.set(me.state.LOADING, playScreen);

        // set the fade transition effect
        me.state.transition("fade","#000000", 250);

        // register on mouse event
        me.input.registerPointerEvent("pointermove", me.game.viewport, function (event) {
            me.event.publish("pointermove", [ event ]);
        },false);

        me.input.registerPointerEvent("pointerdown", me.game.viewport, function (event) {
            me.event.publish("pointerdown", [ event ]);
        },false);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");

        me.input.bindKey(me.input.KEY.RIGHT, "right");
        // switch to PLAY state
        this.state = me.state.PLAY;
        me.state.change(me.state.PLAY);
    }
	
});

module.exports = Game;