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
                this.add.text(centerX, 150, 'score: ' + level, gameoverConfig).setOrigin(0.5);
                this.add.text(centerX, 200, 'high score: ' + highScore, gameoverConfig).setOrigin(0.5); 
            }
        } else {
            // console.log('No high score stored. Creating new.');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
            this.add.text(centerX, 150, 'new high score!', gameoverConfig).setOrigin(0.5);
            this.add.text(centerX, 200, highScore, gameoverConfig).setOrigin(0.5);
        }

        gameoverConfig.fontSize = 36;
        this.add.text(centerX, 80, 'GAMEOVER', gameoverConfig).setOrigin(0.5);

        gameoverConfig.fontSize = 28; 
        this.add.text(centerX, 450, 'press space to play again', gameoverConfig).setOrigin(0.5);
        this.add.text(centerX, 500, 'press down arrow to view credits', gameoverConfig).setOrigin(0.5);

        this.snowball1 = this.physics.add.sprite(380, 330, 'snowball').setOrigin(0.5); 
        this.snowball1.body.setAngularVelocity(100); 
        this.snowball1 = this.physics.add.sprite(centerX, 330, 'snowball').setOrigin(0.5); 
        this.snowball1.body.setAngularVelocity(100); 
        this.snowball1 = this.physics.add.sprite(580, 330, 'snowball').setOrigin(0.5); 
        this.snowball1.body.setAngularVelocity(100); 

        // keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.sound.play('select'); 
            this.scene.start('playScene'); 
        }
        if (Phaser.Input.Keyboard.JustDown(keyDown)) {
            this.sound.play('select'); 
            this.scene.start('creditsScene');
        }
    }
}