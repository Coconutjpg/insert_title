import React from "react"

import "../stylesheets/register.css"
import { Link } from "react-router-dom";
import performRegistration from "../utils/registration"

export default class RegistrationPage extends React.Component{
     
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        cellNo:"",
        dob: "",
        password: "",
        repeatPassword: ""
    }

    /**
     * TODO: link this to the backend registration function
     * Include Alerts for errors like passwords not matching
     * 
    */


    // navigate to the home page after successful registration
    success = (param) =>{
        console.log(param)
        document.getElementById("homebtn").click()
    }

    // note that state will be a json element wiht the above fields
    submit = () =>{
        performRegistration(this.state, this.success)
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
                <h1> Welcome To Registration </h1>
                <form className="registerForm">
                    
                    <label>First Name:</label>
                    <input classname="registerInput"
                        name="firstName" 
                        type="string" 
                        placeholder="John"
                        onChange={this.handleInputChange}>
                    </input>
                    
                    <label>Last Name:</label>
                    <input 
                        name="lastName"
                        type="string" 
                        placeholder="Doe"
                        onChange={this.handleInputChange}/>


                    <label>Date of Birth:</label>
                    <input 
                        type="date"
                        name="dob"
                        onChange={this.handleInputChange}/>
                    

                    <label>Email Address:</label>

                    <input 
                        name="emailAddress"
                        type="string" 
                        placeholder="JD@fakeemail.com"
                        onChange={this.handleInputChange}>
                    </input>
                    
                    <label>Cellphone Number:</label>

                    <input 
                        name="cellNo"
                        type="string" 
                        placeholder="050 5050 505"
                        onChange={this.handleInputChange}>
                    </input>

                    <label>Password:</label>

                    <input 
                        name="password"
                        type="password"
                        onChange={this.handleInputChange}/>                    

                    <label>Re-Enter Password:</label>

                    <input 
                        name="repeatPassword"
                        type="password"
                        onChange={this.handleInputChange}/> 
                    
                    <input 
                        type="button" 
                        value="Submit"
                        onClick={this.submit}/>
                    
                    <label>Already have an Account?</label>
                    
                    <Link to="/login">
                        <button 
                            style={{marginTop:10, marginBottom:30}}>
                            Login
                        </button>
                    </Link>

                    <label style={{marginTop:10, marginBottom:10}}> </label>
                    <Link to="/home">
                        <button id="homebtn" style={{marginTop:0}}>Home</button>
                    </Link>
                </form>
            </React.Fragment>
        );
    }
}