# 匹配器

匹配器就是 jest 提供的一系列方法。他们可以方便测试。

# 详细

## test

test 接收 两个参数 `name` 和 `handler` 表示创建一个测试用例。`name`是 测试用例的名字，`handler` 接收一个函数，该函数是测试用例的内容。

## expect

expect 接收 1 个参数 ，该参数是一段 javascript 表达式 。表示运行这段代码。并得到一个值。

```javascript
expect(1 + 1);
expect(console.log(1));
expect({ name: `张飞` });
```

## toBe 和 toEqual

### 相同

`toBe` 和 `toEqual` 非常像，他们都接受一个参数，这个参数是 确定的一个值。两个用来校验 `expect` 返回内容是否与传入参数相同。

### 不同

`toBe` 和 `toEqual` 的功能是相同的，他们的区别是 `toBe` 接收基础类型，做等比较。而`toEqual` 接收一个引用类型，并递归比较每一个值是否相同。

```javascript
expect(1 + 1).toBe(2);
expect(console.log(1)).toBe(undefined);
expect({ name: `张飞` }).toEqual({ name: `张飞` });
```

## not

表示不等于 某某 值。 与 `toBe` 和 `toEqual` 配合使用。要注意 与 `toEqual` 配合时，只要其中任一不同就会返回 true

```javascript
expect(1 + 1).not.toBe(3);
expect(console.log(1)).not.toBe(true);
expect({ name: `张飞`, age: 19 }).not.toEqual({ name: `刘三刀`, age: 19 });
```

## undefined, null, false

jest 对 `undefined` ,`null`,`false` 增加了一些常用函数。方便判断

- toBeNull() : 值 必须 等于 `null`
- toBeUndefiend() : 值 必须 等于 `undefined`
- toBeDefiend() : 值 必须 不等于 `undefined`
- toBeTruthy() : 值 必须 等于 `true` ， 如果非 `Boolean` 会 将值转换为 `Boolean`
- toBeFalsy() : 值 必须 等于 `false` , 如果非 `Boolean` 会 将值转换为 `Boolean`

```javascript
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
```

## Number

在对数字进行测试时，经常会有大于，小于，这种操作，jest 也提供了这些操作：

- toBeGreaterThan() : 表示 值 必须 大于 传入参数
- toBeGreaterThanOrEqual() : 表示 值 必须 大于等于 传入参数
- toBeLessThan() : 表示 值 必须 小于 传入参数
- toBeLessThanOrEqual() : 表示 值 必须 小于等于 传入参数
- 当整数进行 等于 的话使用`toBe` 和`toEqual` 都是可以的；而小数需要使用`toBeCloseTo` 来判定

```javascript
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
```

## 正则匹配

对字符串，还可以使用正则匹配，匹配器为`toMath`

```Javascript
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```

## 包含匹配

搜索一个 数组或迭代器中是否存在某值可以使用`toContain` 匹配器

```javascript
test('has', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk'
  ];
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
  let map = new Map([['name', '张二狗']]);
  expect(map.values()).toContain('张二狗');
});
```
### 报错
判定运行结果是否是一个错误，错误内容是否和传入内容相匹配
```javascript
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
```
