const nodemailer = require("nodemailer");
const dotnev = require("dotenv");
dotnev.config();
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      Port: 587,
      secure: true,
      tls: { rejectUnauthorized: false },
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to: to,
        text: "",
        subject: `Account activation on localsite`,
        html: `
      <div>
        <h1>Account activation</h1>
        <a href=${link}>
        <button
         style="padding:.5rem 1rem; 
          background-color: 
          transparent; border: 
          1px solid green; 
          border-radius: 5px">
          Click to Activate
        </button>
        </a>
      </div>
      `,
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = new MailService();
