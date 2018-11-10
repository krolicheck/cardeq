/**
 * a dwarf entity
 */
game.combat.Dwarf = me.Entity.extend(
    {
        init:function (x, y) {
            this._super(me.Entity, "init", [x, y , {image: me.loader.getImage("dwarf"), width : 44, height : 64, framewidth: 44, frameheight: 64}]);
            this.renderable.addAnimation ("idle",  [9]);
            this.renderable.addAnimation ("go",  [0,1,2,3,4,5,6,7,8]);

            this.alwaysUpdate = true;
            this.body.gravity.y = 0;

            this.renderable.setCurrentAnimation("idle");
        },

        /*draw : function (renderer) {
            this._super(me.Entity, "draw", [renderer] );
        },*/

        update : function ( dt )
        {
            if (me.input.isKeyPressed('left')) {
                if (!this.renderable.isCurrentAnimation("go")) {
                    this.renderable.setCurrentAnimation("go");
                }
                this.renderable.flipX(true);
                this.body.vel.x = -1;
                //this.body.vel.y = -1.4;
            } else if (me.input.isKeyPressed('right')) {
                if (!this.renderable.isCurrentAnimation("go")) {
                    this.renderable.setCurrentAnimation("go");
                }
                this.renderable.flipX(false);
                this.body.vel.x = 1;
            } else {
                if (!this.renderable.isCurrentAnimation("idle")) {
                    this.renderable.setCurrentAnimation("idle");
                }
                this.body.vel.x = 0;
                this.body.vel.y = 0;
            }

            this.body.update(dt);

            return this._super(me.Entity, "update", [dt] );
        }
    });

game.resources.push({ name: "dwarf", type: "image", src: "data/img/units/dwarf.png"});

me.pool.register("Dwarf", game.combat.Dwarf);