const functions = require("../functions.js");
const express = require('express');
const router = express.Router();
// const PDFDocument = require('pdfkit-table');
var fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  },

  // example of usage fonts in collection
  PingFangSC: {
    normal: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Regular'],
    bold: ['https://example.com/fonts/pingfang.ttc', 'PingFangSC-Semibold'],
  }
}


var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');// const { size } = require("pdfkit/js/page");
// api endpoint paramters for get request for term end report : classId, termId
function getStandardDeviation (array) {
  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n
  return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
}

router.get('/', (req, res, next) => {
    const classId = req.query.classId;
    const termId = req.query.termId;
    const course= req.query.courseId;
    var courses = functions.getCourses(classId, termId);
    var courseName = courses.Courses.find(o=>o.Id==course).Name
    console.log(courseName)
    A1 = [];
    A2 = [];
    A3 = [];
    Final = [];
    Midterm = [];
    students = functions.getStudents(classId, termId).Students;
    for (let i = 1; i <= students.length; i++) {
        grades = functions.getGrades(students.Id, course);
        console.lo
        A1.push(grades.A1)
        A2.push(grades.A2)
        A3.push(grades.A3)
        Midterm.push(grades.Midterm)
        Final.push(grades.Final)
    }
    averageA1 = (A1.reduce((partialSum, a) => partialSum + a, 0))/A1.length;
    averageA2 = (A2.reduce((partialSum, a) => partialSum + a, 0))/A2.length;
    averageA3 = (A3.reduce((partialSum, a) => partialSum + a, 0))/A3.length;
    averageMidterm = (Midterm.reduce((partialSum, a) => partialSum + a, 0))/Midterm.length;
    averageFinal = (Final.reduce((partialSum, a) => partialSum + a, 0))/Final.length;
    console.log(averageA1, averageA2)
    docDefinition = 	{content: [
      {text: 'Tables', style: 'header'},
      courseName,
      'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
      {text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader'},
      'The following table has nothing more than a body array',
      {
        table: {
          body: [
            ['Column 1', 'Column 2', 'Column 3'],
            ['One value goes here', 'Another one here', 'OK?']
          ]
        }
      }]
    }

    res.status(200).json("Report Created");

});


module.exports = router;
