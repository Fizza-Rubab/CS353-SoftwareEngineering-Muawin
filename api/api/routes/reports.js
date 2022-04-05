const express = require('express');
const router = express.Router();


// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, res, next) => {
    const classId = req.body.classId;
    const termId = req.body.termId;

    res.status(200).json({
        message: 'following parameters will be used to get term grades for students from database',
        classId: classId,
        termId: termId
    });

});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'students post'
    });

});

module.exports = router;
