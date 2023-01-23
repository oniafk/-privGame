const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let playerPosition = {
    X: undefined,
    Y: undefined,
}

document.onkeydown = checkKey;
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

// map and canvas

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

    let map = maps [2];
    let mapRows = map.trim().split('\n');
    let mapRowToCol = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowToCol.forEach( (row, rowIndex) => {
        row.forEach( (col, colIndex) => {

            let posX = elementSize * (colIndex + 1);
            let posY = elementSize * (rowIndex + 1);        
            let emoji = emojis [col];

            if (col == 'O') {
                if(!playerPosition.X && !playerPosition.Y){
                    playerPosition.X = posX;
                    playerPosition.Y = posY;
                };
            };

            game.fillText(emoji, posX, posY);

        });
    });      
    
    movePLayer();
};

//moving

function movePLayer () {
    game.fillText(emojis ['PLAYER'], playerPosition.X, playerPosition.Y);
};

function cleanCanvas() {
    game.crearRect(playerPosition.X, playerPosition.Y)
}
 

function checkKey (event) {
    event = event || window.event;
    if(event.keyCode == '38') moveUp();
    else if(event.keyCode == '40') moveDown();
    else if(event.keyCode == '37') moveLeft();
    else if(event.keyCode == '39') moveRight();
};

function moveUp() {
    console.log('up')
    playerPosition.Y -= elementSize;
    startGame()

};

function moveLeft() {
    console.log('left')
    playerPosition.X -= elementSize;
    startGame()
};

function moveRight() {
    console.log('right')
    playerPosition.X += elementSize;
    startGame()

};

function moveDown() {
    console.log('down')
    playerPosition.Y += elementSize;
    startGame()

};