const getPromiselog = (msg: string) =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve('result');
    }, 1000);
  });
// beforeEach & afterEach
beforeEach(() => {
  console.log('每次开始都要执行我一下');
  return getPromiselog('async 每次开始都要执行我一下');
});
afterEach(() => {
  console.log('每次结束也都要执行我一下');
  return getPromiselog('async 每次结束也都要执行我一下');
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
