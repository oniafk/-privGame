const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
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

    let map = maps [1];
    let mapRows = map.trim().split('\n');
    let mapRowToCol = mapRows.map(row => row.trim().split(''));

    for (let  row = 1;  row <= 10 ; row ++) {       
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowToCol [row -1] [col -1]], elementSize * col, elementSize * row)
        }        
    }
    
};

