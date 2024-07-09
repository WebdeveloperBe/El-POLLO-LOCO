class SmallChicken extends MovableObject{
    height = 40;
    width = 60;
    y = 380;
    energy = 5;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
  
    constructor(id){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);//NEU
        this.id = id;
        this.x = 300 + Math.random() * 500; 
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    // animate(){
    //     setInterval(() => {
    //         this.moveLeft();
    //     }, 1000 / 60);
    //     setInterval(() => {
    //         this.playAnimation(this.IMAGES_WALKING);
    //     }, 200);
    // }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
          this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 10);
    }    
}