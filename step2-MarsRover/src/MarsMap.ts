export interface position {
  x: number;
  y: number;
}
export default class MarsMap {
  constructor(position: position) {
    this.right = position.x;
    this.bottom = position.y;
  }
  top = 0;
  left = 0;
  right: number;
  bottom: number;
  getState() {
    return {
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom
    };
  }
}
