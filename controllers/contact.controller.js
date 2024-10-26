const { Portfolio } = require('../models/model')
const { sendEmail } = require('../services/contact.service')

const sendContactEmail = async (req, res) => {


    try {
        const { firstName, lastName, emailContact, text, contactSecondMail } = req.body;
        const portfolio = await Portfolio.find({ email: "kacihamrounpro@gmail.com" });
        if (!portfolio) {
            return res.status(404).send('Portfolio not found.');
        }

        const recipientEmail = "kacihamrounpro@gmail.com"; // Portfolio owner's <email></email>
        const subject = `New Contact Form Submission from ${firstName + " " + lastName} with this email: ${contactSecondMail}`;

        const htmlContent = `
        <!DOCTYPE html>
        <html>
            <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9;">
                <table style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0;">
                    <tr>
                        <td>
                            <h1 style="color: #0073e6;">Contact from ${firstName} ${lastName}</h1>
                            <p style="font-size: 16px; color: #555;">You have received a new message from your portfolio contact form.</p>
                            <p><strong>Email of Secondary Contact:</strong> ${contactSecondMail}</p>
                            <p><strong>Message:</strong></p>
                            <p style="font-size: 16px; color: #333;">${text}</p>
                            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
                            <p style="font-size: 12px; color: #999;">This message was sent from the portfolio contact form. Reply to this email to reach ${firstName} directly at ${emailContact}.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    `;

        // Send the email using the email service
        await sendEmail(recipientEmail, subject, htmlContent, emailContact, contactSecondMail);

        res.status(200).send('Message sent successfully!');

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).send('Failed to send message.');
    }
}

module.exports = { sendContactEmail };