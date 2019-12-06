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
      subject: 'Hypertube: Reset your password 👀',
      text: `To reset your password, follow the instructions on this website : ${resetLink}`,
      html: `<p>\`To reset your password, follow the instructions on this website : <a href="${resetLink}">Reset password</a></p>`,
    }

    mailgun.messages().send(mailData, (err, body) => {
      if (err) return reject(err)
      resolve(body)
    })
  })
