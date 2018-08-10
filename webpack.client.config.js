const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge')
const dev = process.env.NODE_ENV === 'development'


// 设置devServer 为ip地址
const os = require('os');
let localUrl = "localhost"; //默认为localhost dev启动函数改变
const devport = "8091";
const devServerUrl = () => {
    try {
        let ifaces = os.networkInterfaces();
        for (let dev in ifaces) {
            if (dev != "Loopback Pseudo-Interface 1") {  //判断条件？？？
                ifaces[dev].forEach((details, alias) => {
                    if (details.family == 'IPv4') {
                        localUrl = details.address
                        return false;
                    }
                })
            }
        }
    } catch (e) {
        localUrl = 'localhost';
    }
    console.log(`--------------http://${localUrl}:${devport}/`);
}



module.exports = (env, argv) => {

    
    const publicPath = dev ? "/" : "/";
    dev ? devServerUrl() : null; //设置端口号

    const config = {
        entry: {
            main: './ssr_test/entry-client.js'
        },
        output: {
            filename: "[name].js",
            chunkFilename: "[name].chunk.js",
            publicPath: publicPath,
            path: path.resolve(__dirname, 'dist')
        },
        // devtool: 'source-map',
        // devServer: {
        //     compress: true,
        //     clientLogLevel: 'none',  //控制台更新消息
        //     historyApiFallback: true,
        //     noInfo: false,       //启动时打包模块的信息
        //     inline: true,
        //     hot: true,
        //     open: false,
        //     inline: true,
        //     host: localUrl,
        //     port: devport,
        //     // proxy:{ //只会更换当前服务器路径！！！
        //     //     '/api/*':{
        //     //         target: 'http://localhost:2000',
        //     //     }
        //     // }
        // },


        plugins: [
            new htmlWebpackPlugin({
                filename: "index.html",
                title: "Music Demo",
                template: "./template.html"
            })
        ]
    }

    if (!dev) {
        let buildPlugins = [
            new cleanWebpackPlugin(['dist']),
        ]
        config.output.filename = "js/[name].js"
        config.output.chunkFilename = "js/[name].js"
        config.devtool = "none"
        config.plugins.push(...buildPlugins);
    } else {
        let devPlugins = [
            new webpack.HotModuleReplacementPlugin(),
        ]
        config.plugins.push(...devPlugins);
    }


    return merge(baseConfig, config)
}