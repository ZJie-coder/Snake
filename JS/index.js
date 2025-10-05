import Game from "./Game.js";
const game = document.querySelector('.game');
const pause = document.querySelector('.pause');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');

const myGame = new Game(game);
myGame.init()
start.addEventListener('click',()=>{
  myGame.startGame()
})
pause.addEventListener('click',()=>{
  myGame.pauseGame()
})
restart.addEventListener('click',()=>{
  myGame.restartGame()
})