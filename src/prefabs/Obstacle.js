// obstacle prefab
class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        let r = (Math.floor(Math.random() * 5));
        if (r == 0) {
            super(scene, game.config.width + obstacleWidth, 320, 'snowball'); 
        }
        else {
            super(scene, game.config.width + obstacleWidth, 369, 'snowball'); 
        }
        
        this.parentScene = scene;               // maintain scene context

        // set up physics sprite
        this.parentScene.add.existing(this);    // add to existing scene, displayList, updateList
        this.parentScene.physics.add.existing(this);    // add to physics system
        this.setVelocityX(velocity);            // make it go!
        this.body.immovable = true;                    
        this.body.allowGravity = false; 
        this.newObstacle = true;                 // custom property to control snowball spawning
        this.body.setAngularVelocity(-100); 
    }

    update() {
        // add new snowball when existing snowball hits center X
        if(this.newObstacle && this.x < (centerX / 2)) {
            // (recursively) call parent scene method from this context
            this.parentScene.addObstacle(this.parent, this.velocity);
            this.newObstacle = false;
        }

        // destroy snowball if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }
    }
}
