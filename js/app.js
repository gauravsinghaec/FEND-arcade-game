/**
 * The base position of objects on canvas are x=9,y=17.
 * Players moves 100 unit in single move to the left and right
 * so valid points in x axis are 9, 109, 209, 309, 409
 * Players moves 83 unit in single move to the up and Down
 * so valid points in y axis are 17, 100, 183, 266, 349, 432
 */

// player elements will added to this element on page load
const playersDiv = document.querySelector('.players');

// Badge icon and dialogue element will added to this element on modal popup
const modalBadgeDiv = document.querySelector('.fa-icon');
const modalDialogueDiv = document.querySelector('.message');

// modal popup elements
const modal = document.getElementById('popup-modal');
const modalSpan = document.querySelector('.close');
const modalReplayBtn = document.querySelector('.replay');

// score header elements
const score = document.querySelector('.scores');
const gameTime = document.querySelector('.time');
const restartBtn = document.querySelector('.restart');
const playBtn = document.querySelector('.play');
// This function generates random whole number bitween max and min
const randomX = (max,min) => Math.floor(Math.random()*(max - min + 1)) + min;

/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param:
 * 		array (data type: array): array object
 * @returns:
 * 		array (data type: array): shuffled array object
 */
const shuffle = (array) => {
	let currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}
  
// setInterval event refernce variable
let t = 0;

// Master array for collectibles(gems)
let gems = [];

/**
 * Parent method to create an entity which will
 * be invoked with image and location unique to the entity
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
class Entity {
	constructor(x,y,imgLoc){
		this.x = x;
		this.y = y;
		this.sprite = imgLoc;
	}
/**
 * Common render method to draw object on the screen
 * and will be delegated to child due to inheritence
 * @param:
 *      None
 * @returns:
 *      None
 */
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y,83,116);
	}
}

/**
 * Enemies objects our player must avoid
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
class Enemy extends Entity {
	constructor(x,y,imgLoc){
		// Inherit the parent properties
		super(x,y,imgLoc);
		// randomly assign values between 200 and 500 during instantiation
		this.speedFactor = randomX(5,2)*100;
	}

	/**
	 * Update the enemy's position, required method for game
	 * You should multiply any movement by the dt parameter
	 * which will ensure the game runs at the same speed for
	 * all computers.
	 * @param:
	 *      dt (data type: number): a time delta between ticks
	 * @returns:
	 *      None
	 */
	update(dt){
		if (dt >= 1)
		/**
		 * This checks if the delta is unexpectedly large
		 * which happens when we stops the requestAnimationFrame
		 * from calling main() fuction in loop and then restart
		 * the main() loop and requestAnimationFrame
		 */
			dt = 0.015;

		if (this.x >= (enemyStartX + 5*100)){
		/**
		 * if the enemy objects moves off the canvas,
		 * start from the left again.
		 */
			this.x = -100;
		}
		else
		{
			// update enemy speed based on its speedFactor property
			dt = (dt * 500) / this.speedFactor;
			// Apply movement to the enemy objects
			this.x = this.x + 100*dt;
		}
	}

	/**
	 * Handles collision with the Player
	 * @param:
	 *      dt (data type: number): a time delta between ticks
	 * @returns:
	 *      true/false (data type: boolean) : true if collision happens
	 */
	checkCollisions() {
		if ((player.x <= this.x+55 && player.x+55 >= this.x) && player.y == this.y){
			utils.launchModal('collision');
			return true;
		}
	}

}

