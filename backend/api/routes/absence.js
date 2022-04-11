const express = require('express');
const router = express.Router();
const fs = require('fs');
var nodemailer = require('nodemailer');
const request = require('request');

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, resp, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  let url = "https://www.reddit.com/r/popular.json";
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });
  console.log(password)
  let options = {json: true};
  request(url, options, (error, res, body) => {
      if (error) {
          console.log(error)
          resp.status(400).json({
                    message: error
                });
      };
  
      if (!error && res.statusCode == 200) {
        console.log("yay")
        attendanceData = body;
        attendanceData = {"Fizza": {"attendance":"A", "email": "fr06161@st.habib.edu.pk"}, "Aiman": {"attendance":"P", "email": "fizzaa39@gmail.com"}, "Ruhama":{"attendance":"P", "email": "rn06169@st.habib.edu.pk"}}
        for (var key in attendanceData){
          console.log(attendanceData[key])
          if (attendanceData[key]["attendance"]=="A")
            {
              console.log(attendanceData[key])
              var receiver = attendanceData[key]["email"]
                  var mailOptions = {
                    from: email,
                    to: receiver,
                    subject: 'Absence Notification for ' + new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                    text: 'Dear Parent,\n\nYour child did not attend school today on ' + new Date().toJSON().slice(0,10).replace(/-/g,'/') +'. Kindly ensure ' + key + ' presence tomorrow and submit a leave application.\n\nRegards,\nClass Teacher',
                    // attachments: [{
                    //     filename: 'output.pdf',
                    //     path: process.cwd() + "\\"+ fn,
                    //     contentType: 'application/pdf'
                    //   }]
                  };                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('EmailS have been sent')
                    }
                  });

            }

        }
        resp.status(200).json({
                  message: 'Email has been sent'
              });
        };
  });
});


module.exports = router;
