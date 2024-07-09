class Chicken extends MovableObject{
    height = 60;
    width = 80;
    y = 360;
    energy = 5;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    constructor(id){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); 
        this.id = id;
        this.x = 500 + Math.random() * 500; //Zahl zwischen 200 und 700
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