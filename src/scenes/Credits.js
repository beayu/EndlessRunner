class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene');
    }

    create() {

         // title text configuration 
         let creditsConfig = {
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

        this.add.text(centerX, centerY, "CREDITS", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 400, 'programmed by: Beatrice Yu', creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 450, "art by: Beatrice Yu", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 500, "music:", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 550, 'sounds:', creditsConfig).setOrigin(0.5); 

        this.add.text(centerX, 600, 'pess space to go back', creditsConfig).setOrigin(0.5); 

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('titleScene');
        }
    }
}