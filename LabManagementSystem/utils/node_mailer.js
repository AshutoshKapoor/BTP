var nodemailer = require('nodemailer');

const nodemail = (send_to,body) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ketulpatel4000@gmail.com',
          pass: '55star55'
        }
      });
      
      var mailOptions = {
        from: 'ketulpatel4000@gmail.com',
        to: send_to,
        subject: 'Do not reply',
        text: body
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = nodemail

