import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom"
import RegistrationPage from "./pages/registration"
import HomePage from "./pages/homePage"
import NavBar from './components/navBar';

class App extends Component {
  render() {
    return (
      <div className="App">

        <NavBar/>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegistrationPage/>}/>
            <Route path="/home" element={<HomePage/>}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
