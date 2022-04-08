const express = require('express');
const router = express.Router();
const fs = require('fs');
var nodemailer = require('nodemailer');

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const receiver = req.body.receiver;
    fn = "output.pdf"
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: password
        }
      });
      
      var mailOptions = {
        from: email,
        to: receiver,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [{
            filename: 'output.pdf',
            path: process.cwd() + "\\"+ fn,
            contentType: 'application/pdf'
          }]
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(200).json({
            message: error
        });
        } else {
            res.status(200).json({
                message: 'Email has been sent'
            })
        }
      });
    
});


module.exports = router;
