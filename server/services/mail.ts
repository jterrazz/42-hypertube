import config from '../config'

const mailgun = require('mailgun-js')({
  apiKey: config.API_NODE_MAILER_KEY,
  domain: config.API_NODE_MAILER_DOMAIN,
})

export const sendResetPasswordEmail = (to, token) =>
  new Promise((resolve, reject) => {
    const resetLink = `${config.CLIENT_URL}/reset-password?token=${token}`

    const mailData = {
      from: 'hypertube@' + config.API_NODE_MAILER_DOMAIN,
      to,
      subject: 'Reinit password',
      text: `To reainitialize your mail go here: ${resetLink}`,
      html: `<b>To change your password click <a href="${resetLink}">here</a></b>`,
    }

    mailgun.messages().send(mailData, (err, body) => {
      if (err) return reject(err)
      resolve(body)
    })
  })
