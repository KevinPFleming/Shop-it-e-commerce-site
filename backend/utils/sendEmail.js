const nodemailer = require('nodemailer');
const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const message = {
        // Angle Brackets show the email
        from: `${process.env.SMTP_FROM_NAME } <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.sendEmail,
        subject: options.subject,
        text: options.message
    }
    await transporter.sendEmail(message);
}

module.exports = sendEmail;