const { webkit } = require('@playwright/test');
const { readFileSync } = require('fs');

(async () => {
    const html = readFileSync(`imgbase64.html`, { encoding: 'utf-8'});
    const browser = await webkit.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.setContent(html, { waitUntil: 'load'});
    await page.waitForTimeout(5000);
    await page.screenshot({path: `./render-with-base64-ss.png`, fullPage: true});
    console.log(`SS taken`);

    await page.close();
    await context.close();
    await browser.close();
})();