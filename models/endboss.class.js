class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 55;
    energy = 50;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);//NEU
        this.loadImages(this.IMAGES_ATTACK);//NEU
        this.loadImages(this.IMAGES_HURT);//NEU
        this.loadImages(this.IMAGES_DEAD);//NEU
        this.speed = 0.7;
        this.x = 2500;
        this.animate();
    }


    // animate(){
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_ALERT);
    //     }, 200);
    // }

    animate() {
        setInterval(() => {
            if (!this.isDead() && !this.isHurt()) {
          this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            };
        }, 80);
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                document.getElementById('youWin').classList.remove('d-none');
                setTimeout(() => {
                this.clearAllIntervals();
                    window.location.reload();
                },2500);
            }
            else {
                // this.playAnimation(this.IMAGES_ALERT);
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);
    } 
}