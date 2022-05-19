import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../App.css';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
    email: '',
    password:''
};
}

onChange = e => {
this.setState({ [e.target.name]: e.target.value });
};

onSubmit = e => {
// const 
e.preventDefault();

const data = {
email: this.state.email,
password: this.state.password,
};

axios
.post('http://localhost:5000/teacher', data)
.then(res => {
  this.setState({
    email: '',
    password:''
  })
  this.props.navigate('/Dashboard');
  console.log(res);
  // navigate('/Dashboard')
})
.catch(err => {
  console.log("Error in Login!");
})
};

render() {
return (
<div className="Login">
  <div className="container">
    <div className="row">
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Mua'win Teacher's Assistant</h1>
        <p className="lead text-center">
            Login to Your Dashboard
        </p>

        <form noValidate onSubmit={this.onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter your email'
              name='email'
              className='form-control'
              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <br />

          <div className='form-group'>
            <input
              type='text'
              placeholder='Enter your password'
              name='password'
              className='form-control'
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <input
              type="submit"
              className="btn btn-outline-warning btn-block mt-4"
          />
        </form>
    </div>
    </div>
  </div>
</div>
);
}
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />
}

export default WithNavigate
