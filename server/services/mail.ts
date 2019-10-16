import * as nodemailer from 'nodemailer'

let mailerAccout = null
let transporter = null

export const configMailer = async () => {
  if (!transporter) {
    mailerAccout = await nodemailer.createTestAccount()

    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: mailerAccout.user, // generated ethereal user
        pass: mailerAccout.pass, // generated ethereal password
      },
    })
  }
}

export const sendResetPasswordEmail = async to => {
  await configMailer()
  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  })
}
