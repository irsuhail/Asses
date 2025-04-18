const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/sendemail', async (req, res) => {
  try {
    // Set up transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email details
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [`irsuhail2000@gmail.com`, `venugopal.burli@masaischool.com`],
      subject: 'Test Email from NEM Student',
      text: 'This is a testing Mail sent by NEM student, no need to reply.'
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('Email has been sent!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
