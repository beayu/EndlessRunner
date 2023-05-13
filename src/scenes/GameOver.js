class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {

        let gameoverConfig = {
            fontFamily: 'Garamond', 
            fontSize: '28px', 
            // backgroundColor: '#facd9d', 
            color: '#e0ffff', 
            align: 'center', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0
        }

        // check for high score in local storage
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            // console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(level > storedScore) {
                // console.log(`New high score: ${level}`); 
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
                this.add.text(centerX, 150, 'new high score!', gameoverConfig).setOrigin(0.5);
                this.add.text(centerX, 200, highScore, gameoverConfig).setOrigin(0.5);
            } else {
                // console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
                this.add.text(centerX, 200, 'high score: ' + highScore, gameoverConfig).setOrigin(0.5); 
                this.add.text(centerX, 150, 'score: ' + level, gameoverConfig).setOrigin(0.5);
            }
        } else {
            // console.log('No high score stored. Creating new.');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        this.add.text(centerX, 100, 'GAMEOVER', gameoverConfig).setOrigin(0.5);
        // this.add.text(centerX, 300, highScore, gameoverConfig).setOrigin(0.5); 
        // this.add.text(centerX, 350, storedScore, gameoverConfig).setOrigin(0.5); 
        this.add.text(centerX, 450, 'press space to play again', gameoverConfig).setOrigin(0.5);
        this.add.text(centerX, 500, 'press down arrow to view credits', gameoverConfig).setOrigin(0.5);

        this.penguin = this.add.sprite(centerX, 350, 'penguins', 'penguin-idle1').setOrigin(0.5); 
        this.penguin.anims.play('yay'); 

        // keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyDown)) {
            this.scene.start('creditsScene');
        }
    }
}