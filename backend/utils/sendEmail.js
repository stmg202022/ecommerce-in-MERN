const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  //CREATE TRANSPORTER
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMPT_EMAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  //CREATE MAILOPTIONS
  const mailOptions = {
    from: process.env.SMPT_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
