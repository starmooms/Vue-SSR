const createApp = require('./app')
const express = require('express')
const vueServerRender = require('vue-server-renderer')

const server = express()
// const renderer = vueServerRender.createRenderer()
const renderer = vueServerRender.createRenderer({
    //读取模板
    template: require('fs').readFileSync('./template.html', 'UTF-8')
})

server.get('*', (req, res) => {
    // const app = new Vue({
    //     data: {
    //         url: req.url
    //     },
    //     template: `<div>URL is {{ url }}</div>`
    // })
    const context = {
        title: `server-title`,
        meta: `<meta name='test' content='test'>`,
        url: req.url
    }
    const app = createApp(context)

    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('internal Server Error')
            return
        }
        res.end(html)
    })
})


server.listen(9000, '127.0.0.4')





















// const Vue = require('vue')
// const app = new Vue({
//     template: `<div>Hellow world</div>`
// })

// const renderer = require('vue-server-renderer').createRenderer()

// // renderer.renderToString(app, (err, html) => {
// //     if (err) throw err;
// //     console.log(html)
// // })

// renderer.renderToString(app).then(html => {
//     console.log(html)
// }).catch(err => {
//     throw err
// })