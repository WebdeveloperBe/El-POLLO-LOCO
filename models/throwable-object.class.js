class ThrowableObject extends MovableObject {
    isThrowBottle = true;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.speed = 10;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();    
        this.animate();
    }

    throw (){
        this.speedY = 30;
        this.applyGravity();
        setInterval(() =>{
            if(world.character.otherDirection && this.x < world.character.x){
                this.x -= this.speed;
            } 
            if (!world.character.otherDirection && this.x > world.character.x){ 
                this.x += this.speed;
            }
        } , 25);
    }

    animate(){
        setInterval(() => {
            if(this.isAboveGround() && this.y < 330 && this.isThrowBottle) {
                this.playAnimation(this.IMAGES_ROTATION);
            } else {
                this.explodeBottle();
            }
        }, 1);
    }

    explodeBottle(){
            this.speed = 0;
            this.speedY = 0;
            this.acceleration = 0;
            this.playAnimation(this.IMAGES_SPLASH);
    }
}