// web_scraper/src/config.js
'use strict'
require('dotenv').config() // Can use --require (-r) command line option to preload dotenv
const emailUser = process.env.GUSER
const emailPass = process.env.GPASS

module.exports = {
    uri: `https://freetrial.finalfantasyxiv.com/`,
    email: {
        user: emailUser,
        pass: emailPass
    },
    interval: 5 * 1000 * 60
}