import React from "react"
import { Routes, Link } from "react-router-dom"
import "../App.css"
import "../pages/home/navStyling.css"

export default class NavBar extends React.Component{

    render(){
        return(

      <nav id = "main-navbar">
         <div class="menu-icon">
            <span class="fas fa-bars"></span>
         </div>
         <div class="logo">
            Coconut.jpg
         </div>

          <div class="search-icon">
            <i class="fas fa-search"></i> 
         </div>
         <div class="cancel-icon">
            <i class="fas fa-times"></i>
         </div>

         <form action="#" id="navForm">
         	<select name="searchFilter" id="searchFilter">
         		  <option value="defaultFilter">Filter</option>
    			  <option value="gcFilter">Graphics Cards</option>
                  <option value="monitorFilter">Monitors</option>
  			</select>

            <input type="search" class="search-data" placeholder="Search" required/>
            <button type="submit" class="fas fa-search navButton"></button>
         </form>
         <div class="nav-items">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/home">Home</Link></li>
         </div>
        
      </nav>

        );
    }
    
}