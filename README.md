# Vue SEO优化
** 1.服务端SSR
2.预渲染  **


### 预渲染

使用`prerender-spa-plugin`生成静态页面，再用`vue-meta-info`管理头部title、meta等。(注意不能是`vue-meta`)

`prerender-spa-plugin`安装？？？（详情参看main.js下的两个链接）
安装`prerender-spa-plugin`依赖于`puppeteer`,要翻墙下载电脑系统对应的`chromium`200多m。
这里先`npm i --save puppeteer --ignore-scripts`,安装时跳过`chromium`。再翻墙下载`chromium`，放到指定目录。
PS:可进入src  `node test.js` 测试安装`puppeteer`是否成功。
再安装`prerender-spa-plugin`，修改`prerender-spa-plugin`中的文件路径。

渲染出静态页面后，如果
1.客户端一开始访问index,其后面不刷新都访问其它链接都在本页

2.客户端一开始访问about等静态，跳转到静态about
其他链接有静态会返回静态页面，直达找不到页面返回index，其后都在index
(因为一开始访问静态页面，js找不到#app不会渲染vue。。。。)
