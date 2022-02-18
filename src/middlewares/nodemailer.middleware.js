import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendEmail = async (mailId, link) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: mailId,
    subject: 'Reset password request',
    html: ` <div class="reset_password">
    <p>Hi!</p>
    <p>Here is the link to reset password: <a href=${link} target="_blank"> click here</a></p>
    <p>Thanks</p>
    </div>`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email Sent Successfully');
      return info.response;
    }
  });
};
