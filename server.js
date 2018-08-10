const express = require('express')
const vueServerRender = require('vue-server-renderer')

const server = express()

// server.js
// const renderer = vueServerRender.createRenderer({
//     //读取模板
//     template: require('fs').readFileSync('./template.html', 'UTF-8')
// })
const createApp = require('./dist/js/buildServer')

server.get('*', (req, res) => {
    const context = { title: req.url, url: req.url }

    createApp(context).then(app => {
        renderer.renderToString(app, context, (err, html) => {
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
})


server.listen(9000, '127.0.0.4')