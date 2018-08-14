const path = require("path");
const cleanWebpackPlugin = require('clean-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge')
const dev = process.env.NODE_ENV === 'development'
const root = path.resolve(__dirname, '../')


const config = merge(baseConfig, {

    entry: {
        main: path.join(root, './ssr_test/entry-client.js')
    },
    /*
    optimization: {
        splitChunks: {
        chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
        minSize: 0,                // 最小尺寸，默认0
        minChunks: 1,              // 最小 chunk ，默认1
        maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        maxInitialRequests: 1,    // 最大初始化请求书，默认1
        name: () => {},              // 名称，此选项课接收 function
        cacheGroups: {                 // 这里开始设置缓存的 chunks
            priority: "0",                // 缓存组优先级 false | object |
            vendor: {                   // key 为entry中定义的 入口名称
            chunks: "initial",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
            test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
            name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
            minSize: 0,
            minChunks: 1,
            enforce: true,
            maxAsyncRequests: 1,       // 最大异步请求数， 默认1
            maxInitialRequests: 1,    // 最大初始化请求书，默认1
            reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
            }
        }
        }
    },
    */
    optimization: {
        runtimeChunk: {
            name: 'mainfest'
        },
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'initial',
                    priority: 11,
                }
            }
        }
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
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        new VueSSRClientPlugin()
    ]

})

if (!dev) {
    let buildPlugins = [
        new cleanWebpackPlugin(['./dist'], {
            root: root
        })
    ]

    config.plugins.push(...buildPlugins);

}

module.exports = config