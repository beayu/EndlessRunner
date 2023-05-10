class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        this.ground = this.add.tileSprite(0, 640, 960, 150, 'ground').setOrigin(0, 1);

        // set up player penguin (physics sprite) and set properties
        penguin = this.physics.add.sprite(50, centerY, 'penguins', 'penguin-run1').setOrigin(0.5).setScale(2);
        penguin.setCollideWorldBounds(true);
        // penguin.setBounce(0.5);
        penguin.setImmovable();
        penguin.setMaxVelocity(600, 600);
        penguin.setDragY(200);
        // penguin.setDepth(1);             // ensures that penguin z-depth remains above shadow penguins
        penguin.destroyed = false;       // custom property to track penguin life
        // penguin.setBlendMode('SCREEN');  // set a WebGL blend mode
        penguin.scrollFactorX = 1; 
        penguin.setPushable(false); 
        penguin.setGravityX(5); 
        penguin.setAcceleration(600); 

        penguin.setDebug(true, true); 

        // set up barrier group
        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // set up barrier group
        this.groundGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        // keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        // keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        // keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
        // keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
        // keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); 
    }

    update() {

        this.ground.tilePositionX -= 1; 
        
        // make sure penguin is still alive
        if(!penguin.destroyed) {
            // check for player input
            if (Phaser.Input.Keyboard.JustDown(keySpace)) {
                penguin.body.velocity.y -= penguinVelocity;
            }
            // check for collisions
            this.physics.world.collide(penguin, this.obstacleGroup, this.penguinCollision, null, this);
        }
        
    }
}