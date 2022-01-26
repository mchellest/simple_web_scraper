// src/app.js

'use strict'
const config = require('./config')
const ScraperService = require('./services/ScraperService')
const NotificationService = require('./services/NotificationService')

let nowAvailable = ''

async function run () {
    try {
        const scrapedData = await ScraperService.getSiteText()
        console.log(new Date().toString(), `Currently available: ${scrapedData.avail}`)
        if(nowAvailable.length === 0) {
            nowAvailable = scrapedData.avail
        }
        else if(nowAvailable !== scrapedData.avail) {
            nowAvailable = scrapedData.avail
            await NotificationService.sendEmailNotif(scrapedData.text)
        }
        
        console.log('Next check: ', new Date(Date.now() + config.interval).toString())
        setTimeout(run, config.interval)
    }
    catch (err) {
        try {
            await NotificationService.sendErrorNotification(err)
        }
        catch (err) {
            console.log('Sending error notification failed')
        }

        console.error(err)
        console.log('Program exit')
        process.exitCode = 1
    }
}

run();