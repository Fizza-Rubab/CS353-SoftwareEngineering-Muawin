const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'students'
    });

});


router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'students post'
    });

});

// router.get('/:studentId', (req, res, next) =>{
//     const id = req.params.studentId;
//     if (id == 0)
// });


module.exports = router;
