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
          '~lib': './src/lib/',
          '~reducers': './src/reducers/',
          '~sagas': './src/sagas/',
          '~screens': './src/screens/',
          '~storage': './src/storage/',
          '~e2e': './e2e/',
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
