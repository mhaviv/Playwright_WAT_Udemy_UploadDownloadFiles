const { chromium } = require('playwright');
const expect = require('expect');

(async() => {
    const browser = await chromium.launch({ headless: false, slowmo: 50 })
    const context = await browser.newContext({ acceptDownloads: true }) // must set this to allow downloads in browser context
    const page = await context.newPage()

    await page.goto('https://github.com/gothinkster/react-redux-realworld-example-app')

    await page.click("summary[class='btn btn-primary']")

    const [ download ] = await Promise.all([
        page.waitForEvent('download'), // wait for the download event to finish
        page.click('.octicon-file-zip') // Click on download zip option
    ])

    const path = await download.path()
    console.log(path)

    download.saveAs('./download.zip') // specify where we want it saved

    await browser.close()
}) ()