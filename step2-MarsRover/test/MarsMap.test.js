import MarsMap from '../src/MarsMap';
describe('地图', () => {
  test('创建地图', () => {
    const map = new MarsMap({
      x: 100,
      y: 100
    });
    expect(map.getState()).toEqual({
      top: 0,
      left: 0,
      right: 100,
      bottom: 100
    });
  });
});