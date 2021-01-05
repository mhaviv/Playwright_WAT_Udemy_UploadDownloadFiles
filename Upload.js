const { chromium } = require('playwright');
const expect = require('expect');

(async() => {
    const browser = await chromium.launch({ headless: false, slowmo: 50 })
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html')

    await page.setInputFiles('input[type="file"]', './pdf-test.pdf') // takes in selector and file to be uploaded

    await page.click('input[type="submit"]')

    const html = await page.innerHTML('p') // await for a p element
    expect(html).toMatch("You've uploaded a file.") // expecting it to match the message on file upload complete page

    await browser.close()
}) ()