/*
 * The base position of objects on canvas are x=9,y=17.
 * Players moves 100 unit in single move to the left and right
 * so valid points in x axis are 9, 109, 209, 309, 409
 * Players moves 83 unit in single move to the up and Down
 * so valid points in y axis are 17, 100, 183, 266, 349, 432
 */

// player elements will added to this element on page load
var playersDiv = document.getElementsByClassName('players')[0];

// Badge icon and dialogue element will added to this element on modal popup
var modalBadgeDiv = document.getElementsByClassName('fa-icon')[0];
var modalDialogueDiv = document.getElementsByClassName('message')[0];

// setInterval event refernce variable
var t = 0;

// Master array for collectibles(gems)
var gems = [];

/*
 * Parent method to create an entity which will
 * be invoked with image and location unique to the entity
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
var Entity = function(x,y,imgLoc) {
	this.x = x;
	this.y = y;
	this.sprite = imgLoc;
};

/*
 * Common render method to draw object on the screen
 * and will be delegated to child due to inheritence
 * @param:
 *      None
 * @returns:
 *      None
 */
Entity.prototype.render = function() {
	// Draw image of 83 x 116 dimention on the canvas
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y,83,116);
};

/*
 * Enemies objects our player must avoid
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
var Enemy = function(x,y,image) {
	// Inherit the parent properties using prototypal inheritence
	Entity.call(this,x,y,image);

};

/*
 * Enemy objects will delegate to Entity prototype
 * for common render method
 */
Enemy.prototype = Object.create(Entity.prototype);

// Restoring the Enemy's constructor property
Enemy.prototype.constructor = Enemy;

/*
 * Update the enemy's position, required method for game
 * You should multiply any movement by the dt parameter
 * which will ensure the game runs at the same speed for
 * all computers.
 * @param:
 *      dt (data type: number): a time delta between ticks
 * @returns:
 *      None
 */
Enemy.prototype.update = function(dt) {
	if (dt >= 1)
	/* This checks if the delta is unexpectedly large
	 * which happens when we stops the requestAnimationFrame
	 * from calling main() fuction in loop and then restart
	 * the main() loop and requestAnimationFrame
	 */
		dt = 0.015;

	if (this.x >= (enemyStartX + 5*100)){
	/* if the enemy objects moves off the canvas, start from
	 * the left again.
	 */
		this.x = -100;
	}
	else
	{
	/* Apply movement to the enemy objects
	 */
		this.x = this.x + 100*dt;
	}
};

/*
 * Handles collision with the Player
 * @param:
 *      dt (data type: number): a time delta between ticks
 * @returns:
 *      true/false (data type: boolean) : true if collision happens
 */
Enemy.prototype.checkCollisions = function() {
	if ((player.x <= this.x+55 && player.x+55 >= this.x) && player.y == this.y){
		launchModal('collision');
		return true;
	}
};

/*
 * Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
var Player = function(x,y,image) {
	Entity.call(this,x,y,image);
};

/*
 * Player objects will delegate to Entity prototype
 * for common render method
 */
Player.prototype = Object.create(Entity.prototype);

// Restoring the Player's constructor property
Player.prototype.constructor = Player;
/*
 * Update the player's position, required method for game
 * @param:
 *      None
 * @returns:
 *      None
 */
Player.prototype.update = function() {
	if (this.x >= 410){
	/* if the player object moves off the canvas to right,
	 * start from the left again.
	 */
		this.x = 9;
	}
	else if(this.x <= 0)
	{
	/* if the player object moves off the canvas to left,
	 * start from the right again.
	 */
		this.x = 409
	}
	else if (this.y <= 17)
	{
	/* if the player object reaches the water,
	 * stop the game and show popup message for winning
	 */
		this.y = 17;
		launchModal('win');
	}
	else if (this.y > playerStartY)
	{
	/* if the player object can't move further down from
	 * the start position
	 */
		this.y = playerStartY;
	}
};

/*
 * Add default values to the key's stroke
 * to move player in both x and y axis (one grid in single move)
 * @param:
*      keyCode (data type: String): left, right, up and down
 * @returns:
 *      None
 */
Player.prototype.handleInput = function(keyCode) {
	if(!t && (keyCode === 'left' || keyCode === 'right' || keyCode === 'up')){
	/* if the player moves for the first time then start the timer
	 * and hence the game. It won't run if the game is already on.
	 */
		startGame();
	}
	switch(keyCode){
		case 'left':
			this.x = this.x - 100;
			break;
		case 'right':
			this.x = this.x + 100;
			break;
		case 'up':
			this.y = this.y - 83;
			break;
		case 'down':
			this.y = this.y + 83;
			break;
	}

};

/*
 * Set the start position for enemy and hence initialize
 * the allEnemies array.
 */
var allEnemies = [];
var enemyStartX= 0;
var enemyStartY= 100;

/*
 * Now instantiate your enemy objects.
 * Place all enemy objects in an array called allEnemies
 */
