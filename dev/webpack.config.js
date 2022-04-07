const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');
const { url } = require('inspector');

// change these variables to fit your project
const jsPath= './js';
const cssPath = './css';
const outputPath = '../assets';
const localDomain = 'kucharky.devs';
const entryPoints = {
  'app': jsPath + '/app.js'
};

module.exports = {
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: 'js/[name].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),

    // Uncomment this if you want to use CSS Live reload

    new BrowserSyncPlugin({
      open: 'external',
      proxy: localDomain,
      host: localDomain,
      files: [ outputPath + '/css/*.css', outputPath + '/js/*.js', '../*.php' ],
      injectCss: true,
    }, { reload: false, }),

  ],
  module: {
    rules: [
      {
        test: /\.s?[c]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { indentedSyntax: true },
            }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }
      }
    ]
  },
};
