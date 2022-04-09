import React from "react"

import "../stylesheets/register.css"
import { Link } from "react-router-dom"
import { performLogin } from "../utils/loginUtils"



export default class LoginPage extends React.Component{
    
    state = {
        emailAddress: "",
        password: "",
    }

    login = () =>{
        performLogin(this.state)
    }

    // keeps track of values that change on the DOM
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value
        })
        
        //console.log(this.state);
    }
    
    render(){
        return(
            <React.Fragment>
                <h1> Welcome To Login Page </h1>
                <form className="form">
                    
                    <label>Email Address:</label>
                    <i className="fa-solid fa-envelope"></i>
                        <input 
                        name="emailAddress"
                        type="email"
                        placeholder=" JD@fakeemail.com"
                        onChange={this.handleInputChange}
                        >
                        </input>

                    <label>Password:</label>
                    <i className="fa-solid fa-lock"></i>
                    <input 
                        name="password"
                        type="password"
                        onChange={this.handleInputChange}/>                    

                    
                    <input 
                        type="button" 
                        value="Login"
                        onClick={this.login}/>
                    
                    <label>Don't have an Account?</label>
                    
                    <Link to="/Register">
                        <button 
                            style={{marginTop:10, marginBottom:30}}>
                            Register
                        </button>
                    </Link>

                    <label style={{marginTop:10, marginBottom:10}}> </label>
                    <Link to="/">
                        <button style={{marginTop:0}}>Home</button>
                    </Link>
                </form>
            </React.Fragment>
        );
    }
}
