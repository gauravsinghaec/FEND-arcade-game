var Entity = function(x,y,imgLoc) {
	this.x = x;
    this.y = y;
    this.sprite = imgLoc;
}

Entity.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Enemies our player must avoid
var Enemy = function(x,y,image) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Entity.call(this,x,y,image);
    	
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,image) {
    Entity.call(this,x,y,image);    
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
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

// Draw the player on the screen, required method for game
// Player.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
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

var playerStartX= 201;
var playerStartY= 405;
var player = new Player(playerStartX,playerStartY,'images/char-boy.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
