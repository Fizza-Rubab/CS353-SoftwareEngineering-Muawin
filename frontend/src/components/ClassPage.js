import React, { Component, useState,useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import '../App.css';
import axios from 'axios';


const  ClassPage = (props) => {
  const location = useLocation();
  const state = location.state;
  const [subject, setSubject] = useState("Subject")
  const [message, setMessage] = useState("Message/Body")
  const classN = state.class;
  const term = state.term
   // termend = () =>{
  //   data = {classId: state.class, termId:state.email, email:"fizzaa39@gmail.com"}
  //   axios
  // .post('http://localhost:5000/reports', data)
  // .then(res => {
  //   // this.setState({
  //   //   email: '',
  //   //   password:''
  //   // })
  //   alert("Your reports are being generated")
  //   console.log(res);
  // })
  // .catch(err => {
  //   console.log("Error in generating reports!");
  // })
  // }
return (
<div className="Dashboard">
<h1 className="display-4 text-center">Welcome to Class {classN} - {term} </h1>
<div className="card"  style={{backgroundColor: "#FFC107"}}>
  <div className="card-body text-center">
    You can perform the following functions
  </div>
</div>
<div className="card">
  <div className="card-body text-center">
       
  </div>
</div>
<div className='text-center'>
<button type="button" className="btn btn-outline-warning" onClick={()=>{
  let data = {classId: classN, termId:term, email:"fizzaa39@gmail.com"}
  console.log(data)
    axios
  .post('http://localhost:5000/term-reports', data)
  .then(res => {
    alert("Your reports are being generated")
    console.log(res);
  })
  .catch(err => {
    console.log("Error in generating reports!");
  })}} >Download Term End Reports</button>
  <button type="button" className="btn btn-outline-warning" onClick={()=>{
  let data = {classId: classN, termId:term}
  console.log(data)
    axios
  .post('http://localhost:5000/statistics-report', data)
  .then(res => {
    alert("Your reports are being generated")
    console.log(res);
  })
  .catch(err => {
    console.log("Error in generating reports!");
  })}} >Download Course Statistics Reports</button>
<button type="button" className="btn btn-outline-warning" onClick={()=>{
  let data = {classId: classN, termId:term, email:"fizzaa39@gmail.com", password:"Silvermoon123?"}
  console.log(data)
    axios
  .post('http://localhost:5000/absence', data)
  .then(res => {
    alert("Emails have been sent to notify parents")
    console.log(res);
  })
  .catch(err => {
    alert("Error encountered in sending email")
    console.log(err);
  })}}>Notify Attendance</button>
  </div>
  <div className="card">
  <div className="card-body text-center warning">
    Send an announcement to class via email
  </div>
</div>
<div className="container">
<div className="row">
  <div className="col-md-8 m-auto">
<div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Subject'
              name='Subject'
              className='form-control'
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
            />
          </div>
          <br />

          <div className='form-group'>
            <textarea
              type='text'
              placeholder='Message'
              name='Message'
              className='form-control input-large'
              value={message}
              // value={this.state.password}
              onChange={(e)=>setMessage(e.target.value)}
            />
          </div>
          <button
              className="btn btn-outline-warning btn-block mt-4"
              onClick={(e)=> {
                

                let data = {classId: classN, termId:term, email:"fizzaa39@gmail.com", password:"Silvermoon123?", subject:subject, message:message}
                console.log(data)
                  axios
                .post('http://localhost:5000/announcements', data)
                .then(res => {
                  alert("Your announcement has been emailed to all")
                  console.log(res);
                })
                .catch(err => {
                  console.log("Error was encountered in sending announcement");
                })
                setSubject(() => "")
                setMessage(() => "")
              }}
              
          >Send Announcement
          </button>

        </div>

</div>
</div>
</div>
</div>
);
}

// class ClassPage extends Component {
//   constructor() {
//     super();
//     // let location = useLocation();
//     console.log("ehhe")
//     console.log(this.location)
//     this.state = {
//     students: [],
//     class: this.location.state.class,
//     term: this.location.state.term,
// };
//   axios
//   .get('http://localhost:5000/teacher/classes/students?classId='+this.state.class+'&termId='+this.state.term)
//   .then(res => {
//     this.setState({
//     students: res.data,
//     class: this.state.class,
//     term: this.state.term,
//     })
//   })
//   .catch(err => {
//     console.log("Error in students!");
//   })
// }


// render() {
//   return (
//     <div className="Dashboard">
//     <h1 className="display-4 text-center">Welcome to Class {this.state.class} - {this.state.term} </h1>
//     <div className="card">
//       <div className="card-body">
//         These are the students in your class {}
//       </div>
//     </div>
//     <table className="table">
//       <thead>
//         <tr>
//           <th scope="col">ID</th>
//           <th scope="col">Name</th>
//           <th scope="col">Email</th>
//         </tr>
//       </thead>
//       <tbody>
//       {this.state.students.map((s) => {
//         <tr>
//           <td>{s.Id}</td>
//           <td>{s.Name}</td>
//           <td>{s.Email}</td>
//         </tr>
//       })
//     }
//       </tbody>
//     </table>
//     <div className='text-center'>
//     <button type="button" className="btn btn-outline-warning">Download Term End Reports</button>
//     <button type="button" className="btn btn-outline-warning">Notify Attendance</button> 
//     <button type="button" className="btn btn-outline-warning">Make Announcement</button> 
//     </div>
//     </div>
//     );
//     }
//   }


// function WithLocate() {
//   let location = useLocation();
//   return <ClassPage location={location} />
// }

// export default WithLocate


export default ClassPage;