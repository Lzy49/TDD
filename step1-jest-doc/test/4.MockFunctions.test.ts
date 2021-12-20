//  jest.fn
const mockCallback = jest.fn((x) => {
  return 42 + x;
});
mockCallback(1);
// mockCallback.mockClear(); // 清楚记录 只清楚 mock 中的记录
// mockCallback.mockReset(); // 重置 不但清楚 mock 而且还将 传入 jest.fn 中 的函数也清掉了。
mockCallback(2);
test('init', () => {
  mockCallback.mockRestore();
  console.log(mockCallback.mock);
  expect(true).toBe(true);
});

const axios = require('axios');
// console.log(axios);
jest.mock('axios');
test('axios', () => {
  const users = [{ name: 'Bob' }];
  const resp = { data: users };
  axios.get.mockResolvedValue(resp);
  return axios.get().then((res: Object) => {
    console.log(res);
  });
});

// jest.mock('../src/sum.ts', () => {
//   //Mock the default export and named export 'foo'
//   return {
//     name: '233'
//   };
// });
// const r = require('../src/sum');
// test('mock', () => {
//   console.log(r);
// });
