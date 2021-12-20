// 要测试的回调函数
type callback = (data: string) => void;
function fetchData(callback: callback) {
  callback('peanut butter');
}
function fethDataAsync(callback: callback) {
  setTimeout(() => {
    callback('peanut butter');
  }, 1000);
}
test('测试回调函数 - 同步', () => {
  const callbackFun: callback = (data = '') => {
    expect(data).toBe('peanut butter');
  };
  fetchData(callbackFun);
});

test('测试回调函数 - 异步', (done) => {
  const callbackFun: callback = (data = '') => {
    console.log('此处执行了');
    expect(data).toBe('peanut butter');
    done();
  };
  fethDataAsync(callbackFun);
});

// 测试 Promise
function setPromise(isResolve: Boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isResolve ? resolve('result') : reject('fail');
    }, 200);
  });
}
test('测试 Promise 期望 成功', () => {
  return setPromise(true).then((res) => expect(res).toBe('result'));
});

test('测试 Promise 期望 失败', () => {
  expect.assertions(1);
  return setPromise(false).catch((res) => expect(res).toMatch('fail'));
});

test('测试 Promise 期望成功 - 2', () => {
  return expect(setPromise(true)).resolves.toBe('result');
});

test('测试 Promise 期望失败 - 2', () => {
  return expect(setPromise(false)).rejects.toBe('fail');
});

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

test('测试 async & await 成功 - 2', async () => {
  await expect(setPromise(true)).resolves.toBe('result');
});

test('测试 async & await 失败 - 2', async () => {
  await expect(setPromise(false)).rejects.toBe('fail');
});