var bug1 = new Enemy(enemyStartX,enemyStartY,'images/enemy-bug.png');
var bug2 = new Enemy(101,enemyStartY+83,'images/enemy-bug.png');
var bug3 = new Enemy(401,enemyStartY+83,'images/enemy-bug.png');
var bug4 = new Enemy(-101,enemyStartY+2*83,'images/enemy-bug.png');
var bug5 = new Enemy(301,enemyStartY,'images/enemy-bug.png');
var bug6 = new Enemy(-401,enemyStartY+2*83,'images/enemy-bug.png');
allEnemies.push(bug1);
allEnemies.push(bug2);
allEnemies.push(bug3);
allEnemies.push(bug4);
allEnemies.push(bug5);
allEnemies.push(bug6);

// Set the start position for player.
var playerStartX= 209;
var playerStartY= 432;

//Now instantiate your player object with a default player.
var player = new Player(playerStartX,playerStartY,'images/char-boy.png');

/*
 * Now write your own gem class
 * This class requires checkCollisions() method.
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
var Gem = function(x,y,image) {
	Entity.call(this,x,y,image);
};

/*
 * Player objects will delegate to Entity prototype
 * for common render method
 */
Gem.prototype = Object.create(Entity.prototype);

// Restoring the Gem's constructor property
Gem.prototype.constructor = Gem;
/*
 * Handles collision with the Player
 * @param:
 *      dt (data type: number): a time delta between ticks
 * @returns:
 *      true/false (data type: boolean) : true if collision happens
 */
Gem.prototype.checkCollisions = function() {
	if ((this.x == player.x) && (player.y == this.y)){
		var points = 0;
		switch(this.sprite){
			case 'images/Gem Blue.png':
				points = 50;
				break;
			case 'images/Gem Green.png':
				points = 30;
				break;
			case 'images/Gem Orange.png':
				points = 10;
				break;
			case 'images/Star.png':
				points = 100;
				break;
			case 'images/Rock.png':
				points = -100;
				break;
			case 'images/Key.png':
				points = 100;
				break;
			case 'images/Heart.png':
				points = 200;
				break;
		}
		controller.updateScore(points);
		return true;
	}
};

/*
 * Set the start position for Collectible and hence initialize
 * the allCollectibles array.
 */
var allCollectibles = [];
var gemStartX= 9;
var gemStartY= 100;

/*
 * Now instantiate your gem objects.
 * Place all gem objects in an array called allCollectibles
 */
var gem1 = new Gem(gemStartX,gemStartY,'images/Gem Blue.png');
var gem2 = new Gem(gemStartX+200,gemStartY+83,'images/Gem Green.png');
var gem3 = new Gem(gemStartX+400,gemStartY+83,'images/Gem Orange.png');
var gem4 = new Gem(gemStartX+100,gemStartY+2*83,'images/Star.png');
var gem5 = new Gem(gemStartX+300,gemStartY,'images/Key.png');
var gem6 = new Gem(gemStartX+300,gemStartY+2*83,'images/Rock.png');
var gem7 = new Gem(gemStartX+200,gemStartY,'images/Heart.png');
allCollectibles.push(gem1);
allCollectibles.push(gem2);
allCollectibles.push(gem3);
allCollectibles.push(gem4);
allCollectibles.push(gem5);
allCollectibles.push(gem6);
allCollectibles.push(gem7);

/*
 * Save the collectibles into master gems array
 * which will be used for resetting the canvas.
 * We are using slice to copy the array element
 * the assignment won't work as both variable will
 * reference the same array
 */
gems = allCollectibles.slice(0);

/*
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

//************************
/* *******Model
 * Static list that holds all of the timer, player, players and collectibles
 */
//************************
var model = {
	scoreCounter: 0,
	timer: 15,
	players : [
		'images/char-cat-girl.png',
		'images/char-princess-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-boy.png'
		]
};

//************************
// *******Controller
//************************
var controller = {

	// Get All the players
	getAllPlayers: function(){
		return model.players;
	},

	// Get the timer value
	getTimer: function(){
		return model.timer;
	},

	// Get the user's score
	getScore: function(){
		return model.scoreCounter;
	},

	// Update user's scores
	updateScore: function(points){
		model.scoreCounter += points;
		gameScoreView.render();
	},

	// Update timer
	updateTimer: function(){
		model.timer -= 1;
		if (model.timer === 0){
			launchModal('timeup');
		}
		gameScoreView.render();
	},

	// Reset timer and score
	resetTimerScore: function(){
		model.timer = 15;
		model.scoreCounter = 0;
		gameScoreView.render();
	},

	init: function(){
		playersListView.init();
		gameScoreView.init();
	},

};

//************************
// *******Views
//************************
/*
 * This view shows all availables players
 */
