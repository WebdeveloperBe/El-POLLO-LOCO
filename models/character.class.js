class Character extends MovableObject{
    world;
    lastAnimationChangeTime = 0;
    height = 250;
    y = 80;
    speed = 10;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    
    walking_sound = new Audio('audio/walking.mp3');
    juming_sound = new Audio('audio/jump.mp3');
    hurting_sound = new Audio('audio/hurt.mp3');
    dying_sound = new Audio('audio/death.mp3');
    waiting_sound = new Audio('audio/wait.mp3');
    sleeping_sound = new Audio('audio/sleep.mp3');
    throwing_sound = new Audio('audio/throw.mp3');
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }

    animate(){
        this.lastAnimationChangeTime = new Date().getTime();
    
    setInterval(() => {
        this.walking_sound.pause();
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
            this.lastAnimationChangeTime = new Date().getTime();
        }

        if(this.world.keyboard.LEFT && this.x > 0){
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
            this.lastAnimationChangeTime = new Date().getTime();
        }

        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();  
            this.lastAnimationChangeTime = new Date().getTime();  
        }

        if (this.world.keyboard.D) {
            this.lastAnimationChangeTime = new Date().getTime();        
        }

        this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    this.interval = setInterval(() => {
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                this.dying_sound.play();
                document.getElementById('gameOver').classList.remove('d-none');
                setTimeout(() => {
                    this.clearAllIntervals();
                    window.location.reload();
                },2000);
               
            } else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);
                this.hurting_sound.play();
            } else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    if (new Date().getTime() - this.lastAnimationChangeTime > 9999 && new Date().getTime() - this.lastAnimationChangeTime < 15000) {
                      this.playAnimation(this.IMAGES_IDLE);
                      this.waiting_sound.play();
                    }
                    if (new Date().getTime() - this.lastAnimationChangeTime >= 15000) {
                        this.playAnimation(this.IMAGES_LONGIDLE);
                        this.sleeping_sound.play();
                    } 
                }
            }
        }, 200);
    }

    jump(){
        this.speedY = 30;
        this.juming_sound.play();
    }
}