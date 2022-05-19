const { verify } = require('crypto');
const express = require('express');
const router = express.Router();
const fs = require('fs');
var nodemailer = require('nodemailer');
const request = require('request');
const functions = require("../functions.js");

router.post('/', (req, res, next) => {
    const classId = req.body.classId;
    const termId = req.body.termId;
    const message = req.body.message;
    const subject= req.body.subject;
    const email = req.body.email;
    const password = req.body.password;
    var courses = functions.getCourses(classId, termId);
    if (courses=="Incorrect classId" || courses=="Incorrect termId"){
      res.status(401).json(courses);
      return;
    }
    s = functions.getStudents(classId, termId);
    if (s=="Incorrect classId" || s=="Incorrect termId"){
      res.status(401).json(s);
      return;
    }
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: email,
          pass: password
        }
    });
    var mailOptions = {
        from: email,
        to: email,
        subject: 'testemail',
        text: 'test email'
      };                  
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
        resp.status(401).json('Incorrect Credentials')
    } else {
        console.log('Correct credentials')
    }
    });
      
    students = s.Students;
    students.forEach(sendEmail);
    function sendEmail(s, index){
        receiver = s.Email
        var mailOptions = {
        from: email,
        to: receiver,
        subject: subject,
        text: message,
        };                  
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res
        } else {
            console.log('Email has been sent')
        }
        });
    }
    res.status(200).json({message: 'Emails have been sent'});
});


module.exports = router;