var playersListView = {
	init: function(){
		this.playersList = document.getElementsByClassName('players')[0];
		this.render();
	},

	render: function(){
		this.playersList.textContent='';
		var players = controller.getAllPlayers();
		var fragment = document.createDocumentFragment();
		for(var i=0 ; i<players.length ; i++)
		{
			var elem    = document.createElement('li');
			var image = document.createElement('img');
			image.src = players[i];
			elem.appendChild(image);
			fragment.appendChild(elem);
		}
		this.playersList.appendChild(fragment);//reflow and repaint here -- once!
	}
};

/*
 * This view keeps track of score counter and timer update
 */
var gameScoreView = {
	init: function(){
		this.score = document.getElementsByClassName('scores')[0];
		this.gameTime = document.getElementsByClassName('time')[0];
		this.restartBtn = document.getElementsByClassName('restart')[0];
		this.playBtn = document.getElementsByClassName('play')[0];
		this.render();
	},

	render: function(){
		this.score.textContent = controller.getScore();
		this.gameTime.textContent = controller.getTimer();
		// When the user clicks on replay, reset the canvas and score.
		this.restartBtn.addEventListener('click',restartGame,false);
		// When the user clicks on replay, reset the canvas,score and start the game
		this.playBtn.addEventListener('click',startGame,false);
	}
};

/*
 * This modal view display an appropriate message
 * based on event occured.
 */
var modalPopupView = {
	init: function(){
		this.modal = document.getElementById('popup-modal');
		this.modalSpan = document.getElementsByClassName('close')[0];
		this.replayBtn = document.getElementsByClassName('replay')[0];
		this.render();
	},

	render: function(){
		this.modal.style.display = 'block';

		// When the user clicks on replay, reset the canvas
		this.replayBtn.addEventListener('click',function(){
			var modal = document.getElementById('popup-modal');
			modal.style.display = 'none';
			restartGame();
		},false);

		// When the user clicks on <span> (x), close the modal
		this.modalSpan.addEventListener('click',function() {
			var modal = document.getElementById('popup-modal');
			modal.style.display = 'none';
		},false);

		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener('click',function(event) {
			var modal = document.getElementById('popup-modal');
			if (event.target == modal) {
				modal.style.display = 'none';
			}
		},false);
	}
};

//******************************//
//********Global Methods
//******************************//

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param:
 *      array (data type: array): list of cards
 * @returns:
 *      array (data type: array): shuffled list of cards
 */
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

/*
 * Reset the game by resetting the canvas and hence the
 * requestAnimationFrame to run the game smoothly again
 * @param:
 *      None
 * @returns:
 *      None
 */
function restartGame() {
	if(window.pause){
	/*
	 * check if the requestAnimationFrame is paused
	 * if so the reset and start it again also reser
	 * the player to start position, reser the timer
	 */
		window.pause = false;
		player.x = playerStartX
		player.y = playerStartY
		controller.resetTimerScore();
		/*
		 * Get all the collectibles from the master gems array
		 * We are using slice to copy the array element
		 * the assignment won't work as both variable will
		 * reference the same array
		 */
		allCollectibles = gems.slice(0);
		main();
	}
}

/*
 * Start the timer and hence the game
 * @param:
 *      None
 * @returns:
 *      None
 */
function startGame() {
	if(window.pause){
	/*
	 * check if the requestAnimationFrame is paused
	 * if so call restartGame() to reset the game.
	 */
		restartGame();
	}
	controller.resetTimerScore();
	if(!t){
	// It won't run if the game is already on.
		t = window.setInterval(function() {
			controller.updateTimer();
		}, 1000);
	}
}

/*
 * Launch the customised modal popup view based on the event
 * which triggered it.
 * @param:
 *      None
 * @returns:
 *      None
 */
function launchModal(eventName) {
	window.pause = true;
	// pause the requestAnimationFrame loop hence the game

	window.clearInterval(t);
	// Clear the timer event

	t = 0;
	// Reset the timer variable

	if(eventName === 'win'){
		// This gets triggered when player wins
		modalBadgeDiv.firstElementChild.className = 'fa fa-trophy';
		modalDialogueDiv.firstElementChild.textContent = 'Congradulations!! You Won!';

	}else if(eventName === 'collision'){
		// This gets triggered when player collides with enemy
		modalBadgeDiv.firstElementChild.className = 'fa fa-bug';
		modalDialogueDiv.firstElementChild.textContent = 'Oh no!! You have been bitten by bug!';

	}else if(eventName === 'timeup'){
		// This gets triggered when the game's time's up.
		modalBadgeDiv.firstElementChild.className = 'fa fa-thumbs-down';
		modalDialogueDiv.firstElementChild.textContent = "Hey Buddy!! Your time's up!";
	}
	modalPopupView.init();
}

/*
 * Load the game page views once DOM is loaded
 */
window.addEventListener('DOMContentLoaded',controller.init(),false);


/*
 * Event listener for replacing the default player with
 * our selected player
 */
playersDiv.addEventListener('click',function(event){
	player.sprite = event.target.getAttribute('src');
},false);
