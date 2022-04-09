import React from "react"
import { Routes, Link } from "react-router-dom"
import "../App.css"
import "../stylesheets/navStyling.css"
import { user } from "../utils/userDetails"


export default class NavBar extends React.Component{

    
   

    render(){
        return(

      <nav id = "main-navbar">
         <div className="menu-icon">
            <span className="fas fa-bars"></span>
         </div>
         <div className="logo">
            Coconut.jpg
         </div>

          <div className="search-icon">
            <i className="fas fa-search"></i> 
         </div>
         <div className="cancel-icon">
            <i className="fas fa-times"></i>
         </div>

         <form action="#" id="navForm">
         	<select name="searchFilter" id="searchFilter">
         		  <option value="defaultFilter">Filter</option>
    			  <option value="gcFilter">Graphics Cards</option>
                  <option value="monitorFilter">Monitors</option>
  			</select>

            <input type="search" className="search-data" placeholder="Search" required/>
            <button type="submit" className="fas fa-search navButton"></button>
         </form>
         <div className="nav-items">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/home">Home</Link></li>
         </div>
        
      </nav>

        );
    }
    
}