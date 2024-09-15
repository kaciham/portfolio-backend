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

        // Send the email using the email service
        await sendEmail(recipientEmail, subject, text, emailContact, contactSecondMail);

        res.status(200).send('Message sent successfully!');

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).send('Failed to send message.');
    }
}

module.exports = { sendContactEmail };