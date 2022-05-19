import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClassPage from './components/ClassPage';
// import ShowBookDetails from './components/ShowBookDetails';
// import UpdateBookInfo from './components/UpdateBookInfo';

export default function App(){
  // render() {
    return (
      <Router>
        <Routes>
          {/* <h1>Fizza Rubab</h1> */}
          <Route path="/" element={<Login />} /> 
          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/Class" element={<ClassPage />} /> 
          {/* <Route path='/create-book' component={CreateBook} />
          <Route path='/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/show-book/:id' component={ShowBookDetails} /> */}
          </Routes>
      </Router>
    );
  // }
}