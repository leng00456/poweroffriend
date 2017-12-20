/**
 * Clear state.
 */
function Clear() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Clear.prototype = proto;

Clear.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Clear.prototype.create = function() {
	this.music = this.add.sound("victory",1,true);
	this.music.loop =  false;
	this.music.play();
	
	this.bg = this.game.add.sprite(0, 0, "clear");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	var twn = this.add.tween(this.bg);
	twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
	
	this.bg.inputEnabled = true;
	this.bg.events.onInputDown.add(this.backmenu, this);
};

Clear.prototype.backmenu = function() {
	this.game.state.start("Credit");
	this.music.stop();
};
