const sum = require('../src/sum.ts');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2, 3)).toBe(6);
});
test('toBe and toEqual', () => {
  expect(1 + 1).toBe(2);
  expect(console.log(1)).toBe(undefined);
  expect({ name: `张飞` }).toEqual({ name: `张飞` });
});
test('not', () => {
  expect(1 + 1).not.toBe(3);
  expect(console.log(1)).not.toBe(true);
  expect({ name: `张飞`, age: 19 }).not.toEqual({ name: `刘三刀`, age: 19 });
});
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).toBeFalsy();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
});
test('0', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeDefined();
  expect(z).toBeFalsy();
});
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
test('正则', () => {
  expect('team').not.toMatch(/I/);
  expect('Christoph').toMatch(/stop/);
});

test('has', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk'
  ];
  let map = new Map([['name', '张二狗']]);
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
  expect(map.values()).toContain('张二狗');
});
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
export {};
