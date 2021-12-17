module.exports = (api) => {
  const isTest = api.env('test'); // 必须要有
  console.log('调用 babel 玩 jest', isTest);
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ]
  };
};
