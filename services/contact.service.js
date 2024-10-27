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

const sendAutoReply = async (RecipientEmail, firstName) => {
    const autoReplyOptions = {
        from: 'kacihamrounpro@gmail.com', // Your email
        to: RecipientEmail,
        subject: 'Thank you for your message!',
        html: `
        <!DOCTYPE html>
      <html>
    <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9;">
        <table style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0;">
            <tr>
                <td>
                    <h2 style="color: #0073e6;">Bonjour ${firstName},</h2>
                    <p style="font-size: 16px; color: #555;">
                        Merci pour votre message ! Votre demande a bien été reçu, je reviendrai vers vous dès que possible.
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
        const info = await transporter.sendMail(autoReplyOptions);
        console.log(`Auto-reply sent: ${info.response}`);
        return info;
    } catch (error) {
        console.error('Error sending auto-reply email:', error);
        throw error;
    }
};


module.exports = { sendEmail, sendAutoReply };