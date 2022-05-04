import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {withRouter} from "react-dom"
import RegistrationPage from "./pages/registration"
import LoginPage from "./pages/login"
import HomePage from "./pages/homePage"
import NavBar from './components/navBar'
import {ItemPage} from './pages/itemPage';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faCoffee} from '@fortawesome/free-solid-svg-icons';
export var selected_item = null
export function set_selected_item(item){
  selected_item = item
}
class App extends Component {


  render() {
    return (
      <div className="App">
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/"           element={<HomePage/>}/>
            <Route path="/register"   element={<RegistrationPage/>}/>
            <Route path="/home"       element={<HomePage/>}/>
            <Route path="/login"      element={<LoginPage/>}/>
            <Route path="/item/:id"       element={<ItemPage/>}/>
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
