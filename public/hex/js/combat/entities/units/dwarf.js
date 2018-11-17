

/**
 * a dwarf entity
 */
game.combat.Dwarf = me.Entity.extend(
    {
        init:function (options) {
            options.image = me.loader.getImage("dwarf");
            options.width = 44;
            options.height = 64;
            options.framewidth = 44;
            options.frameheight = 64;
            let unitLayer = me.game.world.getChildByName("UnitLayer")[0];

            this.tile = unitLayer.setTile( options.location.x,  options.location.y, 4);
            let bodyX = this.tile.pos.x;
            if (!this.isEven(this.tile.pos.y)){
                bodyX = bodyX + this.tile.width / 2;
            }
            let bodyY = this.tile.pos.y / 1.4 - this.tile.height / 2;
            this._super(me.Entity, "init", [bodyX, bodyY, options]);
            this.renderable.addAnimation ("idle_selected", [9]);
            this.renderable.addAnimation ("go",  [0,1,2,3,4,5,6,7,8]);
            this.renderable.addAnimation ("idle", [0]);


            this.alwaysUpdate = true;
            this.body.gravity.y = 0;
            this.name = options.name;
            this.renderable.setCurrentAnimation("idle");
            if(options.selected || false){
                this.select();
            } else {
                this.selected = false;
            }
        },

        /*draw : function (renderer) {
            this._super(me.Entity, "draw", [renderer] );
        },*/
        isEven : function (n) {
            return n === parseFloat(n)? !(n%2) : void 0;
        },

        clearLayer : function(layerName){
            let layer = me.game.world.getChildByName(layerName)[0];
            for (let i=0; i<layer.cols; i++) {
                for (let j=0; j<layer.rows; j++) {
                    layer.clearTile(i, j);
                };
            };
        }
        , createMaze : function(layerName){
            let layer = me.game.world.getChildByName(layerName)[0];
            let result = new Array();
            for (let i=0; i<layer.rows; i++) {
                let arr = new Array();
                result.push(arr);
                for (let j=0; j<layer.cols; j++) {
                    let tile = layer.layerData[j][i];
                    if (tile) {
                        arr.push(0);
                    } else {
                        arr.push(1);
                    }
                };
            };
            return result;
        },
        createAvailTile : function(layerName, arr){
            let layer = me.game.world.getChildByName(layerName)[0];
            let result = new Array();
            for (let i=0; i<layer.cols; i++) {
                for (let j=0; j<layer.rows; j++) {
                    if (arr[j][i] == 1) {
                        layer.setTile(i,j,2);
                    }
                };
            };
            return result;
        },

        select : function(){
            if (!this.selected){
                this.selected = true;
                this.clearLayer("SelectionLayer");
            }
            let maze = this.createMaze("ObstacleLayer");
            let avTile = window.findTiles(maze, this.tile.col, this.tile.row, 4 );
            this.createAvailTile("SelectionLayer", avTile);
        },

        unSelect : function(){
            if (this.selected){
                this.selected = false;
            }
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