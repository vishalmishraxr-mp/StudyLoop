const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const mailSender = async (email, title, body) => {
    try {
        console.log(" MAIL SENDER CALLED");
        console.log("Sending email to:", email);

        const { data, error } = await resend.emails.send({
            from: "sakshi.shukl178@gmail.com",
            to: email,
            subject: title,
            html: body,
        });

        if (error) {
            throw new Error(error.message);
        }

        console.log("EMAIL SENT:", data?.id);

        return data;
    } catch (error) {
        console.error("MAIL ERROR:", error);
        throw error;
    }
};

module.exports = mailSender;