/**
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
class Player extends Entity {
	constructor(x,y,imgLoc){
		// Inherit the parent properties
		super(x,y,imgLoc);
	}

	/**
	 * Update the player's position, required method for game
	 * @param:
	 *      None
	 * @returns:
	 *      None
	 */
	update() {
		if (this.x >= 410){
		/**
		 * if the player object moves off the canvas to right,
		 * start from the left again.
		 */
			this.x = 9;
		}
		else if(this.x <= 0)
		{
		/**
		 * if the player object moves off the canvas to left,
		 * start from the right again.
		 */
			this.x = 409
		}
		else if (this.y <= 17)
		{
		/**
		 * if the player object reaches the water,
		 * stop the game and show popup message for winning
		 */
			this.y = 17;
			utils.launchModal('win');
		}
		else if (this.y > playerStartY)
		{
		/**
		 * if the player object can't move further down from
		 * the start position
		 */
			this.y = playerStartY;
		}
	}

	/**
	 * Add default values to the key's stroke
	 * to move player in both x and y axis (one grid in single move)
	 * @param:
	 *      keyCode (data type: String): left, right, up and down
	 * @returns:
	 *      None
	 */
	handleInput(keyCode) {
		if(!t && (keyCode === 'left' || keyCode === 'right' || keyCode === 'up')){
		/**
		 * if the player moves for the first time then start the timer
		 * and hence the game. It won't run if the game is already on.
		 */
			utils.startGame();
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

	}

};

/**
 * Set the start position for enemy and hence initialize
 * the allEnemies array.
 */
let allEnemies = [];
const enemyStartX= 0;
const enemyStartY= 100;

/**
 * Now instantiate your six enemy objects.
 * Place all enemy objects in an array called allEnemies
 */
for(var i = 0; i < 6; i++){
	/**
	 * j variable keeps check at the enemy's Y axis position 
	 * so as to generate enemy in the grey area only 
	 */ 
	let j = (i > 2) ? (i - 3) : i;
	const enemy = new Enemy(randomX(0,-4)*100, enemyStartY + (j*83), 'images/enemy-bug.png');
	allEnemies.push(enemy);
}
// Set the start position for player.
const playerStartX= 209;
const playerStartY= 432;

//Now instantiate your player object with a default player.
const player = new Player(playerStartX,playerStartY,'images/char-boy.png');

/**
 * Now write your own gem class
 * This class requires checkCollisions() method.
 * @param:
 *      x (data type: number): image x-offset start position
 *      y (data type: number): image y-offset start position
 *      imgLoc (data type: string): image path
 * @returns:
 *      None
 */
class Gem extends Entity{
	constructor(x,y,image){
		// Inherit the parent properties
		super(x,y,image);
	}

	/**
	 * Handles collision with the Player
	 * @param:
	 *      dt (data type: number): a time delta between ticks
	 * @returns:
	 *      true/false (data type: boolean) : true if collision happens
	 */
	checkCollisions(){
		if ((this.x == player.x) && (player.y == this.y)){
			let points = 0;
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
			game.updateScore(points);
			return true;
		}
	};

};


/**
 * Set the start position for Collectible and hence initialize
 * the allCollectibles array.
 */
let allCollectibles = [];
const gemStartX= 9;
const gemStartY= 100;
// re-arrange the collectibles on page refresh
const collectibles = shuffle([
	'images/Gem Blue.png'
	,'images/Gem Green.png'
	,'images/Gem Orange.png'
	,'images/Star.png'
	,'images/Key.png'
	,'images/Rock.png'
	,'images/Heart.png'
	]);
/**
 * Now instantiate your gem objects.
 * Place all gem objects in an array called allCollectibles
 */
for(let i = 0; i < collectibles.length; i++){
	/**
	 * z,j variables keeps check at the collectible's position 
	 * so as to generate colletibles in the grey area only 
	 */ 
	let j = (i > 2) ? ((i - 3) > 2 ? (i - 6) : (i - 3)) : i;
	let z = (i > 4) ? (i - 5) : i;
	const gem = new Gem(gemStartX + z*100 , gemStartY + (j*83), collectibles[i]);
	allCollectibles.push(gem);
}

/**
 * Save the collectibles into master gems array
 * which will be used for resetting the canvas.
 * We are using slice to copy the array element
 * the assignment won't work as both variable will
 * reference the same array
 */
