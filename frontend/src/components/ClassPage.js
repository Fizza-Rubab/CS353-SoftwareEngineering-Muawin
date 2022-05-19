import React, { Component } from 'react';
import { Link, useLocation} from 'react-router-dom';
import '../App.css';
import axios from 'axios';


const  ClassPage = (props) => {
  const location = useLocation();
  const state = location.state;

return (
<div className="Dashboard">
<h1 className="display-4 text-center">Welcome to Class {state.class} - {state.term} </h1>
<div className="card">
  <div className="card-body">
    We provide the following functionalities.
  </div>
</div>
<div className='text-center'>
<button type="button" className="btn btn-outline-warning">Download Term End Reports</button>
<button type="button" className="btn btn-outline-warning">Notify Attendance</button> 
<button type="button" className="btn btn-outline-warning">Make Announcement</button> 
</div>
</div>
);
}

export default ClassPage;