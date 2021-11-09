const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      text: "",
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to: to,
        text: "",
        subject: `Account activation on http://localhost:3000`,
        html: `
      <div>
        <h1>Account activation</h1>
        <a href=${link}>${link}</a>
      </div>
      `,
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new MailService();
