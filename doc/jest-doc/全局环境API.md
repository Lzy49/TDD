# 环境和守卫

## beforeEach & afterEach

`beforeEach` 和 `afterEach` 两函数，会在每一次 `test` 函数执行前后执行。如果 `beforeEach` 和 `afterEach` 要执行异步函数，可以将`Promise` 返回。

```Typescript
const getPromiselog = (msg) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve('result');
    }, 1000);
  });
beforeEach(() => {
  console.log('每次开始都要执行我一下');
  return getPromiselog('async 每次开始都要执行我一下');
});
afterEach(() => {
  console.log('每次结束也都要执行我一下');
  return getPromiselog('async 每次结束也都要执行我一下');
});
test('test 1', () => {
  console.log('test 1');
  expect(1).toBe(1);
});
test('test 2', () => {
  console.log('test 2');
  expect(1).toBe(1);
});

```
## beforeALl & afterAll
`beforeAll` 和 `afterAll` 与 `beforeEach` ，`afterEach` 差不多。区别在于`beforeAll` 和 `afterAll` 只会在运行时执行一次。并不会在每次`test` 都执行。
```Typescript
const getPromiselog = (msg: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve('result');
    }, 1000);
  });
// beforeAll & afterAll
beforeAll(() => {
  console.log('=========== 我最先执行 , 我只执行一次=========== ');
  return getPromiselog('async 我最先执行');
});
afterAll(() => {
  console.log('=========== 我最后执行 , 我只执行一次 =========== ');
  return getPromiselog('async 我最后执行');
});
test('test 1', () => {
  console.log('test 1');
  expect(1).toBe(1);
});
test('test 2', () => {
  console.log('test 2');
  expect(1).toBe(1);
});

```
## describe 
`describe` 函数接收一个描述，和一个函数，在传入函数中设置一个 作用域。<br>
在这个作用域中定义的`beforeAll` 和 `afterAll`,`beforeEach` 和 `afterEach` 只会在该区域内的`test` 调用。<br>
`describe` 外父作用域的 `beforeAll` 和 `afterAll`,`beforeEach` 和 `afterEach` 在该作用域中的`test` 中调用，并会在 `describe` 内部之前调用。 <br>
`describe` 的定义是同步的，并不会立即执行 `test` 而是走完所有的代码才会按顺序执行 `test` 
``` Typescript
// beforeAll(() => console.log('beforeAll'));
// afterAll(() => console.log('afterAll'));
// beforeEach(()=>console.log('beforeEach'))
console.log('同步1');
describe('describe', () => {
  console.log('同步2');
  beforeAll(() => console.log('describe beforeAll'));
  afterAll(() => console.log('describe afterAll'));
  test('test 1 ', () => console.log('test 1'));
});
console.log('同步3');
test('test 2 ', () => console.log('test 2'));
beforeAll(() => console.log('=========== start beforeAll==========='));
afterAll(() => console.log('============== end afterAll =========='));
beforeEach(() => console.log('==============  beforeEach =========='));
```
## test.only
如果想只执行文件中的一个 `test` 测试可以调用`test.only` 来执行。jest 不会执行文件中其他测试 只会执行带有`test.only`函数。
```typescript
test('test 2 ', () => console.log('test 2'));
test.only('test 2 only', () => console.log('test 2 only'));
```