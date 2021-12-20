# 测试异步代码

## 测试回调函数

测试回调函数，只要根据 回调函数需要，传入规定回调函数，在回调函数中处理即可。代码会根据顺序执行，来测试。

```Typescript
// 要测试的回调函数
type callback = (data: string) => void;
function fetchData(callback: callback) {
  callback('peanut butter');
}

test('测试回调函数 - 1', () => {
  const callbackFun: callback = (data = '') => {
    expect(data).toBe('peanut butter');
  };
  fetchData(callbackFun);
});
```

在同步回调中，值需要在测试的位置使用测试匹配器即可，但是通常回调函数都是异步执行。
<br>
在处理异步回调函数时，`test`匹配器时，提供了一个回调函数`done`该函数作为参数传入 `test` 的第二参数中。
<br>
该函数必须在函数中调用，否则会报超时错误。使用该函数可以在异步执行，测试结束后，结束该测试。

```Typescript
type callback = (data: string) => void;
function fethDataAsync(callback: callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 1000);
}
test('测试回调函数 - 异步', done => {
  const callbackFun: callback = (data = '') => {
    console.log('此处执行了')
    expect(data).toBe('peanut butter');
    done()
  };
  fethDataAsync(callbackFun);
});
```

## 测试 Promise

测试 Promise 时也可以在`then` 和 `catch` 中 使用 `done` 结束异步。但是有更方便的办法：将 Promise 直接`return` 即可。

```Typescript
// 测试 Promise
function setPromise(isResolve: Boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve('result') : reject('fail');
    }, 1000);
  });
}
test('测试 Promise 期望 成功回调', () => {
  return setPromise(true).then((res) => expect(res).toBe('result'));
});
test('测试 Promise 期望 失败', () => {
  return setPromise(false).catch((res) => expect(res).toMatch('fail'));
});
```

虽然这种方法可以执行到 `then` 和 `catch` 回调中，但是如果两个回调都不执行，也会测试成功。这并不是我们想要的。<br/>
这个时候可以使用`expect.assertions`函数来定义在本次测试中，必须进行几次检验。当检验次数不够传入次数时，测试失败。

```Typescript
// 测试 Promise
function setPromise(isResolve: Boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve('result') : reject('fail');
    }, 1000);
  });
}
test('测试 Promise 期望 失败', () => {
  expect.assertions(1);
  return setPromise(false).catch((res) => expect(res).toMatch('fail'));
});
```

每次写`expect.assertions` 也很麻烦，jest 还提供了新的 api 来解决这个问题：

- `expect().resolves` 必须有成功回调
- `expect().rejects` 必须有失败回调

```Typescript
function setPromise(isResolve: Boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve('result') : reject('fail');
    }, 1000);
  });
}
test('测试 Promise 期望成功 - 2', () => {
  return expect(setPromise(true)).resolves.toBe('result');
});

test('测试 Promise 期望失败 - 2', () => {
  return expect(setPromise(false)).rejects.toBe('fail');
});
```

## 使用 async 和 await 来处理 异步函数。

jest 的 `test` 函数 的第二参可以是一个 `async` 函数。在函数中可以使用 `await` 即可。

```Typescript
function setPromise(isResolve: Boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve('result') : reject('fail');
    }, 1000);
  });
}
test('测试async & await 成功', async () => {
  try {
    const data = await setPromise(true);
    expect(data).toBe('result');
  } catch (res) {
    expect(res).toBe('fail');
  }
});
test('测试async & await 失败', async () => {
  try {
    const data = await setPromise(false);
  } catch (res) {
    expect(res).toBe('fail');
  }
});
```
除以上用法外，jest 提供的`expect().resolves` 和 `expect().rejects` 两个 api 也可以使用 `await` 来接收。
```Typescript
function setPromise(isResolve: Boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve('result') : reject('fail');
    }, 1000);
  });
}
test('测试 async & await 成功 - 2', async () => {
  await expect(setPromise(true)).resolves.toBe('result');
});

test('测试 async & await 失败 - 2', async () => {
  await expect(setPromise(false)).rejects.toBe('fail');
});
```