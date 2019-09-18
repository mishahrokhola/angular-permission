var path = require('path');
var webpack = require('webpack');
var HtmlWebPackPlugin = require("html-webpack-plugin");
var nodeModulesDir = path.resolve(__dirname, './node_modules');
var LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: [
      './src/app.ts'
    ]
  },

  context: __dirname + "",
  mode: 'production',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: __dirname + "/dist/"
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }, {
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader',
      options: {}
    },
    {
      test: /\.html$/,
      use: [{
        loader: 'file-loader?name=[path][name].[ext]r',
        options: {
          minimize: true
        }
      },
      {
        loader: 'extract-loader'

      },
      {
        loader: 'html-loader',
        options: { minimize: true }

      }
      ],
    },
    {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader,
      {
        loader: "css-loader", // translates CSS into CommonJS
        options: {
          minimize: true,
          sourceMap: false
        }
      }, {
        loader: "sass-loader", // compiles Sass to CSS
        options: {
          sourceMap: false
        }
      }]
    },

    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }

    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebPackPlugin({
      template: __dirname + "/index.ejs",
    })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    overlay: true,
    port: 8080
  },
};