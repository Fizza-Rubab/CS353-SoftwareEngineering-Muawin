const express = require('express');
const app = express();

const termReportRoute = require('./api/routes/reports');
const feedbackReports = require('./api/routes/feedback');
const absence = require('./api/routes/absence');
const statisticsReport = require('./api/routes/statistics');

app.use('/term-reports', termReportRoute);
app.use('/feedback-reports', feedbackReports);
app.use('/absence', absence);
app.use('/statistics-report', statisticsReport);


module.exports = app;