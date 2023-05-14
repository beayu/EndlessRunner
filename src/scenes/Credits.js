class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {

         // title text configuration 
         let creditsConfig = {
            fontFamily: 'Garamond', 
            fontSize: '36px', 
            // backgroundColor: '#facd9d', 
            color: '#e0ffff', 
            align: 'center', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0
        }

        this.add.text(centerX, 80, "CREDITS", creditsConfig).setOrigin(0.5); 

        creditsConfig.fontSize = 28; 
        this.add.text(centerX, 150, 'programmed by: Beatrice Yu', creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 200, "art by: Beatrice Yu", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 250, "music by: Tea K Pea", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 300, 'sounds from: sfxr.me', creditsConfig).setOrigin(0.5); 

        this.penguin = this.add.sprite(centerX, 400, 'penguins', 'penguin-idle1').setOrigin(0.5); 
        this.penguin.anims.play('idle');

        this.add.text(centerX, 500, 'press space to return to main menu', creditsConfig).setOrigin(0.5); 

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.sound.play('select'); 
            this.scene.start('titleScene');
        }
    }
}