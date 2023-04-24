const nodemailer = require("nodemailer");


async function sendEmail(userEmail, messageForm) {

    try {  
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MAILGUN_USER,  
          pass: process.env.MAILGUN_PASSWORD, 
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Kim Boo 👻" <vinted@example.com>', // sender address
        to: userEmail, // list of receivers
        subject: messageForm.subjectTitle, // Subject line
        text: messageForm.message,  // plain text body
        // html: html    // can also sent in HTML form
      });    
      // console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>    
      return info;

    } catch (err) {
      throw err;
    }
  }
  
  module.exports = sendEmail;