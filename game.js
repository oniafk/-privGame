const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', startGame);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    startGame();
};

function startGame() {    
    
    game.font = elementSize + 'px verdana';
    game.textAlign = 'end';

    for (let i = 1; i <= 10 ; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize);        
    }
    
};

