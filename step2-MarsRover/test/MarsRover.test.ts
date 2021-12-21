import { DIRECTION, default as MarsRover } from '../src/MarsRover';
describe('火星车', () => {
  test('初始化火星车', () => {
    const marsRover = new MarsRover({
      position: {
        x: 0,
        y: 0
      },
      direction: DIRECTION.N
    });
    expect(marsRover.getState()).toEqual({
      x: 0,
      y: 0,
      direction: DIRECTION.N
    });
  });
  test('接收地图', () => {
    const marsRover = new MarsRover({
      position: {
        x: 0,
        y: 0
      },
      direction: DIRECTION.E
    });
    marsRover.acceptMap({ x: 100, y: 200 });
    expect(marsRover.getMap()).toEqual({
      top: 0,
      left: 0,
      right: 100,
      bottom: 200
    });
  });
  describe('测试火星车 前进 地图大小 为 100 * 100 , 火星车位置为 0 0', () => {
    test.each([
      [DIRECTION.N, { y: 0, x: 0 }],
      [DIRECTION.E, { y: 0, x: 1 }],
      [DIRECTION.S, { y: 1, x: 0 }],
      [DIRECTION.W, { y: 0, x: 0 }]
    ])(
      '火星车位置 为 {x:0,y:0} 朝向为 %s 前进后为 %o',
      (direction, position) => {
        const marsRover = new MarsRover({
          position: {
            x: 0,
            y: 0
          },
          direction: direction
        });
        marsRover.acceptMap({
          x: 100,
          y: 100
        });
        marsRover.move();
        expect(marsRover.getState().x).toBe(position.x);
        expect(marsRover.getState().y).toBe(position.y);
      }
    );
  });
  describe('测试火星车 前进 地图大小 为 100 * 100 , 火星车位置为 100 100', () => {
    test.each([
      [DIRECTION.N, { y: 99, x: 100 }],
      [DIRECTION.E, { y: 100, x: 100 }],
      [DIRECTION.S, { y: 100, x: 100 }],
      [DIRECTION.W, { y: 100, x: 99 }]
    ])(
      '火星车位置 为 {x:0,y:0} 朝向为 %s 前进后为 %o',
      (direction, position) => {
        const marsRover = new MarsRover({
          position: {
            x: 100,
            y: 100
          },
          direction: direction
        });
        marsRover.acceptMap({
          x: 100,
          y: 100
        });
        marsRover.move();
        expect(marsRover.getState().x).toBe(position.x);
        expect(marsRover.getState().y).toBe(position.y);
      }
    );
  });
  describe('测试火星车 左转', () => {
    test.each([
      [DIRECTION.N, DIRECTION.W],
      [DIRECTION.W, DIRECTION.S],
      [DIRECTION.S, DIRECTION.E],
      [DIRECTION.E, DIRECTION.N]
    ])('%s 转 %s', (start, end) => {
      const marsRover = new MarsRover({
        position: {
          x: 0,
          y: 0
        },
        direction: start
      });
      marsRover.turnLeft();
      expect(marsRover.getState().direction).toBe(end);
    });
  });
  describe('测试火星车 右转', () => {
    test.each([
      [DIRECTION.N, DIRECTION.E],
      [DIRECTION.E, DIRECTION.S],
      [DIRECTION.S, DIRECTION.W],
      [DIRECTION.W, DIRECTION.N]
    ])('%s 转 %s', (start, end) => {
      const marsRover = new MarsRover({
        position: {
          x: 0,
          y: 0
        },
        direction: start
      });
      marsRover.turnRight();
      expect(marsRover.getState().direction).toBe(end);
    });
  });
  describe('测试火星车 执行命令', () => {
    test('测试单一指令', () => {
      const marsRover = new MarsRover({
        position: {
          x: 0,
          y: 0
        },
        direction: DIRECTION.N
      });
      marsRover.acceptMap({
        x: 100,
        y: 100
      });
      marsRover.execute('R');
      expect(marsRover.getState()).toEqual({
        x: 0,
        y: 0,
        direction: DIRECTION.E
      });
    });
    test('测试一个指令串', () => {
      const marsRover = new MarsRover({
        position: {
          x: 50,
          y: 50
        },
        direction: DIRECTION.N
      });
      marsRover.acceptMap({
        x: 100,
        y: 100
      });
      marsRover.executeStr('LRFLRFLRFLRFFFF');
      expect(marsRover.getState()).toEqual({
        x: 50,
        y: 43,
        direction: DIRECTION.N
      });
    });
  });
});
