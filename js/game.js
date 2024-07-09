let canvas;
let world;
let keyboard = new Keyboard();


function init(){
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);   
}

function startGame(){
    init();
    document.getElementById('start').classList.add('d-none');
    document.getElementById('mute').classList.remove('d-none');
}

function mute(){
    world.game_sound.pause();
    document.getElementById('mute').classList.add('d-none');
    document.getElementById('unmute').classList.remove('d-none');
}

function unmute(){
    world.game_sound.play();
    document.getElementById('unmute').classList.add('d-none');
    document.getElementById('mute').classList.remove('d-none');
}

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39){
        keyboard.RIGHT = true;    
    }

    if(event.keyCode == 37){
        keyboard.LEFT = true;
    }

    if(event.keyCode == 38){
        keyboard.UP = true;    
    }

    if(event.keyCode == 40){
        keyboard.DOWN = true;
    }

    if(event.keyCode == 32){
        keyboard.SPACE = true;
    }

    if(event.keyCode == 68){
        keyboard.D = true;
    }
});

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39){
        keyboard.RIGHT = false;    
    }

    if(event.keyCode == 37){
        keyboard.LEFT = false;
    }

    if(event.keyCode == 38){
        keyboard.UP = false;    
    }

    if(event.keyCode == 40){
        keyboard.DOWN = false;
    }

    if(event.keyCode == 32){
        keyboard.SPACE = false;
    }

    if(event.keyCode == 68){
        keyboard.D = false;
    }
});