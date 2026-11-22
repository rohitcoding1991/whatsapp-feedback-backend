const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
          port: 587,
          secure: false,
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASS
          }
});

const sendFeedbackEmail = (from, body) => {
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "New WhatsApp Feedback Received",
    text: `New feedback received:\n\nFrom: ${from}\nFeedback: ${body}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendFeedbackEmail };
