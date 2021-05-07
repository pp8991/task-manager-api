const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'prakharpandey96@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with this app`
    })
}

const sendCancelationEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'prakharpandey96@gmail.com',
        subject: 'Sorry to see you go.Goodbye!',
        text: `Thanks for using our service ${name}. Please let use know how can we improve our services`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}