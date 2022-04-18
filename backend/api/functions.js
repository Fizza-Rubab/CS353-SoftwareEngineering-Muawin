const expect = require('chai').expect;
var assert = require('assert');
const request = require('request');
const sinon = require('sinon');
var mocha = require('mocha')

function getStudents(classId, termId){
    // query would be run here to fetch all students 
    return {Class: "5A", Term: "2021", Students: [{Id: 2423, Name:"Fakeha", Email:"fk@gmail.com"} , {Id: 3142, Name:"Shamsa", Email:"sd06162@st.habib.edu.pk"},
    {Id: 5432, Name:"Aiman", Email:"aiman.umme39@gmail.com"}, {Id: 5483, Name:"Ruhama", Email:"rn06169@st.habib.edu.pk"}, {Id: 8746, Name:"Aumaima", Email:"ar06173@st.habib.edu.pk"}, 
    {Id: 6543, Name:"Marium", Email:"mr06187@st.habib.edu.pk"},
    {Id: 3564, Name:"Fizza", Email:"fr06161@st.habib.edu.pk" }, {Id: 5948, Name:"Adnan", Email:"aa06204@st.habib.edu.pk"}, 
    {Id: 4634, Name:"Mubaraka", Email:"ms06171@st.habib.edu.pk"}, {Id: 3984, Name:"Sameer", Email:"sp05565@st.habib.edu.pk"}]}
}

function getCourses(classId, termId){
    // query would be run here to fetch all courses
    return {Class: "5A", Term: "2021", Courses: {1: "Maths", 2: "English", 3: "Pakistan Studies", 4:"Urdu", 5:"Science", 6:"Islamiat"}};
}

function getAttendanceToday(classId, termId){
    // query would be run here to fetch daily attendance record
    return {2423: "P", 3142:"P", 5432:"P", 5483: "P", 8746: "P", 6543: "A", 3564: "P", 5948: "A", 4634: "P", 3984: "P"}

}


function getGrades(studentID, courseID){
    // query would be run here to fetch all courses
    Grades = {A1:78, A2:85, Midterm:86, A3:90, Final:96 }; // name would be fetched by id for every student
    return Grades;
}



module.exports = { getStudents, getCourses, getGrades, getAttendanceToday}; 