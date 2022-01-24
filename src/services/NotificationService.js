// web_scraper/src/services/NotificationService.js

'use strict'

require('dotenv').config()
const config = require('../config')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
})

module.exports = {
    async sendEmailNotif (text) {
        console.log('Sending email notification...')
        await transporter.sendMail({
            from: process.env.GUSER,
            to: process.env.GUSER,
            subject: `FFXIV Website Update!`,
            text: `${text}\n Email sent from web_scraper :)`
        })
    },
    async sendErrorNotification (err) {
        console.log('Sending error notification...')
        console.log(err)
        await transporter.sendMail({
            from: process.env.GUSER,
            to: process.env.GUSER,
            subject: `Web_Scraper Err`,
            text: `Err: ${err}`
        })
    }
}