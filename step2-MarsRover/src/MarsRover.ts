import { position as MarsPosition, default as MarsMap } from './MarsMap';
export enum DIRECTION {
  N = 'N',
  S = 'S',
  E = 'E',
  W = 'W'
}
const directionRightMap = new Map([
  [DIRECTION.N, DIRECTION.E],
  [DIRECTION.E, DIRECTION.S],
  [DIRECTION.S, DIRECTION.W],
  [DIRECTION.W, DIRECTION.N]
]);
const directionLeftMap = new Map([
  [DIRECTION.N, DIRECTION.W],
  [DIRECTION.W, DIRECTION.S],
  [DIRECTION.S, DIRECTION.E],
  [DIRECTION.E, DIRECTION.N]
]);
type position = {
  x: number;
  y: number;
};
interface initialize {
  position: position;
  direction: DIRECTION;
}
export default class MarsRover {
  constructor(options: initialize) {
    this.position = options.position;
    this.direction = options.direction;
  }
  private position: position;
  private direction: DIRECTION;
  getState() {
    return {
      x: this.position.x,
      y: this.position.y,
      direction: this.direction
    };
  }
  turnRight() {
    this.direction = directionRightMap.get(this.direction) || this.direction;
  }
  turnLeft() {
    this.direction = directionLeftMap.get(this.direction) || this.direction;
  }
  move() {
    let speed = 1;
    const getMoveResult = {
      [DIRECTION.E]: (position: position) => {
        if (this.map.right >= position.x + speed) {
          position.x += speed;
        }
        return position;
      },
      [DIRECTION.S]: (position: position) => {
        if (this.map.bottom >= position.y + speed) {
          position.y += speed;
        }
        return position;
      },
      [DIRECTION.W]: (position: position) => {
        if (this.map.left <= position.x - speed) {
          position.x -= speed;
        }
        return position;
      },
      [DIRECTION.N]: (position: position) => {
        if (this.map.top <= position.y - speed) {
          position.y -= speed;
        }
        return position;
      }
    };
    this.position = getMoveResult[this.direction](this.position);
  }
  acceptMap(position: MarsPosition) {
    this.map = new MarsMap(position);
  }
  getMap() {
    return this.map?.getState();
  }
  private map: MarsMap = new MarsMap({
    x: 100,
    y: 100
  });
  private commands = {
    L: this.turnLeft,
    R: this.turnRight,
    F: this.move
  };
  // 接收指令
  execute(command: keyof typeof this.commands) {
    this.commands[command].call(this);
  }
  executeStr(command: string) {
    command.split('').forEach((item) => {
      const l = Object.keys(this.commands)
      if (Object.keys(this.commands).includes(item)) {
        this.execute(item as keyof typeof this.commands);
      } else {
        throw new Error('命令错误');
      }
    });
  }
}
