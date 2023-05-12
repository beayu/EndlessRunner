class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.path = './assets/';
        // load graphics assets
        this.load.image('ground', 'ground.png');
        this.load.atlas('penguins', 'spritesheet.png', 'sprites.json');
        this.load.image('penguin', 'penguin-idle1.png'); 

        // load audio assets


        // load font
        // this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

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
        this.anims.create({
            key: 'run', 
            frames: this.anims.generateFrameNames('penguins', {
                prefix: 'penguin-run', 
                start: 1, 
                end: 4, 
                suffix: '',
                zeroPad: 1, 
            }),
            frameRate: 8, 
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            defaultTextureKey: 'penguins',
            frames: [
                { frame: 'penguin-jump' }
            ],
        });

        // go to Title scene
        this.scene.start('titleScene');
    }
}