const path = require("path");
const webpack = require("webpack");
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer



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
    console.log(argv.mode + "!!!!");

    const dev = argv.mode === "development" ? true : false;
    const publicPath = dev ? "/" : "/";
    dev ? devServerUrl() : null; //设置端口号

    const config = {
        mode: argv.mode,
        entry: {
            main: "./src/main.js",
        },
        output: {
            filename: "[name].js",
            chunkFilename: "[name].chunk.js",
            publicPath: publicPath,
            path: path.resolve(__dirname, 'dist')
        },
        devtool: 'source-map',
        devServer: {
            compress: true,
            clientLogLevel: 'none',  //控制台更新消息
            historyApiFallback: true,
            noInfo: false,       //启动时打包模块的信息
            inline: true,
            hot: true,
            open: false,
            inline: true,
            host: localUrl,
            port: devport,
            // proxy:{ //只会更换当前服务器路径！！！
            //     '/api/*':{
            //         target: 'http://localhost:2000',
            //     }
            // }
        },
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
        resolve: {
            extensions: ['.js', '.ts', '.vue'],
            alias: {
                'Less': path.resolve(__dirname, 'src/less'),
                'image': path.resolve(__dirname, 'src/image')
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        miniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { minimize: !dev, sourceMap: dev, importLoaders: 1 } },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        { loader: 'css-loader', options: { minimize: !dev, sourceMap: dev, importLoaders: 3 } },
                        'postcss-loader',
                        { loader: 'less-loader', options: { sourceMap: dev } },
                        // {
                        //     loader: 'sass-resources-loader', options: {
                        //         resources: './src/less/variable.less'
                        //     }
                        // }
                    ]
                },
                {
                    test: /\.(jpg|png|svg|gif)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'image/[hash].[ext]'
                    }
                },
                {
                    test: /\.(svg|ttf|woff)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'fonts/[hash].[ext]'
                    }
                },
                {
                    test: /\.js$/,
                    include: path.resolve(__dirname, 'src'),
                    // loader: 'babel-loader',
                },
                {
                    test: /\.ts$/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: { sourceMap: true }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new miniCssExtractPlugin({
                filename: "css/[name]-[contenthash:8].css"
            }),
            new htmlWebpackPlugin({
                filename: "index.html",
                title: "Music Demo",
                template: "./src/template.html"
            })
        ]
    }

    if (!dev) {
        let buildPlugins = [
            new cleanWebpackPlugin(['dist']),

            new PrerenderSpaPlugin({
                // 生成文件的路径，也可以与webpakc打包的一致。
                // 下面这句话非常重要！！！
                // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
                // 会读取dist下的生成的index.html 为模板生成vue
                staticDir: path.join(__dirname, 'dist'),
                // indexPath: path.join(__dirname, 'dist', 'index.html'),

                // 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
                routes: ['/about', '/message', '/product'],

                // 这个很重要，如果没有配置这段，也不会进行预编译
                renderer: new Renderer({
                    inject: {
                        foo: 'bar'
                    },
                    renderAfterTime: 5000,
                    headless: false,
                    // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                    renderAfterDocumentEvent: 'render-event'
                })
            })
        ]
        config.output.filename = "js/[name]-[chunkhash:8].js"
        config.output.chunkFilename = "js/[name]-[chunkhash:8].js"
        config.devtool = "none"
        config.plugins.push(...buildPlugins);
    } else {
        let devPlugins = [
            new webpack.HotModuleReplacementPlugin(),
        ]
        config.plugins.push(...devPlugins);

    }

    return config;
}