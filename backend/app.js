const express = require('express');
const app = express();
const morgan = require('morgan'); //npm install --save morgan
const bodyParser = require('body-parser'); // npm install --save body-parser

const termReportRoute = require('./api/routes/reports');
const feedbackReports = require('./api/routes/feedback');
const absence = require('./api/routes/absence');
const statisticsReport = require('./api/routes/statistics');

app.use(morgan('dev')); // for logs in terminal 
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS ERRORS
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*"); //any url/site instead of *
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    //property that gives us access to the http method used; post, put request
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET');
        return res.status(200).json({});
    }

    next();
});


app.use('/term-reports', termReportRoute);
// app.use('/feedback-reports', feedbackReports);
app.use('/absence', absence);
// app.use('/statistics-report', statisticsReport);

app.use((req, res, next) => {
    const error = new Error('None of the routes were reached');
    error.status = 404;
    next(error);
});

// in case of a DB error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;