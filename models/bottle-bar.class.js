class BottleBar extends StatusBar{
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]; 
    amount = 0;

    constructor(){
        super();
        this.loadImages(this.IMAGES);
        this.x = 15;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
        this.setAmount();
    }

    resolveImageIndex() {
        if (this.amount >= 10) {
          return 5;
        } else if (this.amount >= 8) {
          return 4;
        } else if (this.amount >= 6) {
          return 3;
        } else if (this.amount >= 4) {
          return 2;
        } else if (this.amount >= 2) {
          return 1;
        } else {
          return 0;
        }
    }    
}