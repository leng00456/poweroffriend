/**
 *
 */
function Credit () {
   Phaser.State.call(this);
}
/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Credit.prototype = proto;

Credit.prototype.preload = function() {
	this.load.pack("Credit", "assets/assets-pack.json");
};

Credit.prototype.create = function() {
	this.bg = this.game.add.sprite(0, 0, "bg2");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	var logo1 = this.add.sprite(this.world.centerX,-200,"back");
	logo1.width = 200;
	logo1.height = 200;
	logo1.anchor.set(-1.7,0);
	var twn = this.add.tween(logo1);
	twn.to({ y:550}, 1500, "Bounce.easeInOut", true,0);
	
	logo1.inputEnabled = true;

	logo1.events.onInputDown.add(this.BackMenu, this);
	

};

Credit.prototype.BackMenu = function() {
	this.game.state.start("Menu");
};




