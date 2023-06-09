var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
let manifest = require('./package.json');
const { DefinePlugin } = require('webpack');
let externals = _externals();

module.exports = {
  entry: './bin/www.js',
  mode: 'production',
  target: 'node',
  externals: externals,
  node: {
    __dirname: true
  },
  output: {
    path: path.resolve(__dirname, 'resource'),
    filename: 'myblog.server.bundle.js'
  },
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              "targets": {
                "node": true
              }
            }]]
          }
        },
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.jade$/,
        use: ['jade-loader']
      }
    ]
  },
  // 在头部引入插件
  // 在plugins配置数组中添加一项
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './ecosystem.config.js'),
          to: '',
        },
        { from: 'views', to: 'views' },]
    }),
    new DefinePlugin({
      JUE_JIN_SIGN_COOKIE: JSON.stringify(process.env.JUE_JIN_SIGN_COOKIE),
      EMAIL_PASSWORD: JSON.stringify(process.env.EMAIL_PASSWORD)
    })
  ],
  optimization: {
    minimize: true
  }

};
function _externals() {

  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}