gems = allCollectibles.slice(0);

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', event =>{
	const allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};
	if(modal.style.display !== 'block'){
	/**
	 * Allow the player movement on mentioned keys
	 * except when modal popup is open
	 */
		player.handleInput(allowedKeys[event.keyCode]);
	}
});

/**
 * Views
 */
function View(){
	this.playersListView =
						// This view shows all availables players
						{
							init: function(){
								this.playersList = playersDiv;
								this.render();
							},

							render: function(){
								this.playersList.textContent='';
								let players = game.getAllPlayers();
								let fragment = document.createDocumentFragment();
								for(let i=0 ; i<players.length ; i++)
								{
									let elem    = document.createElement('li');
									let image = document.createElement('img');
									image.src = players[i];
									elem.appendChild(image);
									fragment.appendChild(elem);
								}
								this.playersList.appendChild(fragment);//reflow and repaint here -- once!
							}
						};
	this.gameScoreView =
						// This view keeps track of score counter and timer update
						{
							init: function(){
								this.score = score;
								this.gameTime = gameTime;
								this.restartBtn = restartBtn;
								this.playBtn = playBtn;
								this.render();
							},

							render: function(){
								this.score.textContent = game.getScore();
								this.gameTime.textContent = game.getTimer();
								// When the user clicks on replay, reset the canvas and score.
								this.restartBtn.addEventListener('click',utils.restartGame,false);
								// When the user clicks on replay, reset the canvas,score and start the game
								this.playBtn.addEventListener('click',utils.startGame,false);
							}
						};
	this.modalPopupView =
						/**
						 * This modal view display an appropriate message
						 * based on event occured.
						 */
						{
							init: function(){
								this.modal = modal;
								this.modalSpan = modalSpan;
								this.replayBtn = modalReplayBtn;

								// [Start] Code for A11y
								// Find all focusable children
								this.focusableElementsString = 'span, button';
								this.focusableElements = this.modal.querySelectorAll(this.focusableElementsString);
								// Convert NodeList to Array
								this.focusableElements = Array.prototype.slice.call(this.focusableElements);

								this.firstTabStop = this.focusableElements[0];
								this.lastTabStop = this.focusableElements[this.focusableElements.length - 1];

								// [End] Code for A11y

								this.render();
							},

							render: function(){
								this.modal.style.display = 'block';
								  // Focus last child
								this.lastTabStop.focus();
								// When the user clicks on replay, reset the canvas
								this.replayBtn.addEventListener('click',
									() => {
									modal.style.display = 'none';
									utils.restartGame();
								},false);

								// When the user clicks on <span> (x), close the modal
								this.modalSpan.addEventListener('click',
									() => modal.style.display = 'none'
								,false);

								// When the user clicks anywhere outside of the modal, close it
								window.addEventListener('click', event => {
									if (event.target == modal) {
										modal.style.display = 'none';
									}
								},false);

  								// [Start] Code for A11y
  								// Listen for and trap the tab key
								this.modal.addEventListener('keydown',  e => {
								    // Check for TAB key press
								    if (e.keyCode === 9) {
										// SHIFT + TAB
										if (e.shiftKey) {
											if (document.activeElement === this.firstTabStop) {
											  	e.preventDefault();
											  	this.lastTabStop.focus();
											}

											// TAB
											} else {
											if (document.activeElement === this.lastTabStop) {
											  	e.preventDefault();
											  	this.firstTabStop.focus();
											}
										}
								    }

								    // ESCAPE
								    if (e.keyCode === 27) {
								      	modal.style.display = 'none';
								    }
								},false);
								// [End] Code for A11y
							}
						};
}

const view = new View();

