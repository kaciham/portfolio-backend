const nodemailer = require("nodemailer");

// Use env vars for credentials in production. Fallback kept for local/dev.
const EMAIL_USER = process.env.EMAIL_USER || 'kacihamrounpro@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'szzt tzgp xxfn fdkp';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
    // timeouts (milliseconds) to fail fast on network issues
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
});

// Verify transporter on app start to detect config issues early
transporter.verify().then(() => {
    console.log('Mail transporter ready');
}).catch((err) => {
    console.error('Mail transporter verification failed:', err && err.message ? err.message : err);
});

// Helper to add a hard timeout on top of nodemailer's timeouts
const sendWithTimeout = (mailOptions, timeoutMs = 15000) => {
    return Promise.race([
        transporter.sendMail(mailOptions),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Email send timeout')), timeoutMs)),
    ]);
};

const sendEmail = async (RecipientEmail, subject, htmlContent, emailContact) => {
    const mailOptions = {
        from: emailContact || EMAIL_USER,
        to: RecipientEmail,
        subject: subject,
        html: htmlContent,
    };

    try {
        const info = await sendWithTimeout(mailOptions, 15000);
        console.log(`Email sent: ${info && info.response ? info.response : JSON.stringify(info)}`);
        return info;
    } catch (error) {
        console.error('Error sending email:', error && error.message ? error.message : error);
        throw error;
    }
};

const sendAutoReply = async (RecipientEmail, firstName) => {
    const autoReplyOptions = {
        from: EMAIL_USER,
        to: RecipientEmail,
        subject: 'Merci pour votre demande de contact !',
        html: `
        <!DOCTYPE html>
      <html>
    <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9;">
        <table style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0;">
            <tr>
                <td>
                    <h2 style="color: #0073e6;">Bonjour ${firstName},</h2>
                    <p style="font-size: 16px; color: #555;">
                        Merci pour votre message ! Votre demande a bien été reçue, je reviendrai vers vous dès que possible.
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Cordialement, <br> Kaci HAMROUN
                    </p>
                    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                    <p style="font-size: 12px; color: #999;">Ceci est une réponse automatique. Merci de ne pas répondre à cet e-mail.</p>
                </td>
            </tr>
        </table>
    </body>
</html>
`
    };

    try {
        const info = await sendWithTimeout(autoReplyOptions, 15000);
        console.log(`Auto-reply sent: ${info && info.response ? info.response : JSON.stringify(info)}`);
        return info;
    } catch (error) {
        console.error('Error sending auto-reply email:', error && error.message ? error.message : error);
        throw error;
    }
};

module.exports = { sendEmail, sendAutoReply };