const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kacihamroun@outlook.com',
        pass: '#KaciKaci59'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (RecipientEmail, subject, text, emailContact) => {
    const mailOptions = {
        from: emailContact,
        to: RecipientEmail,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendEmail };