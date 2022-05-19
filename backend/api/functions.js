function getStudents(classId, termId){
    // query would be run here to fetch all students 
    result =  {Class: "5A", Term: "2021", Students: [{Id: 2423, Name:"Fakeha", Email:"fk@gmail.com"} , {Id: 3142, Name:"Shamsa", Email:"sd06162@st.habib.edu.pk"},
    {Id: 5432, Name:"Aiman", Email:"aiman.umme39@gmail.com"}, {Id: 5483, Name:"Ruhama", Email:"rn06169@st.habib.edu.pk"}, {Id: 8746, Name:"Aumaima", Email:"ar06173@st.habib.edu.pk"}, 
    {Id: 6543, Name:"Marium", Email:"mr06187@st.habib.edu.pk"},
    {Id: 3564, Name:"Fizza", Email:"fr06161@st.habib.edu.pk" }, {Id: 5948, Name:"Adnan", Email:"aa06204@st.habib.edu.pk"}, 
    {Id: 4634, Name:"Mubaraka", Email:"ms06171@st.habib.edu.pk"}, {Id: 3984, Name:"Sameer", Email:"sp05565@st.habib.edu.pk"}]}
    if (classId!=result.Class)
        return "Incorrect classId"
    else if (termId!=result.Term)
        return "Incorrect termId"
    else
        return result
}
function getClasses(){
    console.log([{class: "5A", term: 2021}, {class: "3B", term: 2020}, {class:"4C", term: 2021}])
    return [{class: "5A", term: 2021}, {class: "3B", term: 2020}, {class:"4C", term: 2021}]
}
function getCourses(classId, termId){
    // query would be run here to fetch all courses
    result = {Class: "5A", Term: "2021", Courses: [{Id:1, Name: "Maths"}, {Id:2, Name: "English"}, {Id:3, Name: "Urdu"}, {Id:4, Name: "Pakistan Studies"}, {Id:5, Name: "Islamiat"}, {Id:6, Name: "Science"}]};
    if (classId!=result.Class)
        return "Incorrect classId"
    else if (termId!=result.Term)
        return "Incorrect termId"
    else
        return result
}


function getAttendanceToday(classId, termId){
    // query would be run here to fetch daily attendance record
    return {2423: "P", 3142:"P", 5432:"A", 5483: "P", 8746: "P", 6543: "P", 3564: "A", 5948: "P", 4634: "P", 3984: "P"}

}


function getGrades(studentID, courseID){
    // query would be run here to fetch all courses
    Grades = {A1:78, A2:85, Midterm:86, A3:90, Final:96 }; // name would be fetched by id for every student
    return Grades;
}

function validateTeacher(email, password){
    if (email=="teacher@st.habib.edu.pk" && password=="teacher")
        return true;
    else
        return false;
}

module.exports = { getStudents, getCourses, getGrades, getAttendanceToday, validateTeacher, getClasses}; 
