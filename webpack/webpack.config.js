const { resolve,join } = require('path');
const glob=require('glob');

// const ESLintPlugin = require('eslint-webpack-plugin');
// 引用打包css为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//去除无用css
const PurgecssPlugin=require('purgecss-webpack-plugin');
// 引用压缩css
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// 引用打包html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS={scr:join(__dirname,'src')};


const { FALSE } = require('node-sass');

module.exports = {
  // entry
  //     入口指示webpack以哪个文件作为入口起点开始打包，分析构建内部依赖图
  // 单入口：如果只有一个入口，使用字符串，指定一个入口文件，打包一个chunk，输出一个bundle，chunk名称默认
  // entry:'./src/index.js',//默认路径为src/index.js
  // 多入口文件  数组，所有的入口文件会形成一个chunk，名称是默认的，输出是一个bundle
// entry:[
     //     "./src/index.js","./src/main.js"
     // ],
     // object  对象 多入口，有几个文件就生成几个chunk，并输出几个bundle，chunk的名称是key
     // entry:{
     //     one:'./src/index.js',
     //     tow:'./src/main.js'

     // },
     // 特殊用法 对象和数组混合
     // entry:{
     //     one:['./src/main.js','./src/index.js'],
     //     tow:'./src/index.js'
     // },

     // entry:{
     //     vendor:['./src/js/jquery.js','./src/js/common.js'],
     //     index:"./src/js/index.js",
     //     cart:"./src/js/cart.js"
     // },

     entry: ['./src/index.js'],


     // output 
     //     输出指示webpack 打包后的资源bundles输出到哪里，以及如何命名
     output: {
         // filename:'build.js',//自定义
         filename: '[name].js', // entry使用object入口模式，使用[name]关键字设置chunk名称
         path: join(__dirname, 'build') // dirname 根目录
     },
     // loader
     //     让webpack能够去处理那些非JavaScript资源如css、img等，将它们处理成webpack能够识别的资源（webpack本身只能理解js和json）
     module: {
         rules: [
             {
                 test: /\.css$/, // 正则匹配
                 use: [MiniCssExtractPlugin.loader, 'css-loader'] // 执行顺序：从右到左、从上到下
             },
             {
                 test: /\.less$/,
                 use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
             },
             {
                 test: /\.scss$/,
                 use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
             },
             // {
             //     test:/\.(png|jpg|jpeg|gif)$/,use:['url-loader',{loader:"file-loader",options:{}}]
             // },
             {
                 test: /\.(png|jpg|jpeg|gif)$/i,
                 use: [{
                     loader: "url-loader",
                     options: {
                         pubilcPath:'./',
                         outputPath:'./Images/',
                         limit: 1024 * 8,
                         name: '[name].[hash:8].[ext]',
                         esModule:false
                     }
                 }],
                 type:"javascript/auto"
             },
             {
                test:/\.html$/,
                loader:'html-loader'
             },
             {
                 exclude:/\.(js|json|less|css|scss|html|png|jpg|jpeg|gif)$/,
                 use:[
                     {
                        loader:'file-loader',
                        options:{
                           outputPath:"/font/",
                           publicPath:"./font/",
                           name:"[name].[hash:8].[ext]",
                           esModule:false
                        }
                     }
                 ],
                 type:"javascript/auto"
                 
             },
            //  {
            //      test:/\.js$/,
            //      exclude:/node_modules/,
            //      use:[{
            //         loader:'eslint-loader',
            //         options:{
            //             fix:false
            //         }
            //      }]
            //  }
         ]
     },
     // plugins
     //     插件  可用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量
     plugins: [
         // 默认创建空的html，自动引用打包的资源
         // new HtmlWebpackPlugin()
         new HtmlWebpackPlugin({
             template: "./src/index.html",
             filename: "index.html",
             // chunks:["index","vendor"],//html需要引用的资源打包chunk，页面渲染从右往前渲染
             // minify:{
             //     //移除空格
             //     collapaseWhitespace:true,
             //     //移除注释》ZAq
             //     removeComments:true
             // }
         }),
         // 压缩几个html，就写几个new
         // new HtmlWebpackPlugin({
         //     template:"./src/cart.html",
         //     filename:"cart.html",
         //     chunks:["cart","vendor"]

         // })
         new MiniCssExtractPlugin({
             filename: './css/[name].css',
         }),
         new CssMinimizerWebpackPlugin(),
         // new ESLintPlugin(),

         new PurgecssPlugin({
             paths:glob.sync(`${PATHS.src}/**/*`,{nodir:true}),
             safelist:function(){
                 return {
                     standard:['box']
                 }
             }
         }),
     ],

     // 在devServer自动刷新
     target:"web",

     // mode
     //     模式  指示webpack使用相对应模式的配置
     //         开发模式 development  配置简单，能让代码本地调试运行的环境
     //         生产模式 production   代码需要不断优化达到性能最好，能让代码优化上线运行的环境

     //         都会自启动一些插件，生产模式使用插件更多
    // mode: 'development',
     devServer:{
        hot:true,
        open:false,
        port:3001
    }
}