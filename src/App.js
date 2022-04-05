import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom"
import RegistrationPage from "./pages/registration"
import LoginPage from "./pages/login"
import HomePage from "./pages/homePage"
import NavBar from './components/navBar'
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faCoffee} from '@fortawesome/free-solid-svg-icons';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/register" element={<RegistrationPage/>}/>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
