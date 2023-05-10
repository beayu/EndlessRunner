class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {


        // keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        // keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
        // keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        // keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
            this.scene.start('playscene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            this.scene.start('creditsScene');
        }
    }
}