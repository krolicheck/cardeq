
game = {};

game.combat = {

    state: me.state.LOADING,
    /**
     *
     * Initialize the application
     */
    onload: function() {

        // init the video
        if (!me.video.init(800, 600, {wrapper : "screen", scale : "none"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // set all ressources to be loaded
        me.loader.preload(game.resources, this.loaded.bind(this));
    },


    /**
     * callback when everything is loaded
     */
    loaded: function ()    {

        // set the "Play/Ingame" Screen Object
        var playScreen = new game.PlayScreen();
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
};

me.device.onReady(function onReady() {    
    game.combat.onload();
});
