import React from "react"
import { Routes, Link } from "react-router-dom"
import "../App.css"
import "../stylesheets/navStyling.css"
import { user, setUpdater } from "../utils/userDetails"
import {logOut} from "../utils/database_functions"


export default class NavBar extends React.Component{

   state = {
      username:null
   }

   // called when the username changes
   setUserName = (username) =>{
      this.setState({username:username})
   }

   setCredits = (credits) =>{
      console.log("credits shown" + credits)

      this.setState({credits:credits})
   }

   // displays a greeting
   greeting = () =>{
      if(this.state.username != null)
         return(   
            <h4>{this.state.username}</h4>  
         )
      return <h3></h3>
   }

   creds = () => {
      console.log(this.state)
      return <h4> Balance: {this.state.credits} Coco-Bucks </h4>
   }

   navLogout = () =>{
      console.log("logging out");
      logOut();
      console.log("logging uuuuuuu");

   }
   
   render(){
      setUpdater(this)
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
               <li><Link to="/login" onClick={this.navLogout}>logout</Link></li>

               <li><Link to="/register">Register</Link></li>
               <li><Link to="/cart">Cart</Link></li>
               <li><Link to="/home">Home</Link></li>
               <div>
                  {this.greeting()}
                  {this.creds()}
               </div>
            </div>
         
         </nav>

      );
   }
    
}