const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendApplicationEmail = async (to, job, adminName) => {
  const mailOptions = {
    from: `"Job Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject: `You've applied for: ${job.title},
    html: 
    <h3>Application Confirmation</h3>
      <p>Dear Candidate,</p>
      <p>You have successfully applied for the job: <strong>${job.title}</strong>.</p>
      <p><strong>Description:</strong> ${job.description}</p>
      <p><strong>Posted by:</strong> ${adminName}</p>
      <p><strong>Applied At:</strong> ${new Date().toLocaleString()}</p>
      <hr />
      <p>Thank you for using our Job Portal.</p>`,
    };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};