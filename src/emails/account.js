const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'info@andydaw.com',
        subject: 'Welcome',
        text: `Welcome to the app, ${name}. Let me know how you get along`

    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'info@andydaw.com',
        subject: 'Sera, sera ... ??',
        text: `Please dont break up with us, ${name}.. haha just kidding .. seriously though we can do better ... jokes cyah ... unless?`

    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}