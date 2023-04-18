const nodemailer = require("nodemailer");


async function sendEmail(userEmail, messageForm) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    try {
      const testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Kim Boo 👻" <vinted@example.com>', // sender address
        to: userEmail, // list of receivers
        subject: "Vinted account password changed", // Subject line
        text: messageForm, // plain text body
      //   html: html  //  on devrait envoyer aussi en html body ?
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      
    } catch (err) {
      throw err;
    }
  }
  
  module.exports = sendEmail;