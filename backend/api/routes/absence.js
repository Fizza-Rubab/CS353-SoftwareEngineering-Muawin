const express = require('express');
const router = express.Router();
const fs = require('fs');
var nodemailer = require('nodemailer');
const request = require('request');
const functions = require("../functions.js");

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, resp, next) => {
  const email = req.query.email;
  const password = req.query.password;
  const classId = req.query.classId;
  const termId = req.query.termId;
  students = functions.getStudents(classId, termId);
  if (students=="Incorrect classId" || students=="Incorrect termId"){
    res.status(401).json(students);
    return;
  }
  attendance = functions.getAttendanceToday(classId, termId)

  
  // console.log(attendance)
  let url = "https://www.reddit.com/r/popular.json";
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });
  transporter.verify((error)=>{
  if(!error) console.log("Ready to send");
    else {
      console.log(error);
      res.status(401).json("Incorrect Credentials");
      return;
  }
  });
  let options = {json: true};
  request(url, options, (error, res, body) => {
      if (error) {
          console.log(error)
          resp.status(400).json({
                    message: error
                });
      };
      if (!error && res.statusCode == 200) {
        studentsInfo = students.Students;
        studentsInfo.forEach(sendEmail);
        function sendEmail(s, index){
          
          if (attendance[s.Id]=="A")
            {
              receiver = s.Email
              var mailOptions = {
                from: email,
                to: receiver,
                subject: 'Absence Notification for ' + new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                text: 'Dear Parent,\n\nYour child did not attend school today on ' + new Date().toJSON().slice(0,10).replace(/-/g,'/') +'. Kindly ensure ' + s.Name + ' presence tomorrow and submit a leave application.\n\nRegards,\nClass Teacher',
                // attachments: [{
                //     filename: 'output.pdf',
                //     path: process.cwd() + "\\"+ fn,
                //     contentType: 'application/pdf'
                //   }]
              };                  
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  res
                } else {
                  console.log('Emails have been sent')
                }
              });

        }

        }
        resp.status(200).json({message: 'Emails have been sent'});
  };
});
});

module.exports = router;
