let entities = require('../entities/entities.js');

PlayScreen = me.ScreenObject.extend({
    
	init : function(settings){
		this.settings = settings;
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
		me.game.world.addChild(comp);
	},

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {}
});


module.exports = PlayScreen;
