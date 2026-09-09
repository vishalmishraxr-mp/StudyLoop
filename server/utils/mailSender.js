const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT || 587),

    secure:
        String(process.env.MAIL_SECURE || "false") === "true",

    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const mailSender = async (email, title, body) => {
    try {
        console.log("📧 MAIL SENDER CALLED");
        console.log("Sending email to:", email);

        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM || process.env.MAIL_USER,
            to: email,
            subject: title,
            html: body,
        });

        console.log("EMAIL SENT:", info.messageId);

        return info;

    } catch (error) {
        console.error("MAIL ERROR:", error);
        throw error;
    }
};

module.exports = mailSender;