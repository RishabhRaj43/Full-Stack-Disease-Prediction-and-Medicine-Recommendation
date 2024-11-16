import nodemailer from "nodemailer";

const sendEmail = async (email,_, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.APP_EMAIL,
    to: email,
    subject: "Verification Code",
    text: `The Verification code is ${verificationCode}`,
    html: `<h1>The Verification code is ${verificationCode}</h1>
           <p>Please do not share this code with anyone</p>
           <p>It will expire in 1 hour</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    // console.log("Email sent: " + info.response);
  });
};

export default sendEmail;
