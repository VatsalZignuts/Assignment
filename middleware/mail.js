const nodemailer = require("nodemailer");



let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5c3464db680865" , 
      pass: "5dd0a9d949c9ba" , 
    }
  });



module.exports = { transporter }