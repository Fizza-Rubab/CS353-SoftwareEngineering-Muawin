//import { getStudents } from "../functions.js";
const data = require("../functions.js");

const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit-table');
const fs = require('fs');
const { strike } = require("pdfkit");

// api endpoint paramters for get request for term end report : classId, termId
router.get('/', (req, res, next) => {
    const classId = req.query.classId;
    const termId = req.query.termId;
    console.log(classId,  termId);

    students = data.getStudents(classId, termId);
    courses = data.getCourses(classId, termId);
    if (courses=="Incorrect classId" || courses=="Incorrect termId"){
      res.status(401).json(courses);
      return;
    }

    if (students=="Incorrect classId" || courses=="Incorrect termId"){
      res.status(401).json(courses);
      return;
    }


    st = Object.keys(students.Students).length;
    cr = Object.keys(courses.Courses).length;
    const Grades = {};

    for (let i = 0; i < st; i++) {
      var name = students.Students[i].Name;
      Grades[name] = {};
      for (let j = 0; j< cr; j++) {
        grades = data.getGrades(students.Students[i].Id, j);
        course = courses.Courses[j].Name;
        Grades[name][course] = {};
        Grades[name][course] =  grades;
      }
    }

    for (let i = 0; i < st; i++){
      var Stname = students.Students[i].Name;
      var idfetch = students.Students[i].Id;
        

      const doc = new PDFDocument();
      const pdfName = (Stname+'-'+idfetch).toString(); 
      doc.fontSize(20);
      doc.font('Helvetica-Bold').text(`Term Report`, 245, 35);

      doc.fontSize(14);
      doc.font('Helvetica').text(Stname+' - '+idfetch, 100, 65  );

      // Pipe its output somewhere, like to a file or HTTP response
      // See below for browser usage
      doc.pipe(fs.createWriteStream('G:\\SEM 6\\SOFTWARE ENGINEERING\\project\\Muawin-SE\\backend\\reports\\'+pdfName+'.pdf'));
      const table = {
        // title: ,
        // subtitle:doc.font('Times-Roman').text(Stname, 270, 50),
        headers: [
          { label:"Course", property: 'name', width:60, align: 'center',renderer: null },
          { label:"Test 1", property: 'marks1', width: 60, align: 'center', renderer: null }, 
          { label:"Test 2", property: 'marks2', width: 60, align: 'center', renderer: null }, 
          { label:"Midterm", property: 'marks3', width: 60, align: 'center', renderer: null }, 
          { label:"Test 3", property: 'marks4', width: 60, align: 'center', renderer: null }, 
          { label:"Final", property: 'marks5', width: 60, align: 'center',  renderer: null },
          {label: "Percentage", property: 'percentage', width: 60, align: 'center',  renderer: null }, //(value, indexColumn, indexRow, row) => { return value*100}},
        ],
        datas: [ ]
      };

      for (let k = 0; k< cr; k++) {
        table.datas.push({
          name: courses.Courses[k].Name, 
          marks1: Grades[Stname][courses.Courses[k].Name].A1, 
          marks2: Grades[Stname][courses.Courses[k].Name].A2, 
          marks3: Grades[Stname][courses.Courses[k].Name].Midterm, 
          marks4: Grades[Stname][courses.Courses[k].Name].A3, 
          marks5: Grades[Stname][courses.Courses[k].Name].Final,
          percentage: ((Grades[Stname][courses.Courses[k].Name].A1*0.15) + (Grades[Stname][courses.Courses[k].Name].A2*0.15) + (Grades[Stname][courses.Courses[k].Name].A3*0.15) + (Grades[Stname][courses.Courses[k].Name].Midterm*0.25) + (Grades[Stname][courses.Courses[k].Name].Final*0.30)), 
        });
       }
       
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(10);
          indexColumn === 0 && doc.addBackground(rectRow, 'white', 0.15);
        },
          width:40,
          height:50,
          x:100,
          y:100
      });
    
    doc.end();
    }

    
 

    res.status(200).json(Grades);

});


module.exports = router;
