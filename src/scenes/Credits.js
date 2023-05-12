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

        this.add.text(centerX, 100, "CREDITS", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 150, 'programmed by: Beatrice Yu', creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 200, "art by: Beatrice Yu", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 250, "music:", creditsConfig).setOrigin(0.5); 
        this.add.text(centerX, 300, 'sounds:', creditsConfig).setOrigin(0.5); 

        this.add.text(centerX, 500, 'press space to return to main menu', creditsConfig).setOrigin(0.5); 

        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('titleScene');
        }
    }
}