# Classic Arcade Game Project
This game has a lot of objects and those objects do a lot of different things; but sometimes they do some very similar things as well. This creates a great opportunity to practice object-oriented programming, an important programming paradigm that influences your application architecture and provides performance optimization.
You will discover a variety of ways inheritance and delegation can be used to create well architected and performant applications.

**Project Overview**
You will be provided visual assets and a game loop engine; using these tools you must add a number of entities to the game including the player characters and enemies to recreate the classic arcade game Frogger.
Check the starter code in the parent repo _https://github.com/udacity/frontend-nanodegree-arcade-game_

## Table of Contents

* [How The Game Works](#how-the-game-works)
* [Working GitHub page](#working-github-page)
* [Learn About Folder Structure](#learn-about-folder-structure)
* [Prerequisites](#prerequisites)
* [How to launch the app locally](#how-to-launch-the-app-locally)
* [Authors](#authors)
* [Acknowledgments](#acknowledgments)

## How The Game Works
Your implementation must at minimum follow the basic functionality, but you can add additional optional functionality to your game, if you wish.

**Basic Functionality**

In this game you have a Player and Enemies (Bugs). The goal of the player is to reach the water, without colliding into any one of the enemies. The player can move left, right, up and down. The enemies move in varying speeds on the paved block portion of the scene. Once a the player collides with an enemy, the game is reset and the player moves back to the start square. Once the player reaches the water the game is won.

**Additional Functionality**

In addition to the basic functionality, you can add more cool functionality to your game. For example, here are some additional features that you can add:

_Player selection_: allow the user to select the image for the player character before starting the game. You can use the different character images provided in the images folder (we’ll get to that below).
_Collectibles_: you can add gems to the game, allowing the player to collect them to make the game more interesting.
_Score_: you can implement a score for the game. For example, I am adding/substracting points from the score based on the collectibles collectable by the user. check below snippet for my implementation.
```
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
```

**Each turn**:
- The timer starts as soon as the player makes a move on the canvas. You can reset and start the timer by clicking on the play icon on the page also.
- The base position of objects on canvas are x=9,y=17.
- Player moves 100 unit in single move to the left and right
  so valid points in x axis are 9, 109, 209, 309, 409
- Player moves 83 unit in single move to the up and Down
  so valid points in y axis are 17, 100, 183, 266, 349, 432

_Game Displays below stats and views_
- **Player List**: Select the desired player from the players panel.
- **Score**: The game displays the score earned by grabbing the collectibles.
- **Timer**: Displays the time alloted for the game in seconds.
- **Reset Icon**: User can reset the game page.
- **Play Icon**: User can reset and start the game.
- **Congratulations Popup**: When the player wins the game, a modal popup appears to congratulate the player and ask if they want to play again.
- **Time's Popup**: When time's up, the game freezes and a modal popup appears to with sorry message.
- **Collision Popup**: When the player collides with the enemies(bug), the game freezes and a modal popup appears with a message and ask if they want to play again.

## Working GitHub page
https://gauravsinghaec.github.io/FEND-arcade-game/

## Learn About Folder Structure
```
Note : The folder structure may changes i.e we may include/exclude some folders/files
as project progresses but the overall sructure will remain as presented below:
```
* index.html 	-- Project main file
* css
  - style.css   -- CSS for the project
* images		-- Images for the project
* scss
  - style.scss 	-- CSS preprocessor
* js
  - app.js   	-- CSS for the project
* gulpfile.js  	-- This is a task runner to launch app and monitor for file(html,scss,css,js) changes.
* package.json -- Project dev dependencies (for Grunt and Gulp)

[What is gulp?](https://gulpjs.com/)


## Prerequisites
* HTML5, CSS3, Object Oriented JavaScript, DOM

## How to launch the app locally?
* Step1 -- Fork the project repo and clone it in your local directory
* Step2 -- Open the index.html in your browser and start playing the game.

### Installation (for running using gulp and browsersync)
* Step1 -- Install the node and npm

* Step2 -- Install the npm modules from the package.json
```
>>> npm install
this command installs all the node related packages required to run the app locally in
/node_modules folder. You can see this folder inside /FEND_portfolio folder after running npm install
```

* Step3 -- Launch the application using below command:
```
Below command will run gulpfile.js and start the static project locally
>>> npm install -g gulp
>>> gulp
The application will be running at http://localhost:3000 URL
```


## Authors
* **Gaurav Singh**

## Acknowledgments
* **Special thanks to Udacity Team**

