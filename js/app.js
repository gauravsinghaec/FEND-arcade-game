var playersDiv = document.getElementsByClassName('players')[0];
var modalBadgeDiv = document.getElementsByClassName('fa-icon')[0];
var modalDialogueDiv = document.getElementsByClassName('message')[0];
var t = 0;

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
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
 * @param:
 *      dt (data type: number): a time delta between ticks
 * @returns:
 *      None
 */
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
	if (this.x >= (enemyStartX + 5*100)){
		this.x = -100;
	}
	else if(this.x == 0)
	{
		this.x = this.x + 100*dt;
	}
	else
	{
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
	if ((player.x <= this.x+70 && player.x+70 >= this.x) && player.y == this.y){
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
	if (this.x >= 402){
		this.x = 1;
	}
	else if(this.x <= 0)
	{
		this.x = 401
	}
	else if (this.y < 0)
	{
		this.y = 0;
		launchModal('win');
	}
	else if (this.y > playerStartY)
	{
		this.y = playerStartY;
	}
};

/*
 * Add default values to the key's stroke
 * to move player in both x and y axis
 * @param:
*      keyCode (data type: String): left, right, up and down
 * @returns:
 *      None
 */
Player.prototype.handleInput = function(keyCode) {
	if(!t){
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
 * Now instantiate your enemy objects.
 * Place all enemy objects in an array called allEnemies
 */
var allEnemies = [];
var enemyStartX= 0;
var enemyStartY= 73;

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

/*
 * Now instantiate your player object.
 * Place the player object in a variable called player
 */
var playerStartX= 201;
var playerStartY= 405;
var player = new Player(playerStartX,playerStartY,'images/char-boy.png');
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
 * Static list that holds all of the players and collectibles
 */
//************************
var model = {
	scoreCounter: 0,
	timer: 15,
	collectibles : [
		'images/Gem Blue.png',
		'images/Gem Green.png',
		'images/Gem Orange.png',
		'images/Star.png',
		'images/Heart.png',
		'images/Key.png',
		'images/Rock.png'
		],
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
	// Get the shuffled list of collectibles
	getAllCollectibles: function(){
		return shuffle(model.collectibles);
	},

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
	updateScore: function(){
		model.scoreCounter++;
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

	// Reset timer
	resetTimer: function(){
		model.timer = 15;
		t = 0;
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
 * This view keeps track of move counter and star rating update
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
		this.restartBtn.addEventListener('click',restartGame,false);
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
 * Reload the page and start new game
 * @param:
 *      None
 * @returns:
 *      None
 */
function restartGame() {
	/*
	 * increment the timer by 1 sec at each sec of interval
	 * use 't' to clear the time interval event when user wins
	 * start the timer only when user clicks on card first time
	 */
	document.location.reload();
}

/*
 * Reload the page and start new game
 * @param:
 *      None
 * @returns:
 *      None
 */
function startGame() {
	/*
	 * increment the timer by 1 sec at each sec of interval
	 * use 't' to clear the time interval event when user wins
	 * start the timer only when user clicks on card first time
	 */
	window.clearInterval(t);
	controller.resetTimer();
	if(!t){
		t = window.setInterval(function() {
			controller.updateTimer();
		}, 1000);
	}
}

/*
 * Launch the modal popup view
 * @param:
 *      None
 * @returns:
 *      None
 */
function launchModal(eventName) {
	/*
	 * increment the timer by 1 sec at each sec of interval
	 * use 't' to clear the time interval event when user wins
	 * start the timer only when user clicks on card first time
	 */
	window.pause = true;
	window.clearInterval(t);
	if(eventName === 'win'){
		modalBadgeDiv.firstElementChild.className = 'fa fa-trophy';
		modalDialogueDiv.firstElementChild.textContent = 'Congradulations!! You Won!';
	}else if(eventName === 'collision'){
		modalBadgeDiv.firstElementChild.className = 'fa fa-bug';
		modalDialogueDiv.firstElementChild.textContent = 'Oh no!! You have been bitten by bug!';
	}else if(eventName === 'timeup'){
		modalBadgeDiv.firstElementChild.className = 'fa fa-clock';
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

