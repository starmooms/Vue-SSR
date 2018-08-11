const express = require('express')
const vueServerRender = require('vue-server-renderer')

const server = express()

// server.js
const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const renderer = vueServerRender.createBundleRenderer(bundle, {
    runInNewContext: false, // 推荐
    template: require('fs').readFileSync('./template.html', 'UTF-8'),//读取模板
    clientManifest
})

// const createApp = require('./server/')

//设置静态文件
const serve = (path, cache) => express.static('./dist', {
    maxAge: cache && 1000 * 60 * 60 * 24 * 30
})
server.use('/dist', serve('./dist', true))


// api
server.get('/api/getString', (req, res) => {
    res.send({
        str: 'nowString is about'
    })
})



server.get('*', (req, res) => {
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

})


server.listen(9000, '127.0.0.4', () => {
    console.log(`server started at 127.0.0.4:9000`)
})