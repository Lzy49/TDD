module.exports = (api) => {
  const isTest = api.env('test'); // 必须要有
  return {
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      '@babel/preset-typescript'
    ]
  };
};