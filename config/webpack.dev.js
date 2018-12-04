const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['react-hot-loader/babel'],
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.styl|\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-smart-import')({/* ...options */}),
                require('precss')({/* ...options */}),
                require('autoprefixer')({/* ...options */})
              ],
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ],
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '../', 'src'),
    }
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    inline: true,
    publicPath: '/',
    contentBase: path.join(__dirname, '../', 'public'),
    historyApiFallback: true,
  },
  devtool:'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../', 'public', 'index.html')
    })
  ]
};