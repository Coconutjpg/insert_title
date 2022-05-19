import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import RegistrationPage from "./pages/registration"
import LoginPage from "./pages/login"
import HomePage from "./pages/homePage"
import NavBar from './components/navBar'
import {ItemPage} from './pages/itemPage';
import { Cart } from './pages/cartPage';
import  {Checkout}  from './pages/checkout';
import { FirebaseObj } from './utils/database_functions';

var _firebaseConfig = {
  apiKey: "AIzaSyDpPjLSoraZzrcVFYNvNHYYOimsJMBjiNQ",
  authDomain: "give-a-little-7976d.firebaseapp.com",
  projectId: "give-a-little-7976d",
  storageBucket: "give-a-little-7976d.appspot.com",
  messagingSenderId: "646349516170",
  appId: "1:646349516170:web:dc194b6ca743b6a7e36c73",
  measurementId: "G-H6TQB4X0WK"
};


const db = new FirebaseObj(_firebaseConfig)

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
            <Route path="/item/:id"   element={<ItemPage/>}/>
            <Route path="/cart"       element={<Cart/>}/>
            <Route path="/checkoutPage"   element={<Checkout/>}/>
          </Routes>
        </Router>
		<div id="snackbar"></div> 
      </div>
    );
  }
}

export default App;
export { db }
