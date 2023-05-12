class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        this.JUMP_VELOCITY = -700;
        this.MAX_JUMPS = 2;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 2600;
        this.obstacleSpeed = -450;

        // this.ground = this.add.tileSprite(0, 640, 960, 150, 'ground').setOrigin(0, 1);
        this.ground = this.physics.add.sprite(0, 640, 'ground').setOrigin(0, 1); 
        this.ground.body.immovable = true; 
        this.ground.body.allowGravity = false; 

        this.groundScroll = this.add.tileSprite(0, 640, 960, 150, 'ground').setOrigin(0, 1);

        // set up player penguin (physics sprite) and set properties
        this.penguin = this.physics.add.sprite(50, centerY, 'penguins', 'penguin-run1').setOrigin(0.5).setScale(2);
        this.penguin.setDebug(true, true); 

        this.physics.add.collider(this.penguin, this.ground); 

        // set up Obstacle group
        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning Obstacles
        this.time.delayedCall(2500, () => { 
            this.addObstacle(); 
        });

        // this.physics.add.collider(this.ground, this.obstacleGroup); 

        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 
    }

    // create new obstacles and add them to existing obstacle group
    addObstacle() {
        console.log('obstacle');
        let speedVariance =  Phaser.Math.Between(0, 50);
        let obstacle = new Obstacle(this, this.obstacleSpeed - speedVariance);
        this.obstacleGroup.add(obstacle);
    }

    update() {

        // this.ground.tilePositionX -= 1; 
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        // penguin animations
        if (!this.penguin.body.touching.down) {
            this.penguin.anims.play('jump', true);
        }
        else {
            this.penguin.anims.play('run', true); 
        }

        // jump
        if (this.penguin.body.touching.down && (Phaser.Input.Keyboard.JustDown(keySpace) || (Phaser.Input.Keyboard.JustDown(keyUp)))) {
            this.penguin.body.setVelocityY(this.JUMP_VELOCITY);
        }
        
    }
}