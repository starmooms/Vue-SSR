const path = require("path");
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const dev = process.env.NODE_ENV === 'development'



const mode = dev ? "development" : "production";
const publicPath = dev ? "/" : "/";
const root = path.resolve(__dirname, '../')

const config = {
    mode: mode,
    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: publicPath,
        path: path.join(root, './dist')
    },
    resolve: {
        extensions: ['.js', '.ts', '.vue'],
        // alias: {
        //     'Less': path.resolve(__dirname, 'src/less'),
        //     'image': path.resolve(__dirname, 'src/image')
        // }
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
                // include: path.join(root, 'src'),
                // loader: 'babel-loader',
                // exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                // include: path.join(root, 'src'),
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
        })
    ]
}

if (!dev) {
    config.output.filename = "js/[name].js"
    config.output.chunkFilename = "js/[name].js"
    config.devtool = "none"
}

module.exports = config