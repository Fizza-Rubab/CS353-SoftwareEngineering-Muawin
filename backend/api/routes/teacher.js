const express = require('express');
const router = express.Router();
const functions = require("../functions.js");

// api endpoint paramters for get request for term end report : classId, termId
router.post('/', (req, res, next) => {
    console.log("I m here")
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)
    if (functions.validateTeacher(email, password))
        res.status(200).json({message:"Teacher is Validated. You have been logged in."});  
    else
    res.status(403).json({message:"Please enter correct credentials"});   
    })
    ;
  
router.get('/classes', (req, res, next) => {
    // if (functions.validateTeacher(email, password))
    let classes = functions.getClasses()
    res.status(200).json(classes);  
    // else
    // res.status(403).json({message:"Please enter correct credentials"});   
    // })
});
  
  
module.exports = router;
  