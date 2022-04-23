const express = require('express');
const router = express.Router();
const functions = require("../functions.js");

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, res, next) => {
    const email = req.query.email;
    const password = req.query.password;
    console.log(email)
    if (functions.validateTeacher(email, password))
        res.status(200).json({message:"Teacher is Validated. You have been logged in."});  
    else
    res.status(403).json({message:"Please enter correct credentials"});   
    })
    ;
  
  
module.exports = router;
  