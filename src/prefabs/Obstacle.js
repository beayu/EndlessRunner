// obstacle prefab
class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        let randomObstacle = ['rocks', 'snowpile', 'branch'];
        super(scene, game.config.width + obstacleWidth, Phaser.Math.Between(obstacleHeight/2, game.config.height - obstacleHeight/2), randomObstacle[Math.floor(Math.random() * randomObstacle.length)]); 
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable();                    
        // this.tint = Math.random() * 0xFFFFFF;   // randomize tint
        this.newBarrier = true;                 // custom property to control barrier spawning
    }

    update() {
        // add new barrier when existing barrier hits center X
        if(this.newBarrier && this.x < centerX) {
            // (recursively) call parent scene method from this context
            this.parentScene.addBarrier(this.parent, this.velocity);
            this.newBarrier = false;
        }

        // destroy paddle if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}

// from nathan