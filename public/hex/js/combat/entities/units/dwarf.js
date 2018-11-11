

/**
 * a dwarf entity
 */
game.combat.Dwarf = me.Entity.extend(
    {
        init:function (options) {
            alert(window.findTiles)
            options.image = me.loader.getImage("dwarf");
            options.width = 44;
            options.height = 64;
            options.framewidth = 44;
            options.frameheight = 64;
            var unitLayer = me.game.world.getChildByName("UnitLayer")[0];

            this.tile = unitLayer.setTile( options.location.x,  options.location.y, 4);
            console.log(this.tile.getBounds());
            let bodyX = this.tile.pos.x;
            if (!this.isEven(this.tile.pos.y)){
                bodyX = bodyX + this.tile.width / 2;
            }
            console.log(this.isEven(this.tile.pos.y) + options.id);
            let bodyY = this.tile.pos.y / 1.4 - this.tile.height / 2;
            this._super(me.Entity, "init", [bodyX, bodyY, options]);
            this.renderable.addAnimation ("idle_selected", [9]);
            this.renderable.addAnimation ("go",  [0,1,2,3,4,5,6,7,8]);
            this.renderable.addAnimation ("idle", [0]);


            this.alwaysUpdate = true;
            this.body.gravity.y = 0;
            this.name = options.name;
            this.renderable.setCurrentAnimation("idle");
            this.selected =  options.selected || false;
        },

        /*draw : function (renderer) {
            this._super(me.Entity, "draw", [renderer] );
        },*/
        isEven : function (n) {
            return n === parseFloat(n)? !(n%2) : void 0;
        },

        update : function ( dt )
        {
            //this.renderable.setBounds(this.tile.getBounds());
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
                if (this.selected) {
                    if (!this.renderable.isCurrentAnimation("idle_selected")) {
                        this.renderable.setCurrentAnimation("idle_selected");
                    }
                } else {
                    if (!this.renderable.isCurrentAnimation("idle")) {
                        this.renderable.setCurrentAnimation("idle");
                    }
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