import React from "react"

import "../stylesheets/register.css"
import { Link } from "react-router-dom"
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import { faUser } from "@fortawesome/free-regular-svg-icons"



export default class LoginPage extends React.Component{
    
    state = {
        emailAddress: "",
        password: ""
    }

    /**
     * TODO: link this to the backend registration function
     * Include Alerts for errors like passwords not matching
     * 
    */

    // note that state will be a json element wiht the above fields
    submit(){
        console.log(this.state);
        //registration.register(this.state) 
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
                <form className="form" action={this.submit()}>
                    
                    <label>Email Address:</label>
                    <i className="fa-solid fa-envelope"></i>
                        <input 
                        name="emailAddress"
                        type="string" 
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
                        onClick={this.submit}/>
                    
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