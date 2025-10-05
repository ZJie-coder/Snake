import { BOX_WIDTH_COUNT, SNAKE_HEAD_COLOR, SNAKE_BODY_COLOR, BOX_HEIGHT_COUNT } from './constant.js'
export default class Snake {
  constructor(game) {
    this.body = [{ x: 10, y: 6 }, { x: 10, y: 5 }, { x: 10, y: 4 }];
    this.game = game;
    this.direction = 'right';
  }

  //获取蛇身体坐标的映射对应box序数的数组
  getSnakePositions() {
    const renderSnake = this.body.map(box => {
      // 在正常游戏逻辑中，坐标应该始终有效
      // 添加基本检查以确保索引安全
      const index = box.x * BOX_WIDTH_COUNT + box.y;
      return Math.max(0, Math.min(index, this.game.children.length - 1));
    })
    return renderSnake
  }
  //渲染蛇的身体和头部
  renderSnake() {
    const renderSnake = this.getSnakePositions();
    renderSnake.forEach((item, index) => {
      this.game.children[item].style.backgroundColor = index === 0 ? SNAKE_HEAD_COLOR : SNAKE_BODY_COLOR;
    })
  }
  //改变蛇的方向
  changDirection(direction) {
    this.direction = direction;
  }
  //蛇的身体改变，根据方向改变位置，如果吃了食物，蛇的长度不需要pop，只需要unshift
  changBody(dx, dy, isEat) {
    if (!isEat) {
      const tail = this.body.pop();
      const tailIndex = tail.x * BOX_WIDTH_COUNT + tail.y;
      if (tailIndex >= 0 && tailIndex < this.game.children.length) {
        this.game.children[tailIndex].style.backgroundColor = '#f1f0f0ff';
      }
    }
    // 更新蛇头位置
    this.body.unshift({ x: this.body[0].x + dx, y: this.body[0].y + dy });
    this.renderSnake()
  }
  //跟据方向和是否进食改变蛇的身体
  updateSnake(isEat) {
    switch (this.direction) {
      case 'right':
        this.changBody(0, 1, isEat);
        break;
      case 'left':
        this.changBody(0, -1, isEat);
        break;
      case 'up':
        this.changBody(-1, 0, isEat);
        break;
      case 'down':
        this.changBody(1, 0, isEat);
        break;
    }
  }
}