/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	
	this.music2 = this.add.sound("menu",1,true);
	this.music2.loop =  false;
	this.music2.play();
	
	
	this.bg = this.game.add.sprite(0, 0, "bg");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	var sprite = this.add.sprite(this.world.centerX, this.world.centerY,"tap to start");
	sprite.anchor.set(0.5, 0.1);
	sprite.scale.set(0.5);
	
	var logo1 = this.add.sprite(this.world.centerX,-200,"about");
	logo1.width = 300;
	logo1.height = 350;
	logo1.anchor.set(-1,0);
	var twn = this.add.tween(logo1);
	twn.to({ y:550}, 1500, "Bounce.easeInOut", true,0);
	
	var logo = this.add.sprite(this.world.centerX,-200,"logo");
	logo.width = 800;
	logo.height = 350;
	logo.anchor.set(0.2,0.4);
	var twn = this.add.tween(logo);
	twn.to({ y:100}, 2000, "Quad.easeInOut", true,0);
	
	
	sprite.inputEnabled = true;
	logo1.inputEnabled = true;

	sprite.events.onInputDown.add(this.startGame, this);
	logo1.events.onInputDown.add(this.startCredit, this);
	
};
Menu.prototype.startCredit = function() {
	this.game.state.start("Credit");
	this.music2.stop();
};

	
Menu.prototype.startGame = function() {
	this.game.state.start("Story");
	this.music2.destroy();
};
