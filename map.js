/**
 * map state.
 */
function map() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
map.prototype = proto;

map.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

map.prototype.create = function() {

	this.musicgame = this.add.sound("musicgame",1,true);
	this.musicgame.loop =  false;
	this.musicgame.play();
	 this.musicgame.volume = 0.5;
	// เริ่มใช้Physic Engine ARCADE
	// ใช้ส ำหรับตรวจสอบกำรชน และ กำรเคลื่อนที่
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	this.cursor = this.input.keyboard.createCursorKeys();
	this.game.score = 0;
	
	 this.bg = this.game.add.sprite(0, 0, "bg5");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	/*this.bg2 = this.game.add.sprite(800, 425, "water");
	this.bg2.fixedToCamera = false;
	this.bg2.width = this.game.width;
	this.bg2.height = this.game.height;*/
	 
	
	this.map = this.game.add.tilemap("lab8");
	this.map.addTilesetImage('tile_sheet');
	this.map_layer = this.map.createLayer("Tile Layer 1");
	// ปรับขนำด world ให้กว้ำง เท่ำกับ ขนำดของ map 
	this.scoreText = this.add.text(this.game.camera.width/2, 0, 'Star : '+this.game.score,{ font: '34px Arial',fill: 'white' });
	this.scoreText.fixedToCamera = true;
	this.game.time.events.add(Phaser.Timer.SECOND * 90, this.die, this);
	this.map_layer.resizeWorld();
	// ก ำหนดให้ tile id 0 ถึง 17 เป็นตัวที่จะใช้ตัวสอบกำรชน
	this.map.setCollisionBetween(0, 72, true, this.map_layer);
	// แสดง sprite
	this.enemies = this.add.group();
	this.goal = this.add.group();
	this.enemies2 = this.add.group();
	


	for (x in this.map.objects.object) {
		var obj = this.map.objects.object[x];
		if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("run");
		} else if (obj.type == "enemy1") {
			var c = this.addCat(obj.x, obj.y);
			this.enemies.add(c);
		} else if (obj.type == "enemy2") {
			var c = this.additem(obj.x, obj.y);
			this.enemies2.add(c);
		} else if (obj.type == "goal") {
			// เพิ่ม sprite goal
			var g = this.addGoal(obj.x,obj.y);
			this.goal.add(g);
		}
	}
	
};

map.prototype.update = function() {
	this.game.physics.arcade.collide(this.player,this.map_layer);
	this.game.physics.arcade.collide(this.enemies,this.map_layer);
	this.game.physics.arcade.collide(this.goal,this.map_layer);
	this.game.physics.arcade.collide(this.enemies2,this.map_layer);
	this.physics.arcade.collide(this.player,this.enemies,this.onPlayerCollide,null,this);
	this.physics.arcade.collide(this.player,this.enemies2,this.die,null,this);
	
	  this.game.physics.arcade.overlap(this.player, this.enemies, this.collectCoin, null, this);
	  this.game.debug.text("Time : " + this.game.time.events.duration/1000, 32, 32);

	  if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT))
	    {
	    	 this.player.scale.x=-1.0;
			 this.player.body.velocity.x = -150;		 
		}
	    else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
	    {
	    	 this.player.scale.x=1.0;
			 this.player.body.velocity.x = 150;		 
		}
	    else if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.onFloor() )
	    {
	    	 this.player.body.velocity.y = -700;
		}
	    
		if(this.player.body.onFloor())
		{
			if(this.player.body.velocity.x>0)
			{
				this.player.play("run");
			}else if(this.player.body.velocity.x<0)
			{
				this.player.play("run");
			}else
			{
				this.player.play("idle");
			}
		}else
		{
			this.player.play("jump");
		}
	    if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.onFloor())
	    {
	   	 	this.player.body.velocity.y = -700;
	   	 this.jumpp = this.add.sound("jumpp",1,true);
			this.jumpp.loop =  false;
			this.jumpp.play();
			this.jumpp.volume = 0.3;
		}
		
	    if(this.game.score == 10){
	    	this.physics.arcade.collide(this.player,this.goal,this.Next,null,this);
	    }
		
};


map.prototype.addScoreText = function(enemies) {

    //score text
    addScore = this.add.text(enemies.x, enemies.y, '+1 Star', {
        fill: 'lightgreen'
    });
    delay = this.add.tween(addScore);
    delay.to({
        y: enemies.y - 20
    }, 500, "Linear", true, 500);
    delay.onComplete.add(function(addScore) {
        addScore.kill();
    }, this);
    //kill the +1 on delay play complete
}
;
map.prototype.Next = function(player,goal){ 
	this.musicgame.stop();
	this.game.state.start("Clear");
	
}

map.prototype.die= function(player,enemies2){ 
	this.musicgame.stop();
	this.game.state.start("GameOvers");
}

map.prototype.onPlayerCollide = function(player,enemies){ 
	this.star = this.add.sound("star",1,true);
	this.star.loop =  false;
	this.star.play();
	enemies.kill();
	this.game.score++;
	this.scoreText.text = 'Star : '+this.game.score;
	this.addScoreText(enemies);
	return true; 
}


function gframes(key, n) {
	var f = [];
	for (var i = 0; i <= n; i++) {
		var kf = key + "_" + (("00" + i).slice(-3));
		f.push(kf);
	}
	return f;
}
map.prototype.addPlayer = function(x, y) {
	var t = this.add.sprite(x, y, "marry");
	t.animations.add("idle", mframe("idle", 4), 5, true);
	t.animations.add("dead", mframe("dead", 5), 6, true);
	t.animations.add("jump", mframe("jump", 4), 2, true);
	t.animations.add("run", mframe("run", 10), 12, true);
	t.anchor.set(0, 1);
	t.smoothed = false;
	this.game.physics.arcade.enable(t);
	t.play("idle");
	this.game.physics.enable(t);
	//
	t.body.drag.setTo(500, 0);
	t.body.collideWorldBounds = true;
	return t;
};
function mframe(key, n) {
	f = [];
	for (var i = 1; i < n; i++) {
		f.push(key + " (" + i + ")");
	}
	return f;
}
map.prototype.addCat = function(x, y) {
	c = this.add.sprite(x, y, "Star");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	//enable physic
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};
map.prototype.addGoal = function(x, y) {
	c = this.add.sprite(x, y, "Goal");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};
map.prototype.additem = function(x, y) {
	c = this.add.sprite(x, y, "item");
	c.anchor.set(0,0.9);
	c.smoothed = false;
	this.game.physics.enable(c);
	c.body.collideWorldBounds = true;
	return c;
};