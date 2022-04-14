//import { getStudents } from "../functions.js";
const data = require("../functions.js");

const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit-table');
const fs = require('fs');

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, res, next) => {
    const classId = req.query.classId;
    const termId = req.query.termId;
    console.log(classId,  termId);

    students = data.getStudents(classId, termId);
    courses = data.getCourses(classId, termId);

    st = Object.keys(students.Students).length;
    cr = Object.keys(courses.Courses).length;
    const Grades = {};

    for (let i = 0; i < st; i++) {
      var name = students.Students[i].Name;
      Grades[name] = {};
      for (let j = 0; j< cr; j++) {
        grades = data.getGrades(students.Students[i].Id, j);
        course = courses.Courses[j];
        Grades[name][course] = {}
        Grades[name][course] =  grades;
      }
    }

    for (let i = 1; i <= 1; i++){
      var name = students.Students[i].Name;
        

      const doc = new PDFDocument();

      // Pipe its output somewhere, like to a file or HTTP response
      // See below for browser usage
      doc.pipe(fs.createWriteStream('G:\\SEM 6\\SOFTWARE ENGINEERING\\project\\Muawin-SE\\backend\\reports\\output.pdf'));
      const table = {
        title: "Term End Report",
        subtitle: name,
        headers: [
          { label:"Course", property: 'name', width: 60, renderer: null },
          { label:"Test 1", property: 'description', width: 150, renderer: null }, 
          { label:"Test 2", property: 'price1', width: 100, renderer: null }, 
          { label:"Midterm", property: 'price2', width: 100, renderer: null }, 
          { label:"Test 3", property: 'price3', width: 80, renderer: null }, 
          { label:"Final", property: 'price4', width: 43, 
            renderer: (value, indexColumn, indexRow, row) => { return `U$ ${Number(value).toFixed(2)}` } 
          },
        ],
        // complex data
        datas: [
          { 
            name: 'Name 1', 
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis ante in laoreet egestas. ', 
            price1: '$1', 
            price3: '$ 3', 
            price2: '$2', 
            price4: '4', 
          },
          { 
            options: { fontSize: 10, separation: true},
            name: 'bold:Name 2', 
            description: 'bold:Lorem ipsum dolor.', 
            price1: 'bold:$1', 
            price3: { 
              label: 'PRICE $3', options: { fontSize: 12 } 
            }, 
            price2: '$2', 
            price4: '4', 
          },
          // {...},
        ],
        // simeple data
        rows: [
          [
            "Apple",
            "Nullam ut facilisis mi. Nunc dignissim ex ac vulputate facilisis.",
            "$ 105,99",
            "$ 105,99",
            "$ 105,99",
            "105.99",
          ],
          // [...],
        ],
      };
    
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, 'blue', 0.15);
        },
          width:20,
          height:40,
          x:30,
          y:40
      });
    
    doc.end();
    }

    
 

    res.status(200).json(Grades);

});


module.exports = router;
