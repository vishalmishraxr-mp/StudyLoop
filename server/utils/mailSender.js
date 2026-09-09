const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const mailSender = async (email, title, body) => {
    try {
        console.log("MAIL SENDER CALLED");
        console.log("Sending email to:", email);

        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "StudyLoop",
                email: "sakshi.shukl178@gmail.com",
            },
            to: [
                {
                    email: email,
                },
            ],
            subject: title,
            htmlContent: body,
        });

        console.log("EMAIL SENT:", response.messageId);

        return response;

    } catch (error) {
        console.error("MAIL ERROR:", error);
        throw error;
    }
};

module.exports = mailSender;