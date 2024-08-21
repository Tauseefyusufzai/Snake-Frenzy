const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-Score");
const controler = document.querySelectorAll(".controler i");
const alertBox = document.querySelector(".alert");


const newGamebtn = document.querySelector(".new-game");
const gameModeBtn =document.querySelector(".game-mode-btn");


const gameModeMenue = document.querySelector("#game-mode");


const hardModeBtn = document.querySelector(".hard-mode");
const mediumModeBtn = document.querySelector(".medium-mode");
const easyModeBtn = document.querySelector(".easy-mode");


const welcomeNote = document.querySelector(".welcome-note");
const startBtn = document.querySelector(".start-play");


let audio = document.getElementById("click-audio");
audio.playbackRate = 1.5;

let gameOverAudio = document.getElementById("game-over-audio");
let gameStartAudio = document.getElementById("game-start-audio");
gameStartAudio.volume = 0.2
let eatingAudio = document.getElementById("eating-audio");


let gameOver  = false;

let foodX;
let foodY;

let snakeX = 10;
let snakeY = 13;
let snakeBody = [];

let velocityX = 0;
let velocityY = 0;

let setIntervalId;

let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScore = parseInt(highScore, 10); // Convert highScore to a number
highScoreElement.innerText = `High Score: ${highScore}`;


const changeFoodPosition = () =>{
    foodX = Math.floor(Math.random()* 30) + 1;
    foodY = Math.floor(Math.random()* 30) + 1;
}

const changeDirection = (e)=>{
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}


const handleGameOver = () => {
    gameOverAudio.play();
    alertBox.style.display = "flex";
    clearInterval(setIntervalId);
    document.querySelector("#score-display").innerText =`Your Score: ${score}`;
    document.querySelector("#high-score-display").innerText =`High Score: ${highScore}`;
    newGamebtn.addEventListener("click", () =>{
        audio.play();
        alertBox.style.display ="none"
        resetGame();
    })
}

const resetGame = () => {
    gameOver = false;
    snakeX = 10;
    snakeY = 13;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    changeFoodPosition();
    clearInterval(setIntervalId);
    setIntervalId = setInterval(initGame, 125);
}

controler.forEach(key =>{
    key.addEventListener("click", ()=> changeDirection({ key: key.dataset.key }));
});

const initGame = () => {
    if(gameOver) return handleGameOver();
     let htmlMarkup = `<div class ="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    if(snakeX === foodX && snakeY === foodY){
        eatingAudio.play();
        changeFoodPosition();
        snakeBody.push([foodX , foodY]);
        score++

        highScore = score >= highScore ? score : highScore
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText =`Score: ${score}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

     snakeX += velocityX;
     snakeY += velocityY;

     if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;

     }

    for (let i = 0; i< snakeBody.length; i++) {
        htmlMarkup += `<div class ="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }

    //  htmlMarkup += `<div class ="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`
    playBoard.innerHTML = htmlMarkup;
}



changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);



gameModeBtn.addEventListener("click",() =>{
    gameModeMenue.style.display = "flex"
    audio.play();
});

hardModeBtn.addEventListener("click",setHardMode);
mediumModeBtn.addEventListener("click",setMediumMode);
easyModeBtn.addEventListener("click",setEasyMode);

function setHardMode(){
    audio.play();
    clearInterval(setIntervalId);
    setIntervalId = setInterval(initGame, 50);
    gameModeMenue.style.display = "none"
    gameModeBtn.innerText = "Serpent's Fury"
}

function setMediumMode(){
    audio.play();
    clearInterval(setIntervalId);
    setIntervalId = setInterval(initGame, 100);
    gameModeMenue.style.display = "none"
    gameModeBtn.innerText = "Balanced Bite"

}
function setEasyMode(){
    audio.play();
    clearInterval(setIntervalId);
    setIntervalId = setInterval(initGame, 125);
    gameModeMenue.style.display = "none"
    gameModeBtn.innerText = "Relaxed Reptile"
}


window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader-wrapper').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }, 2000); // Delay in milliseconds (3000ms = 3 seconds)
});


startBtn.addEventListener("click", () =>{
    audio.play();
    welcomeNote.style.display = "none";
    gameStartAudio.play();
})