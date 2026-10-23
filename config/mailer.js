const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendVerificationEmail(toEmail, token) {
  const link = `${process.env.APP_URL}/verify/${token}`; //[cite: 1]
  await transporter.sendMail({
    from: `"Campus Eats" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Verify your Campus Eats account',
    text: `Click to verify your account: ${link}`,
    html: `<p>Click to verify your account: <a href="${link}">${link}</a></p>`,
  });
  console.log(`Verification email sent to ${toEmail}`);
}

async function sendPasswordResetEmail(toEmail, token) {
  const link = `${process.env.APP_URL}/reset-password/${token}`; //[cite: 1]
  await transporter.sendMail({
    from: `"Campus Eats" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset your Campus Eats password',
    text: `Click to reset your password: ${link}`,
    html: `<p>Click to reset your password: <a href="${link}">${link}</a></p>`,
  });
  console.log(`Password reset email sent to ${toEmail}`);
}

module.exports = { 
  sendVerificationEmail, 
  sendPasswordResetEmail 
};