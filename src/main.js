/* 
Beatrice Yu 
game title 
approximate time to completion: 3
creative tilt justification
*/

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
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
const textSpacer = 64;
let penguin = null;
const obstacleWidth = 32;
const obstacleHeight = 32;
const penguinVelocity = 150;
let level;
let highScore;
let newHighScore = false;
// let cursors;