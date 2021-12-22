import sum from './sum.js';
describe('sum', () => {
  test('1 + 1 = 2', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
