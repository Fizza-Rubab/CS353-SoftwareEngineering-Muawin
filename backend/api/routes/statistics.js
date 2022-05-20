const functions = require("../functions.js");
const express = require('express');
const router = express.Router();
// const PDFDocument = require('pdfkit-table');
var fonts = {
  Roboto:{
    normal: "../fonts/Roboto-Regular.ttf",
    bold: '../fonts/Roboto-Bold.ttf',
    italics: '../fonts/Roboto-Italic.ttf',
    bolditalics: '../fonts/Roboto-BoldItalic.ttf'

  },
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

router.post('/', (req, res, next) => {
    const classId = req.body.classId;
    const termId = req.body.termId;
    var courses = functions.getCourses(classId, termId).Courses;
    console.log(courses)
    courses.map((course) =>{
    A1 = [];
    A2 = [];
    A3 = [];
    Final = [];
    Midterm = [];
    s = functions.getStudents(classId, termId);
    if (s=="Incorrect classId" || s=="Incorrect termId"){
      res.status(401).json(s);
      return;
    }
    students = s.Students;
    for (let i = 1; i <= students.length; i++) {
        grades = functions.getGrades(students.Id, course);
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
        {text:'Course Statistics Report for ' + course.Name,
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
        "\n The course has been a successful venture. We hope to hear your feedback soon\n",
        'The following table has nothing more than a body array',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              ['One value goes here', 'Another one here', 'OK?']
            ]
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        font: 'Times'
      }

    };
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream("../Statistic Reports/" + course.Name+'-Statistics Report.pdf'));
    pdfDoc.end();
    });

    res.status(200).json("Report Created");

});


module.exports = router;
