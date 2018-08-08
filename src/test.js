const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        // executablePath可设置chromium的路径
        // ????这里直接看 @node_module\puppeteer\BrowserFetcher.js 找到默认路径@\node_modules\puppeteer\.local-chromium\win64-575458\chrome-win32\chrome.exe
        // executablePath: './chromium/chrome.exe',   
        headless: false
    });
    const page = await browser.newPage();
    await page.goto('https://music.163.com/');
    await page.screenshot({ path: 'music.png' });
    browser.close();
})();