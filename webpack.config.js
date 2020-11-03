var path = require('path')
var webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: ['babel-polyfill','./src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  //plugins: [ new BundleAnalyzerPlugin() ],
  plugins: [
    new CopyPlugin([{ from: './src/assets', to: '../assets' }])
    
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',

    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    //to access on local network
    host: '0.0.0.0',
    disableHostCheck: true,

    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
      "/api": {
        target: "http://localhost:8081"
      },
      "/uploads/images/": {
        target: "http://localhost:8081"
      },
      "/token": {
        target: "http://localhost:8888"
      },
      
    },
    // hot: false,
    // inline: false,
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {

   module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
