const functions = require("../functions.js");
const express = require('express');
const router = express.Router();
// const PDFDocument = require('pdfkit-table');
var fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

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
    var docDefinition = {
      content: [
        {text:'Course Statistics Report for ' + courseName,
        fontSize: 27, alignment:"center" },
        '\n\nThis is an extensive report that is to be shared with the management to include details mean standard deviation of all assignments and course work.',
        {text:'\nAssignment A1', FontFace: 2, fontSize: 19 },
        {text: 'Average: ' + averageA1},
        {text:'\nAssignment A2', FontFace: 2, fontSize: 19 },
        {text: 'Average: ' + averageA2},
        {text:'\nAssignment A3', FontFace: 2, fontSize: 19 },
        {text: 'Average: ' + averageA3},
        {text:'\nMidterm Exam', FontFace: 2, fontSize: 19 },
        {text: 'Average: ' + averageMidterm},
        {text:'\nFinal Exam', FontFace: 2, fontSize: 19 },
        {text: 'Average: ' + averageFinal},
        "\n The course has been a successful venture. We hope to hear your feedback soon"
      ],
      defaultStyle: {
        font: 'Times'
      }

    };
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream("../Statistic Reports/" + courseName+'-Statistics Report.pdf'));
    pdfDoc.end();
    

    res.status(200).json("Report Created");

});


module.exports = router;
