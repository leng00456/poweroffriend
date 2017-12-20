window.onload = function() {
	// Create your Phaser game and inject it into an auto-created canvas.
	// We did it in a window.onload event, but you can do it anywhere (requireJS
	// load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(1280, 800, Phaser.AUTO);

	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Menu", Menu);
	game.state.add("Credit", Credit);
	game.state.add("GameOver", GameOver);
	game.state.add("GameOvers", GameOvers);
	game.state.add("Clear", Clear);
	game.state.add("Preload", Preload);
	game.state.add("Level", Level);
	game.state.add("map", map);
	game.state.add("Credit", Credit);
	game.state.add("Story", Story);
	
	

	// Now start the Boot state.
	game.state.start("Boot");
};
