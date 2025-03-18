const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT || 587, // Use default port 587 if not provided
            service: process.env.SMPT_SERVICE,
            secure: false, // STARTTLS
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false, // Prevent self-signed certificate issues
            },
        });

        const mailOptions = {
            from: `Ecommerce Support <${process.env.SMPT_MAIL}>`, // Better sender format
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (error) {
        console.error("Error sending email: ", error);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendEmail;