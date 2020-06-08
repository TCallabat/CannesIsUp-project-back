const api = require("../api.json")

const nodemailer = require("nodemailer");

const sendMail = async (email, subject, message) => {
    let transporter = nodemailer.createTransport({
        host: api.email.host,
        port: api.email.port,
        secure: api.email.secure,
        auth: {
            user: api.email.user,
            pass: api.email.pass,
        },
    });
    return await transporter.sendMail({
        from: api.email.sender,
        to: email,
        subject: subject,
        html: message
    });
};

module.exports = sendMail;

