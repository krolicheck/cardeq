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

        var units = me.loader.getJSON("units").units;
        units.forEach(function(unit) {
            c.addChild(me.pool.pull(unit.name, unit));
        });
        //var dwarf1 = me.pool.pull("Dwarf", 200, 200);
        //var dwarf2 = me.pool.pull("Dwarf", 400, 200);

        //me.game.world.addChild(dwarf1);
        //me.game.world.addChild(dwarf2);
    },

    /**
     *  action to perform on state change
     */
    onDestroyEvent: function() {
    }
});
