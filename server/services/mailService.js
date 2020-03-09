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

function verifyAccountMail(mailOptions) {
  console.log("verifyAccountMail() call");
  
    transporter.sendMail({
    to: mailOptions.email,
    subject: "verfiy account for FaceLook",
    html: `<p>please verify your account in http://localhost:4200/login/${mailOptions._id}</p>`
  });
}

function forgotPasswordMail(mailOptions) {
  console.log("forgotPasswordMail() call",mailOptions);
  
    transporter.sendMail({
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
