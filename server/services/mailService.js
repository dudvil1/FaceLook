const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dudvil1@gmail.com",
    pass: "hfvndvoetwhkwwgw"
  },
  tls: {
    rejectUnauthorized: false
}
});

async function verifyAccountMail(mailOptions) {
  console.log("verifyAccountMail() call");
  
 await transporter.sendMail({
    to: mailOptions.email,
    subject: "verfiy account for FaceLook",
    html: `<p>please verify your account in http://localhost:4200/login/${mailOptions._id}</p>`
  });
}

async function forgotPasswordMail(mailOptions) {
  console.log("forgotPasswordMail() call",mailOptions);
  
    await transporter.sendMail({
    to: mailOptions.email,
    subject: "reset code for FaceLook",
    html: `<p>your Reset Code To Your password is ${mailOptions.resetCode}</p> 
           <p>please Change it in: http://localhost:4200/forgetpassword/${mailOptions._id}</p>`
  });
}

module.exports = {
  verifyAccountMail,
  forgotPasswordMail
};
