class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    endbossBar = new EndbossBar(); 
    coinBar = new CoinBar();
    coin_sound = new Audio('audio/coin.mp3');
    bottleBar = new BottleBar();
    bottle_sound = new Audio('audio/bottle.mp3');
    throwing_sound = new Audio('audio/throw.mp3');
    endboss_sound = new Audio('audio/endboss.mp3');
    game_sound = new Audio('audio/gameMusic.mp3');
    chickenHurt_sound = new Audio('audio/chickenHurt.mp3');
    endbossHurt_sound = new Audio('audio/endbossHurt.mp3');
    throwableObjects = [];

    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.game_sound.loop = true;
        this.game_sound.play();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(() => {
            this.checkJumpChickenCollision();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectCoin(); 
            this.checkCollectBottle(); 
            this.checkBottleCollisionEnemy();
            this.checkBottleCollisionBoss();
            this.checkEndbossCollisionsCharacter();
            this.endbossSound();
        }, 100);
    }

    checkThrowObjects(){
        if(this.keyboard.D && this.bottleBar.amount > 0){
            if (this.bottleBar.amount != 0){
                this.throwing_sound.play();
                }
            let offsetBottle = this.character.otherDirection ? -100: 100;
            let bottle = new ThrowableObject(this.character.x + offsetBottle, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.bottleBar.amount--;
            this.bottleBar.setAmount();
            setTimeout(() => {
                let index = this.throwableObjects.findIndex(findBottle => findBottle === bottle);
                if (index !== -1) {
                    this.throwableObjects.splice(index, 1);
                }
            }, 1400)
        }
    }

    checkJumpChickenCollision(){
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.fallingDown()) {
                    enemy.hit();
                    this.chickenHurt_sound.play();
                    setTimeout(() => {
                        let index = this.level.enemies.findIndex(findEnemy => findEnemy.id === enemy.id);
                        if (index !== -1) {
                            this.level.enemies.splice(index, 1);
                        } 
                },1);    
            }                
        });
    }

    checkBottleCollisionEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    enemy.hit();
                    bottle.isThrowBottle = false;
                    setTimeout(() => {
                        let index = this.level.enemies.findIndex(findEnemy => findEnemy.id === enemy.id);
                        if (index !== -1) {
                            this.level.enemies.splice(index, 1);
                    }
                    bottle.isThrowBottle = true;
                    },1000);    
                }                
            });
        });
    }

    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && !enemy.isDead() && !this.character.isAboveGround()) {
                this.character.hit();
              
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }

    checkBottleCollisionBoss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (endboss.isColliding(bottle)) {
                    if(bottle.isThrowBottle){
                    endboss.hit();
                    this.endbossHurt_sound.play();
                    this.endbossBar.setPercentage(endboss.energy);
                    bottle.isThrowBottle = false;
                }
                setTimeout(() => {
                    bottle.isThrowBottle = true;
                },1000);
                }                
            });
        });
    }

   

    checkEndbossCollisionsCharacter() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !endboss.isDead()) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
                // this.character.moveLeftHurt();
                // this.character.jump();
            };
        });
    }


    checkCollectCoin() { 
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.amount++;
                this.coinBar.setAmount();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                this.coin_sound.play();
            }
        });
    }

    checkCollectBottle() { 
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleBar.amount++;
                this.bottleBar.setAmount();
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottle_sound.play();
            }
        });
    }

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); // Back
        // -------- Space for fixed objects -------------
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.healthBar); 
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar); 
        this.ctx.translate(this.camera_x, 0); // Forwards
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins); 
        this.addObjectsToMap(this.level.bottles); 
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        //Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();//hier funktioniert kein this direkt!
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o); 
        });
    }

    addToMap(mo){
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    endbossSound(){
        if (this.level.endboss[0].x - this.character.x < 400){
            this.game_sound.pause();
            this.endboss_sound.play();
        }
    }  
}