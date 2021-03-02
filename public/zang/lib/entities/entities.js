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