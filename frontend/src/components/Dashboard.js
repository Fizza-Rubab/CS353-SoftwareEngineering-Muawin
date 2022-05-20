import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
    classes: []
};
  axios
  .get('http://localhost:5000/teacher/classes')
  .then(res => {
    this.setState({
      classes:res.data
    })
  })
  .catch(err => {
    console.log("Error in Login!");
  })
}


render() {
const classes = this.state.classes;
return (
<div className="Dashboard">
<h1 className="display-4 text-center">Welcome to the Dashboard</h1>
<div className="card" style={{backgroundColor:"#FFC107"}}>
  <div className="card-body text-center">
    ~
  </div>
</div>
<div className="card">
  <div className="card-body text-center">
    You are teaching the following classes. Click to redirect and view their single click functions
  </div>
</div>
<div  style={{height:"2rem"}}>
</div>
<div className="text-center" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
<ul className="list-group text-center">
  {classes.map((car) => <Link to="/Class" state={car}> <li className="list-group-item text-center"  key={ car.class}>{car.class} {car.term}</li></Link>)}
</ul>
</div>
</div>
);
}
}

export default Dashboard;