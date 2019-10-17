import config from '../config'

const mailgun = require('mailgun-js')({
  apiKey: config.API_NODE_MAILER_KEY,
  domain: config.API_NODE_MAILER_DOMAIN,
})

export const sendResetPasswordEmail = async to => {
  const data = {
    from: 'hypertube@' + config.API_NODE_MAILER_DOMAIN,
    to,
    subject: 'Reinit password',
    text: 'To reainitialize your mail go here: ',
    html: '<b>To reainitialize your mail go here: </b>',
  }
  return await mailgun.messages().send(data, function (error, body) {
    console.log(body)
  })
}
