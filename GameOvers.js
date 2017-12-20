/**
 * GameOver state.
 */
function GameOvers() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
GameOvers.prototype = proto;

GameOvers.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

GameOvers.prototype.create = function() {
	this.musicStory = this.add.sound("died",1,true);
	this.musicStory.loop =  false;
	this.musicStory.play();
	
	this.bg = this.game.add.sprite(0, 0, "gameover");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	var twn = this.add.tween(this.bg);
	twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
	
	this.bg.inputEnabled = true;
	this.bg.events.onInputDown.add(this.backmenu, this);
};

GameOvers.prototype.backmenu = function() {
	this.game.state.start("map");
	this.musicStory.stop();
};
