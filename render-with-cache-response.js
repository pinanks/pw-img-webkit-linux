const { webkit } = require('@playwright/test');
const cache = require('./cache.json');

(async () => {
    const html = `
        <!DOCTYPE html>
        <html>
        <head><base href="https://www.example.com/"></head>
        <body><img src="/sample.jpg"></body>
        </html>
    `
    const browser = await webkit.launch({headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.route('**/*', async (route, request) => {
        const url = request.url();
        
        if (cache[url]) {
            const cachedResource = cache[url];
            bodyBuffer = Buffer.from(cachedResource.body, 'base64');
            console.log(`Handling request ${url}\n - response from cache`);
            await route.fulfill({
                status: 200,
                headers: {
                    'Content-Type': cachedResource.type,
                },
                body: bodyBuffer,
            });
        } else {
            // If not in the cache, just continue the request
            console.log(`Handling request ${url}`);
            await route.continue();
        }
    });

    await page.setContent(html, { waitUntil: 'load'});
    await page.waitForTimeout(5000);
    await page.screenshot({path: `./render-with-cache-response-ss.png`, fullPage: true});
    console.log(`SS taken`);

    await page.close();
    await context.close();
    await browser.close();
})();