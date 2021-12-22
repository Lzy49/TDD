# jest 如何支持 esm 模块

## 通过 babel 来解析

### 安装 babel 插件

```shell
yarn add --dev babel-jest @babel/core @babel/preset-env
```

### 配置 babel.config

```javascript
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
};
```

> 做好以上操作就可以让 js 环境 的 jest 运行 esm 了。

### 安装 Ts 环境

#### 直接使用 babel 来解析 ts 即可。

```shell
yarn add --dev @babel/preset-typescript @types/jest
```

#### 配置 babel 解析 ts

```javascript
module.exports = () => {
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ]
  };
};
```

## 通过 设置 node 和 jest 环境变量的方式来解析

### 修改 node 环境解析 ，jest 运行命令

将 package 中 `type` 修改 为 `module` , 将 jest 运行命令修改为`NODE_OPTIONS=--experimental-vm-modules jest`

```json
{
  "name": "2-node",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "NODE_OPTIONS=--experimental-vm-modules jest"
  },
  "type": "module",
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^27.4.5"
  }
}
```

> 此时 就配置好了 j s 环境 jest 使用 esm 

## 配置 TS 环境

### 配置 TS 环境 的 jest 需要使用到 ts-jest 这个库。 继续要安装：

```shell
yarn add ts-jest @types/jest -D 
```

### 对 jest 进行配置

在配置上面的基础上还要配置以下内容

参考文档： https://kulshekhar.github.io/ts-jest/docs/guides/mock-es6-class

```json
// package.json
{
  ...
  "jest": {
    "preset": "ts-jest/presets/default-esm", 
    "globals": {
      "ts-jest": {
        "useESM": true
      }
    },
    "moduleNameMapper": {
      "^(\\.{1,2}/.*)\\.js$": "$1"
    }
  },
  ...
}
```



