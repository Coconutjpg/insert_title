import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import RegistrationPage from "./pages/registration"
import LoginPage from "./pages/login"
import HomePage from "./pages/homePage"
import NavBar from './components/navBar'
import {ItemPage} from './pages/itemPage';
import { Cart } from './pages/cartPage';
import {ProfilePage} from "./pages/profile"
import  {Checkout}  from './pages/checkout';
import { AddressPage } from './pages/addAddress';
import { CategoryPage } from './pages/categoryPage';
import { DetailsPage } from './pages/detailsPage';

//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
//import {faCoffee} from '@fortawesome/free-solid-svg-icons';
export var selected_item = null
export function set_selected_item(item){
  selected_item = item
}
class App extends Component {


  render() {
    return (
      <div className="App" data-testid = "app-1">
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/"           element={<HomePage/>}/>
	    <Route path="/profile"    element={<ProfilePage/>}/>
            <Route path="/register"   element={<RegistrationPage/>}/>
            <Route path="/home"       element={<HomePage/>}/>
            <Route path="/login"      element={<LoginPage/>}/>
            <Route path="/item/:id"   element={<ItemPage/>}/>
            <Route path="/cart"       element={<Cart/>}/>
            <Route path="/checkoutPage"   element={<Checkout/>}/>
            <Route path="/address" element={<AddressPage/>}/>
            <Route path="/category/:id"   element={<CategoryPage/>}/>
            <Route path="/details"   element={<DetailsPage/>}/>
          </Routes>
        </Router>
		<div id="snackbar"></div> 
      </div>
    );
  }
}

export default App;
