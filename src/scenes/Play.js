class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {

        this.JUMP_VELOCITY = -800;
        this.SCROLL_SPEED = 4;
        this.physics.world.gravity.y = 3000; //2600;
        this.obstacleSpeed = -450;
        this.obstacleSpeedMax = -700; //-1000;
        level = 0;

        this.bgm = this.sound.add('bgm', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        this.sky = this.add.tileSprite(0, 0, 960, 540, 'sky').setOrigin(0); 

        this.ground = this.physics.add.sprite(0, 540, 'ground').setOrigin(0, 1); 
        this.ground.body.immovable = true; 
        this.ground.body.allowGravity = false; 

        this.groundScroll = this.add.tileSprite(0, 540, 960, 150, 'ground').setOrigin(0, 1);

        // set up player penguin (physics sprite) and set properties
        this.penguin = this.physics.add.sprite(100, 365, 'penguins', 'penguin-run1').setOrigin(0.5);
        this.penguin.destroyed = false; 
        // this.penguin.setDebug(true, true); 
        // this.penguin.setDebugBodyColor(0xe0ffff); 

        this.physics.add.collider(this.penguin, this.ground); 

        // set up Obstacle group
        this.obstacleGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });
        // wait a few seconds before spawning Obstacles
        this.time.delayedCall(2500, () => { 
            this.addObstacle(); 
        });

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

         // score text configuration 
         let creditsConfig = {
            fontFamily: 'Garamond', 
            fontSize: '28px', 
            color: '#ffffff', 
            align: 'center', 
            padding: {
                top: 5, 
                bottom: 5, 
            },
            fixedWidth: 0
        }

        // score 
        this.score = this.add.text(50, 50, 'score: ' + level);

        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); 
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); 
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); 

    }

    // create new obstacles and add them to existing obstacle group
    addObstacle() {

        let obstacle = new Obstacle(this, this.obstacleSpeed);
        this.obstacleGroup.add(obstacle);

    }

    update() {

        // this.ground.tilePositionX -= 1; 
        this.sky.tilePositionX += 2;
        this.groundScroll.tilePositionX += this.SCROLL_SPEED;

        // make sure penguin is still alive
        if (!this.penguin.destroyed) {
            this.score.text = 'score: ' + level; 

            // penguin animations
            if (!this.penguin.body.touching.down && !sliding) {
                this.penguin.anims.play('jump', true);
                // console.log(this.penguin.getBottomCenter()); 
            }
            else if (this.penguin.body.touching.down && Phaser.Input.Keyboard.JustDown(keyDown)) {
                this.sound.play('slide', {volume: 0.5}); 
                sliding = true; 
                this.penguin.body.allowGravity = false; 
                this.penguin.setBodySize(50, 30); 
                this.penguin.body.setOffset(0, 19);
                this.penguin.anims.play('slide'); 
                this.penguin.on('animationcomplete', () => {
                    sliding = false; 
                    this.penguin.setBodySize(50, 50); 
                    this.penguin.body.allowGravity = true; 
                })
            }
            else if (!sliding) {
                this.penguin.anims.play('run', true); 
            }

            // jump
            if ((this.penguin.body.touching.down && !sliding) && (Phaser.Input.Keyboard.JustDown(keySpace) || (Phaser.Input.Keyboard.JustDown(keyUp)))) {
                this.sound.play('jump'); 
                this.penguin.body.setVelocityY(this.JUMP_VELOCITY);
            }
            // check for collisions
            this.physics.world.collide(this.penguin, this.obstacleGroup, this.penguinCollision, null, this);
        }
        
    }

    levelBump() {

        // increment level (ie, score)
        level++;

        // bump speed every 5 levels (until max is hit)
        if(level % 5 == 0) {
            // console.log(`level: ${level}, speed: ${this.obstacleSpeed}`);
            if(this.obstacleSpeed >= this.obstacleSpeedMax) {     // increase obstacle speed
                this.obstacleSpeed -= 10;
                // this.bgm.rate += 0.01;                          // increase bgm playback rate (ドキドキ)
            }
        }

    }

    penguinCollision() {

        this.penguin.destroyed = true;                    // turn off collision checking
        this.difficultyTimer.destroy();             // shut down timer
        this.sound.play('hit'); 
        // this.cameras.main.shake(2500, 0.0075);      // camera death shake
        
        // add tween to fade out audio
        this.tweens.add({
            targets: this.bgm,
            volume: 0,
            ease: 'Linear',
            duration: 2000,
        });

        // kill penguin
        this.penguin.destroy();    

        // switch states after timer expires
        this.time.delayedCall(2000, () => { this.scene.start('gameOverScene'); });

    }
}