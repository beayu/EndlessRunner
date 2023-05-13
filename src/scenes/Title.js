class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {

         // title text configuration 
         let titleConfig = {
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

        this.add.text(centerX, 250, 'PENGUINS', titleConfig).setOrigin(0.5);
        this.add.text(centerX, 300, 'press space to play', titleConfig).setOrigin(0.5); 
        this.add.text(centerX, 350, "use up arrow or space to jump", titleConfig).setOrigin(0.5);
        this.add.text(centerX, 400, "use down arrow to duck", titleConfig).setOrigin(0.5);
        this.add.text(centerX, 500, "press down arrow for credits", titleConfig).setOrigin(0.5); 
        
        // this.penguin = this.add.sprite(centerX, 150, 'penguin').setOrigin(0.5); 
        this.penguin = this.add.sprite(centerX, 150, 'penguins', 'penguin-idle1').setScale(); 
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