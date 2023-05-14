/* 
Beatrice Yu 
the endless waddle
approximate time to completion: 18
creative tilt justification: 
    technically - I'm proud that I was able to get my penguin to duck with an adjusted collision box so that you would have to duck to avoid flying
        snowballs. 
    visually - It was my first time doing pixel art with animations and I'm happy with how my penguin sprites look in my game. My other assets could 
        use improvement and I'd like to make them nicer. 
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