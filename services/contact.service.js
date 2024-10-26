const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'kacihamrounpro@gmail.com',
        pass: 'szzt tzgp xxfn fdkp'
    },
    tls: {
        rejectUnauthorized: false
    }
}); 

const sendEmail = async (RecipientEmail, subject, htmlContent, emailContact) => {

    const mailOptions = {
        from: emailContact,
        to: RecipientEmail,
        subject: subject,
        html: htmlContent
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