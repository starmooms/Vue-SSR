const Vue = require('vue')

function createApp(context) {
    return new Vue({
        data: {
            url: context.url
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })
}

module.exports = createApp