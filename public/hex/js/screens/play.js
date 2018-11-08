game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {

        var level = me.levelDirector.getCurrentLevel();
        level.backgroundcolor = undefined;
        var c = new me.Container(100, 100, 640, 480);

        // load a level
        me.levelDirector.loadLevel("combat", {container : c, setViewportBounds : false});
        me.game.world.addChild(new game.combat.BackGround(40,40, "background"));
        me.game.world.addChild(c);
        me.game.world.addChild(new game.combat.TextEntity(0,0,100,20));
        var dwarf = new game.combat.Dwarf(200,200);
        me.game.world.addChild(dwarf);

    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {
    }
});
