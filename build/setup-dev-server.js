
const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const MFS = require('memory-fs')
const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')


//读取文件流
const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
    } catch (e) { }
}

/**
 * 
 * @param {express对象} app 
 * @param {模板文件路径} templatePath 
 * @param {vue-server-renderer基本构建函数} cb 
 */
module.exports = (app, templatePath, cb) => {
    let bundle, template, clientManifest

    let ready
    const readPromise = new Promise(r => {
        ready = r   //把reslove传出
    })
    //更新页面updata
    const updata = () => {
        if (bundle && clientManifest) {
            // console.log('updata成功！！！！！！！！')
            ready()
            cb(bundle, {
                template,
                clientManifest
            })
        }
    }

    template = fs.readFileSync(templatePath, 'utf-8')
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8')
        console.log('模板文件更新 index.html template updated')
        updata()
    })


    //main??
    //webpack-hot-middleware 热更新配置
    clientConfig.entry.main = ['webpack-hot-middleware/client', clientConfig.entry.main]
    clientConfig.output.filename = '[name].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )


    //配置启动webpack （前台entry-client打包）
    const clientCompiler = webpack(clientConfig)
    //启动服务器
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: false
    })


    //express使用中间件（webpack-dev-middleware 服务器）
    app.use(devMiddleware)

    //webpack构建完成 有错误打印错误  没有错误读取文件流
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        clientManifest = JSON.parse(readFile(
            devMiddleware.fileSystem,
            'vue-ssr-client-manifest.json'
        ))
        updata()
    })

    //express使用中间件（webpack-hot-middleware 热更新）
    app.use(require('webpack-hot-middleware')(clientCompiler, {
        heartbeat: 5000,    //向客户端发送的频率
        noInfo: true,    //信息控制台日志记录。
        quiet: true     //所有控制台日志记录。
    }))


    //配置启动webpack （后台entry-server打包）
    const serverCompiler = webpack(serverConfig)
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) return err
        stats = stats.toJson()
        if (stats.errors.length) return
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        updata()
    })

    return readPromise

}