class Game{
 	constructor(){
		/**
		 * Model
		 * Static list that holds all of the timer, player, players and collectibles
		 */
		this.model = {
			scoreCounter: 0,
			timer: 15,
			players : [
				'images/char-cat-girl.png',
				'images/char-princess-girl.png',
				'images/char-horn-girl.png',
				'images/char-pink-girl.png',
				'images/char-boy.png'
				]
		}
 	}

	/**
	 * Controller Methods
	 */

	// Get All the players
	getAllPlayers(){
		return this.model.players;
	}

	// Get the timer value
	getTimer(){
		return this.model.timer;
	}

	// Get the user's score
	getScore(){
		return this.model.scoreCounter;
	}

	// Update user's scores
	updateScore(points){
		this.model.scoreCounter += points;
		view.gameScoreView.render();
	}

	// Update timer
	updateTimer(){
		this.model.timer -= 1;
		if (this.model.timer === 0){
			utils.launchModal('timeup');
		}
		view.gameScoreView.render();
	}

	// Reset timer and score
	resetTimerScore(){
		this.model.timer = 15;
		this.model.scoreCounter = 0;
		view.gameScoreView.render();
	}

	init(){
		view.playersListView.init();
		view.gameScoreView.init();
	}
}

const game = new Game();

//Object for general utility methods
class Utils{
	constructor(){

	}
	/**
	 * Reset the game by resetting the canvas and hence the
	 * requestAnimationFrame to run the game smoothly again
	 * @param:
	 *      None
	 * @returns:
	 *      None
	 */
	restartGame(){
		if(window.pause){
		/**
		 * check if the requestAnimationFrame is paused
		 * if so the reset and start it again also reser
		 * the player to start position, reser the timer
		 */
			window.pause = false;
			player.x = playerStartX
			player.y = playerStartY
			game.resetTimerScore();
			/**
			 * Get all the collectibles from the master gems array
			 * We are using slice to copy the array element
			 * the assignment won't work as both variable will
			 * reference the same array
			 */
			allCollectibles = gems.slice(0);
			main();
		}
	}

	/**
	 * Start the timer and hence the game
	 * @param:
	 *      None
	 * @returns:
	 *      None
	 */
	startGame() {
		if(window.pause){
		/**
		 * check if the requestAnimationFrame is paused
		 * if so call restartGame() to reset the game.
		 */
			this.restartGame();
		}
		game.resetTimerScore();
		if(!t){
		// It won't run if the game is already on.
			t = window.setInterval( () => game.updateTimer() , 1000);
		}
	}

	/**
	 * Launch the customised modal popup view based on the event
	 * which triggered it.
	 * @param:
	 *      None
	 * @returns:
	 *      None
	 */
	launchModal(eventName){
		window.pause = true;
		// pause the requestAnimationFrame loop hence the game

		window.clearInterval(t);
		// Clear the timer event

		t = 0;
		// Reset the timer variable
		switch(eventName){
			case 'win' :
				// This gets triggered when player wins
				modalBadgeDiv.firstElementChild.className = 'fa fa-trophy';
				modalDialogueDiv.firstElementChild.textContent = 'Congradulations!! You Won!';
				break;
			case 'collision' :
				// This gets triggered when player collides with enemy
				modalBadgeDiv.firstElementChild.className = 'fa fa-bug';
				modalDialogueDiv.firstElementChild.textContent = 'Oh no!! You have been bitten by bug!';
				break;
			case 'timeup' :
				// This gets triggered when the game's time's up.
				modalBadgeDiv.firstElementChild.className = 'fa fa-thumbs-down';
				modalDialogueDiv.firstElementChild.textContent = "Hey Buddy!! Your time's up!";
				break;
		};
		view.modalPopupView.init();
	}
}

const utils = new Utils();

//Load the game page views once DOM is loaded
window.addEventListener('DOMContentLoaded',game.init(),false);

/**
 * Event listener for replacing the default player with
 * our selected player
 */
playersDiv.addEventListener('click',
	event => player.sprite = event.target.getAttribute('src')
,false);
