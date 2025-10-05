import Snake from "./Snake.js";
import Box from "./Box.js";
import { BOX_ROW_COUNT, BOX_COL_COUNT, GAME_SPEED } from "./constant.js";

export default class Game {
  constructor(game) {
    this.game = game
    this.snake = new Snake(this.game);
    this.id = null;
    this.gamePlaying = false;
    this.gamePause = false;
    this.food = { x: null, y: null };
    this.score = 0;
  }
  /**
   * 初始化游戏地图
   */
  initGameMap() {
    // 先清空游戏容器
    this.game.innerHTML = '';
    // 然后重新添加格子元素
    for (let i = 0; i < BOX_ROW_COUNT; i++) {
      for (let j = 0; j < BOX_COL_COUNT; j++) {
        const box = new Box('#f1f0f0ff');
        this.game.appendChild(box.render());
      }
    }
  }
  /**
   * 初始化蛇
   */
  initSnake() {
    this.snake.renderSnake();
  }
  //监听键盘事件，改变蛇的方向
  listenKey() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        if (this.snake.direction === 'left') {
          return
        }
        this.snake.changDirection('right');
      } else if (e.key === 'ArrowLeft') {
        if (this.snake.direction === 'right') {
          return
        }
        this.snake.changDirection('left')
      } else if (e.key === 'ArrowUp') {
        if (this.snake.direction === 'down') {
          return
        }
        this.snake.changDirection('up')
      } else if (e.key === 'ArrowDown') {
        if (this.snake.direction === 'up') {
          return
        }
        this.snake.changDirection('down')
      }
    })
  }
  init() {
    this.initGameMap();
    this.initSnake();
    this.listenKey();
    this.genetateFood();
  }
  /**
   * 判断是否失败
   */
  isFailed() {
    const head = this.snake.body[0];
    if (head.x >= BOX_ROW_COUNT || head.x < 0 || head.y >= BOX_COL_COUNT || head.y < 0) { //出界
      this.gamePlaying = false;
      clearInterval(this.id);
      this.restartGame();
    }
    // 使用body.length来正确获取蛇的当前长度
    for (let i = 1; i < this.snake.body.length; i++) {
      if (head.x === this.snake.body[i].x && head.y === this.snake.body[i].y) {
        this.gamePlaying = false;
        clearInterval(this.id);
        this.restartGame();
        break; // 添加break以避免多次调用restartGame
      }
    }
  }
  /**
   * 开始游戏
   */
  startGame() {
    // 先清除之前可能存在的定时器，避免多个定时器同时运行
    clearInterval(this.id);
    
    this.gamePlaying = true;
    this.gamePause = false;
    
    // 使用常量中的游戏速度
    this.id = setInterval(() => {
      if (this.gamePlaying && !this.gamePause) {
        this.isFailed();
        if (this.gamePlaying) {
          this.snake.updateSnake(this.isEatFood());
          this.genetateFood();
        }
      } else {
        clearInterval(this.id);
      }
    }, GAME_SPEED);
  }
  pauseGame() {
    this.gamePlaying = false;
    this.gamePause = true;
  }
  addScore() {
    document.querySelector('.game-score span').textContent = this.score;
  }
  restartGame() {
    // 重置蛇的状态
    this.snake.body = [{ x: 10, y: 6 }, { x: 10, y: 5 }, { x: 10, y: 4 }];
    this.snake.direction = 'right';
    this.gamePlaying = false;
    this.gamePause = false;
    this.food.x = null;
    this.food.y = null;
    this.score = 0;
    this.addScore();
    this.init()
  }
  genetateFood() {
    if (this.food.x !== null) {
      return
    } else {
      do {
        this.food.x = Math.floor(Math.random() * BOX_ROW_COUNT);
        this.food.y = Math.floor(Math.random() * BOX_COL_COUNT);
      } while (this.snake.body.some(box => box.x === this.food.x && box.y === this.food.y))
      this.game.children[this.food.x * BOX_COL_COUNT + this.food.y].style.backgroundColor = 'red';
    }
  }

  clearFood() {
    if (this.food.x !== null && this.food.y !== null) {
      const foodIndex = this.food.x * BOX_COL_COUNT + this.food.y;
      if (foodIndex >= 0) {
        this.game.children[foodIndex].style.backgroundColor = '#f1f0f0ff';
      }
    }
  }

  // 检查是否吃到食物
  isEatFood() {
    const head = this.snake.body[0];
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.addScore();
      this.clearFood();
      this.food.x = null;
      this.food.y = null;
      return true;
    }
    return false;
  }
}