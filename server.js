const express = require('express')
const vueServerRender = require('vue-server-renderer')
// const historyBack = require('connect-history-api-fallback')   //单页面设置  找不到页面返回index

const dev = process.env.NODE_ENV === 'development'
const server = express()

//vue-server-renderer    dev和prod引用文件设置
//读取模板
let renderer, readyPromise
const template = require('fs').readFileSync('./template.html', 'UTF-8')

function createRenderer(bundle, options) {
    return vueServerRender.createBundleRenderer(bundle, Object.assign(options, {
        runInNewContext: false
    }))
}

if (dev) {
    readyPromise = require('./build/setup-dev-server')(
        server,
        './template.html',
        (bundle, options) => {
            renderer = createRenderer(bundle, options)
        }
    )
} else {
    const bundle = require('./dist/vue-ssr-server-bundle.json')
    const clientManifest = require('./dist/vue-ssr-client-manifest.json')
    renderer = createRenderer(bundle, {
        template,
        clientManifest
    })
}


// let c = historyBack({
//     index: '/',
//     rewrites: [
//         { from: /^\/\/.*$/, to: '/' }
//     ]
// })
// server.use(c)

//设置静态文件目录
const serve = (path, cache) => express.static(path, {
    maxAge: cache && 1000 * 60 * 60 * 24 * 30
})
server.use('/', serve('./dist', true))

// api
const apiRouter = express.Router()
apiRouter.get('/getString', (req, res) => {
    pathString = req.query.pathString ? req.query.pathString : 'no get pathString'
    res.send({
        str: `this path is ${pathString}`
    })
})
server.use('/api', apiRouter)


function render(req, res) {

    const context = { title: req.url, url: req.url }
    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        } else {
            res.end(html)
        }
    })
}

const mainRouter = express.Router()
mainRouter.get('/', dev ? (req, res) => {
    readyPromise
        .then(() => {
            render(req, res)
        })
        .catch((err) => {
            console.log(err)
        })
} : render)
server.use('/*', mainRouter)


let port = process.env.PORT || 9000
let host = process.env.HOST || require('./build/setIp')


// 避免服务端请求 ‘/api/getString’ 出错   改变全局默认配置
const axios = require('axios')
axios.defaults.baseURL = `http://${host}:${port}`


server.listen(port, host, () => {
    console.log(`server started at http://${host}:${port} ---------------\n`)
})