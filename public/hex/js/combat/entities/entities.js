game.combat.units = [];
/**
 *  a text entity to display mouse coords
 */
game.combat.TextEntity = me.Renderable.extend({
    init: function (x, y, width, height) {
        this.text = "?,?";
        this.font_size = 20;
        this.font = new me.Font("courier", this.font_size, "white");

        // call the constructor
        this._super(me.Renderable, "init", [x, y , width, height]);

        this.anchorPoint.set(0, 0);
        this.floating = true;

        this.isKinematic = false;
    },

    onActivateEvent: function () {
        var self = this;
        this.pointerMove = me.event.subscribe("pointermove", function (event) {
            self.text = "?,?";
            var layer = me.game.world.getChildByName("BatleGround")[0];
            var selLayer = me.game.world.getChildByName("CursorLayer")[0];
            var tile = layer.getTile(event.gameWorldX - layer.getBounds().pos.x, event.gameWorldY - layer.getBounds().pos.y );
            //console.log(me.game.world.getChildByProp("id", "Dwarf1")[0]);
            if (tile) {
                for (var i=0; i<selLayer.cols; i++) {
                    for (var j=0; j<selLayer.rows; j++) {
                        selLayer.clearTile(i, j);
                    };
                };
                selLayer.setTile(tile.col, tile.row, 4);
                self.text = tile.col + "," + tile.row + "," + tile.tileId;
            }
            
            //console.log(layer.layerData[0][0].tileId);
        });
        this.pointerDown = me.event.subscribe("pointerdown", function (event) {
            me.state.change(me.state.LOADING);
        });
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

game.combat.BackGround = me.ImageLayer.extend({
    init:function (x, y, imageName) {
            this._super(me.ImageLayer, "init", [x, y , { image: me.loader.getImage(imageName), framewidth: 640, frameheight: 443}]);
            this.repeat = "no-repeat";
    }
});