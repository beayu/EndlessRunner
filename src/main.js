/* 
Beatrice Yu 
the endless waddle
approximate time to completion: 22
creative tilt justification: 
    technically - I'm proud that I was able to get my penguin to slide with an adjusted collision box so that you would have to slide to avoid 
        flying snowballs and it took a bit of research to get the animation to play the way I wanted. Also, getting the collision box to change 
        without making the penguin fall off the platform was a bit tricky and I'm sure there is a better way to do it than how I did it. 
    visually - I'm proud of the visual assets I drew. It was my first time doing pixel art with animations and I'm happy with how my penguin sprites 
     look in my game. My other assets could use improvement and I'd like to make them nicer if I have the time. 
*/

let config = {
    type: Phaser.AUTO,
    height: 540,
    width: 960,
    // zoom: 2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Credits, Play, GameOver ]
}

// define game 
let game = new Phaser.Game(config); 

// reserve keyboard vars
let keyUp, keyDown, keySpace;

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let penguin = null;
let sliding = false; 
const obstacleWidth = 45;
const obstacleHeight = 45;
const penguinVelocity = 150;
let level;
let highScore;
let newHighScore = false;