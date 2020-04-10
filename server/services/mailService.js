module.exports = (nodeServices) => {
  const { nodemailer } = nodeServices;

  ///set transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });




  async function verifyAccountMail(mailOptions) {
    if (mailOptions) {
      const data = {
        subject: "verfiy account for FaceLook",
        html: `<p>please verify your account in http://localhost:4200/login/${mailOptions._id}</p>`
      }
      await sendMail(mailOptions, data.subject, data.html)
    }
  }

  async function forgotPasswordMail(mailOptions) {
    if (mailOptions) {
      const data = {
        subject: "reset code for FaceLook",
        html: `<p>your Reset Code To Your password is ${mailOptions.resetCode}</p> 
             <p>please Change it in: http://localhost:4200/forgetpassword/${mailOptions._id}</p>`
      }
      await sendMail(mailOptions, data.subject, data.html)
    }
  }

  async function sendMail(mailOptions, subject, html) {
    if (mailOptions.email && mailOptions._id) {
      await transporter.sendMail({
        to: mailOptions.email,
        subject: subject,
        html: html
      });
    }
  }
  return {
    verifyAccountMail,
    forgotPasswordMail
  };
}
