module.exports = function (api) {
  api.cache(true);
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '~src': './src/',
          '~actions': './src/actions/',
          '~components': './src/components/',
          '~config': './src/config/',
          '~images': './src/images/',
          '~reducers': './src/reducers/',
          '~screens': './src/screens/',
        },
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    ],
  ];

  return {
    plugins,
    presets,
  };
};
