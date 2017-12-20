/**
 * Story state.
 */
function Story() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.musicStory = this.add.sound("StorySound",1,true);
	this.musicStory.loop =  false;
	this.musicStory.play();
	this.voice1 = this.add.sound("voice1",1,true);
	this.voice1.loop =  false;
	this.voice1.play();
	
	this.bg = this.game.add.sprite(0, 0, "Story1");
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	var twn = this.add.tween(this.bg);
	twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
	
	this.bg.inputEnabled = true;

	this.bg.events.onInputDown.add(this.Story2, this);
	
};

	
Story.prototype.Story2 = function() {
	this.voice1.stop();
	this.voice2 = this.add.sound("voice2",1,true);
	this.voice2.loop =  false;
	this.voice2.play();
	this.bg1 = this.game.add.sprite(0, 0, "Story2");
	this.bg1.width = this.game.width;
	this.bg1.height = this.game.height;
	var twn = this.add.tween(this.bg1);
	twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
	
	this.bg1.inputEnabled = true;

	this.bg1.events.onInputDown.add(this.Story3, this);
	
};

Story.prototype.Story3 = function() {
	this.voice2.stop();
	this.voice3 = this.add.sound("voice3",1,true);
	this.voice3.loop =  false;
	this.voice3.play();
	
	this.bg2 = this.game.add.sprite(0, 0, "Story3");
	this.bg2.width = this.game.width;
	this.bg2.height = this.game.height;
	var twn = this.add.tween(this.bg2);
	twn.to({x :-50, y:0}, 7000, "Quad.easeInOut", true,0);
	
	this.bg2.inputEnabled = true;

	this.bg2.events.onInputDown.add(this.How, this);
	
};
Story.prototype.How = function() {
	this.voice3.stop();
	this.bg3 = this.game.add.sprite(0, 0, "How");
	this.bg3.width = this.game.width;
	this.bg3.height = this.game.height;
	
	this.bg3.inputEnabled = true;

	this.bg3.events.onInputDown.add(this.How2, this);
};
Story.prototype.How2 = function() {
	
	this.bg4 = this.game.add.sprite(0, 0, "How2");
	this.bg4.width = this.game.width;
	this.bg4.height = this.game.height;
	
	this.bg4.inputEnabled = true;

	this.bg4.events.onInputDown.add(this.Startgame, this);
};

Story.prototype.Startgame = function() {
	this.game.state.start("Level");
	this.musicStory.stop();
};
