class Bottle extends CollectableObjects {
    height = 60 ;
    width = 60;
    y = 350;

    constructor() { 
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        // this.x = 200 + Math.random() * 500 * 5; 
        this.x = 200 + this.randomNumber(200, 2000); 
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;  
    };

    animate() {
    }
} 