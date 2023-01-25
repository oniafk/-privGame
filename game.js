const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

let playerPosition = {
    X: undefined,
    Y: undefined,
}

let giftPosition = {
    X: undefined,
    Y: undefined,
}


let bombPositions = [];

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

    let map = maps [level];

    if(!map){
        console.log( 'go study, stop wasting time dude >:( ')
        return;
    }

    showLives();

    console.log(lives);
    let mapRows = map.trim().split('\n');
    let mapRowToCol = mapRows.map(row => row.trim().split(''));

    bombPositions = [];

    game.clearRect(0,0,canvasSize,canvasSize);

    mapRowToCol.forEach( (row, rowIndex) => {
        row.forEach( (col, colIndex) => {

            let posX = elementSize * (colIndex + 1);
            let posY = elementSize * (rowIndex + 1);        
            let emoji = emojis [col];

            let bombPosition = {
                x: undefined,
                y: undefined,
            }
          
            if (col == 'O') {
                if(!playerPosition.X && !playerPosition.Y){
                    playerPosition.X = posX;
                    playerPosition.Y = posY;
                   
                };
            } else if (col == 'I') {
                giftPosition.X = posX;
                giftPosition.Y = posY;
            } else if (col == 'X') {
                bombPosition.x = posX;
                bombPosition.y = posY;

                bombPositions.push(bombPosition);
            
            }            
           
            game.fillText(emoji, posX, posY);

        });
        
    });      
   
   movePLayer()    
};

//moving

function movePLayer () {

    collisionGift();
    game.fillText(emojis ['PLAYER'], playerPosition.X, playerPosition.Y);
    bombCollision();
    
};


function checkKey (event) {
    event = event || window.event;
    if(event.keyCode == '38') moveUp();
    else if(event.keyCode == '40') moveDown();
    else if(event.keyCode == '37') moveLeft();
    else if(event.keyCode == '39') moveRight();
};

function moveUp() {
   

    if ((playerPosition.Y - elementSize) < elementSize) {
        console.log('OUT')
    } else {
        console.log('up', playerPosition)
        playerPosition.Y -= elementSize;
        startGame()
    };

       
};

function moveLeft() {
    
    if ((playerPosition.X - elementSize) < elementSize) {
        console.log('OUT')
    } else {
        console.log('left', playerPosition)
        playerPosition.X -= elementSize;
        startGame()
    };   
    
   
};

function moveRight() {
    
    if ((playerPosition.X + elementSize) > canvasSize) {
        console.log('OUT')
    } else {
        console.log('right', playerPosition)
    playerPosition.X += elementSize;
    startGame()
    };  
      
};

function moveDown() {

    
    if ((playerPosition.Y + elementSize) > canvasSize) {
        console.log('OUT')
    } else {
        console.log('down', playerPosition)
        playerPosition.Y += elementSize;
        startGame()
    }; 
    
    
};

// collisions 

function collisionGift () {

    let collisionX = playerPosition.X.toFixed(3) == giftPosition.X.toFixed(3);
    let collisionY = playerPosition.Y.toFixed(3) == giftPosition.Y.toFixed(3);
    let collisionPG = collisionX && collisionY;

    if (collisionPG) {
        levelUp();       
    };
}

function bombCollision() {

    let bombColl = bombPositions.find( bomb => {
        let collisionX = playerPosition.X == bomb.x;
        let collisionY = playerPosition.Y == bomb.y;
        return collisionX && collisionY;
    })

    if (bombColl) {
        console.log('booommmmmmmmmmmmmmmmmmm');
        game.fillText(emojis ['BOMB_COLLISION'], playerPosition.X, playerPosition.Y)
        playerPosition.X = undefined;
        playerPosition.Y = undefined;       
        levelLose(); 
        if(lives == 0){
            console.log('loooooseeeer')
            playerPosition.X = undefined;
            playerPosition.Y = undefined;
            lives = 3;
            level = 0;
            startGame();
        } 
    }    
};

//change level

function levelUp () {
    level++;
    startGame();
}

function levelLose () {
    lives--;    
}

//interface

function showLives () {
    const hearsArray = Array(lives).fill(emojis['HEART']);

    spanLives.innerHTML = "";
    hearsArray.forEach(heart => spanLives.append(heart));
}