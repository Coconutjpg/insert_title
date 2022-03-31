import React from "react"
import { Routes, Link } from "react-router-dom"
import "../App.css"

export default class NavBar extends React.Component{

    render(){
        return(
        <div className="App-header">
            <a href="/register"><button>Register</button></a>
            <a href="/login"><button>Login</button></a>
            <a href="/"><button>Home</button></a>
        </div>
        );
    }
    
}