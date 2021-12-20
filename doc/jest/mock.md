# 创建 mock 数据
## jest.fn
`jest.fn` 接收一个函数。返回一个函数。返回值接收的参数与接收函数接收参数相同。返回值拥有一个静态值 `mock` 该值存储了以下几种值：
- calls: 返回调用这个函数的参数数组 (`[[1],[2]]`)
- instances: 返回调用这个函数的`this`数组 (`[undefined,windown]`)
- invocationCallOrder: 返回调用该函数的顺序值 (`[1,2]`)
- results: 返回调用该函数的返回值，报错值。(`[ { type: 'return', value: 43 }, { type: 'return', value: 44 } ]`)
```Typescript
const mockCallback = jest.fn((x) => {
  return 42 + x;
});
mockCallback(1);
mockCallback(2);
test('init', () => {
  console.log(mockCallback.mock);
  expect(true).toBe(true);
});
```
### 其他方法
`jest.fn` 方法除了将一个函数变成一个带有`mock`的函数外。还可以修改函数的静态方法：
- `mockFn.mockClear()`   ：清空 mock 数据
- `mockFn.mockReset()`   ：清空 mock 数据 并清空 函数
- `mockFn.mockImplementation(fn)`  ：设置 `jest.fn` 
- `mockFn.mockImplementationOnce(fn)`  ：设置 `jest.fn` 链路
- `mockFn.mockReturnThis()`  ：设置 `jest.fn` this
- `mockFn.mockReturnValue(value)`  ：设置 `jest.fn` 返回值
- `mockFn.mockReturnValueOnce(value)`  ：设置 `jest.fn` 返回值链路
- `mockFn.mockResolvedValue(value)`  ：生成一个 成功 Promise 异步函数
- `mockFn.mockResolvedValueOnce(value)`  : 生成一个 成功 Promise 异步函数 链路
- `mockFn.mockRejectedValue(value)`  ：生成一个 失败 Promise 异步函数
- `mockFn.mockRejectedValueOnce(value)` ：生成一个 失败 Promise 异步函数链路
## jest.mock
`jest.mock` 方法会对模块进行模拟，使得模块返回值中的函数成为`jest.fn` 函数，这个时候，就可以对其进行一些操作，影响被测试代码返回自己预想的结果。
```Typescript

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
```
## 