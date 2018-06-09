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
    //this.y = this.y + this.y * dt;
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
    else if (this.y < playerStartY -5*83)
    {
    	this.y = playerStartY -5*83;
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
var bug2 = new Enemy(-401,enemyStartY+83,'images/enemy-bug.png');
var bug3 = new Enemy(201,enemyStartY+83,'images/enemy-bug.png');
var bug4 = new Enemy(-101,enemyStartY+2*83,'images/enemy-bug.png');

allEnemies.push(bug1);
allEnemies.push(bug2);
allEnemies.push(bug3);
allEnemies.push(bug4);

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
