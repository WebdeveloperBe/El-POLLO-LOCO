class EndbossBar extends StatusBar{
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 475;
        this.y = 6;
        this.width = 200;
        this.height = 60;
        this.setPercentage(50);
      }

    resolveImageIndex() {
        if (this.percentage >= 50) {
          return 5;
        } else if (this.percentage >= 40) {
          return 4;
        } else if (this.percentage >= 30) {
          return 3;
        } else if (this.percentage >= 20) {
          return 2;
        } else if (this.percentage > 10) {
          return 1;
        } else {
          return 0;
        }
    }
}