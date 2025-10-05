import {BOX_SIZE} from './constant.js'
//盒子类
export default class Box {

  constructor(color) {
    this.width = BOX_SIZE;
    this.height = BOX_SIZE;
    this.color = color;
  }
  render() {
    const box = document.createElement('div');
    box.style.width = `${this.width}px`;
    box.style.height = `${this.height}px`;
    box.style.backgroundColor = this.color;
    return box
  }
}