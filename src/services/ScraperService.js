// web_scraper/src/services/ScraperService.js

'use strict'
const config = require('../config')
const cheerio = require('cheerio')
const rp = require('request-promise')

module.exports = {
    async getSiteText () {
        console.log('Getting site text...')
        const response = await rp({
            uri: config.uri
        })
        const $ = cheerio.load(response)
        // let divList = document.querySelectorAll('.container div')
        let text = $('.container div').text().trim();
        console.log(text);

        if (text == ''){
            throw new Error('Site text was not found')
        } 
        else{
            if (text.includes('UNAVAILABLE')) return {"avail": false, "text": ''}
            else return {"avail": true, "text": text}
        }
    }
}