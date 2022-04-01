import React from "react"
import { Routes, Link } from "react-router-dom"
import "../App.css"

export default class NavBar extends React.Component{

    render(){
        return(


        <div className="App-header">
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="register" className="nav-link">Register</Link>
            <Link to="login" className="nav-link">Login</Link>
        </div>

        );
    }
    
}