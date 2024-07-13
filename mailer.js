const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'urvalpanchal@gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'urvalpanchal@gmail.com',
    pass: ''
  }
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'urvalpanchal@gmail.com',
    to,
    subject,
    text
  }
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('error while sending email');
  }
}



module.exports = sendMail;