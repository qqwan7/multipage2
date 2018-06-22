'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

// 模拟后台数据
const express = require('express')
let bodyParser = require('body-parser')
// let multer = require('multer')
const app = express()
let apiRoutes = express.Router()
// app.use(multer())
app.use('/api', apiRoutes)
app.post('/', function (req, res) {
  console.log('============' + req.body);
})
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        // { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, '/modules/index/index.html') },
        { from: /^\/index\/.*$/, to: path.posix.join(config.dev.assetsPublicPath, '/modules/index/index.html') },
        { from: /^\/second\/.*$/, to: path.posix.join(config.dev.assetsPublicPath, '/modules/second/index.html') }
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    // 提供接口
    before(app){
      app.use(bodyParser.json())
      app.use(bodyParser.urlencoded({ extended: true }))
      app.post('/api/admin/login', function (req,res) {
        let password = req.body.password
        let username = req.body.username
        console.log(req.body + '' + password + '---' + username + '--' + (username === 'admin' && password === 'admin'))
        if (username === 'admin' && password === 'admin') {
          res.json({
            retCode: 0,
            msg: 'success',
            data: ''
          })
        }else{
          res.json({
            retCode: 1,
            msg: 'failed',
            data: ''
          })
        }
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
//构建生成多页面的HtmlWebpackPlugin配置，主要是循环生成
var files = require('glob').sync('./src/modules/**/*.html');
files.forEach(function(f){
  var name = /.*\/(modules\/.*?\/*)\.html/.exec(f)[1];//得到modules/index/index这样的文件名
  console.log('--2-' + name + '----' + f)
  var conf = {
    filename: name + '.html',
    template: f, // 模板路径
    chunks: ['vendor', name, 'vendorui'], // 每个html引用的js模块
    favicon: 'src/assets/img/favicon.ico',
    inject: true,
    hash:true
  };
  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
});
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
