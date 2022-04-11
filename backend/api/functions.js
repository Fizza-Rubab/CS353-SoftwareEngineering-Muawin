const expect = require('chai').expect;
var assert = require('assert');
const request = require('request');
const sinon = require('sinon');
var mocha = require('mocha')
//var assert = require('chai').assert

// var mock = require('sails-mock-models');
// mock.mockModel(getGrades, 'find', Grades);


function getStudents(classId, termId){
    // query would be run here to fetch all students 
    return {Class: "5A", Term: "2021", Students: {1:{Id: 2423, Name:"Fakeha"} , 2:{Id: 3142, Name:"Shamsa"}, 3:{Id: 5432, Name:"Aiman"}, 4:{Id: 5483, Name:"Ruhama"}, 5:{Id: 8746, Name:"Aumaima"}, 6:{Id: 6543, Name:"Marium"}, 7:{Id: 3564, Name:"Fizza"}, 8:{Id: 5948, Name:"Adnan"}, 9:{Id: 4634, Name:"Mubaraka"}, 10:{Id: 3984, Name:"Sameer"}}}
}

function getCourses(classId, termId){
    // query would be run here to fetch all courses
    return {Class: "5A", Term: "2021", Courses: {1: "Maths", 2:"English", 3:"Pakistan Studies", 4:"Urdu", 5:"Science", 6:"Islamiat"}};
}





function getGrades(studentID, courseID){
    // query would be run here to fetch all courses
    Grades = {A1:78, A2:85, Midterm:86, A3:90, Final:96 }; // name would be fetched by id for every student
    return Grades;
}



module.exports = { getStudents, getCourses, getGrades }; 