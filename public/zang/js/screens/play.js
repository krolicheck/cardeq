game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        var c = new me.Container(100, 100, 640, 480);

        // load a level
        me.game.world.addChild(c);
        var comp = new game.combat.TextEntity(0,0,100,20, function (event) {
            if (event) {
				comp.text = event.gameWorldY + "," + event.gameWorldY;           
			}
        });
		me.game.world.addChild(comp);
    
    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {
    
	
	}
});
