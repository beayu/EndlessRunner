class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

         // title text configuration 
         let titleConfig = {
            fontFamily: 'Baskerville', 
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

        this.add.text(centerX, centerY, 'penguins', titleConfig).setOrigin(0.5);
        this.add.text(centerX, 400, 'press space to play', titleConfig).setOrigin(0.5); 
        this.add.text(centerX, 450, "use up arrow to jump", titleConfig).setOrigin(0.5);
        this.add.text(centerX, 600, "press down arrow for credits", titleConfig).setOrigin(0.5); 
        
        this.penguin = this.add.sprite(centerX, 200, 'penguins', 'penguin-idle1').setScale(2); 

        // animate penguin
        this.anims.create({
            key: 'idle', 
            frames: this.anims.generateFrameNames('penguins', {
                prefix: 'penguin-idle', 
                start: 1, 
                end: 2, 
                suffix: '',
                zeroPad: 1, 
            }),
            frameRate: 3, 
            repeat: -1
        });

        this.penguin.anims.play("idle"); 

        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update() {
        // start next scene

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyDown)) {
            this.scene.start('creditsScene');
        }

    }
}