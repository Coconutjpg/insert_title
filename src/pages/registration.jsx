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
            [name]: value,
        })
        
        //console.log(this.state);
    }
    
    render(){
        return(
            <React.Fragment>
                <h1> Welcome To Registration </h1>
                <form className="registerForm">


                <div>    
                    <label>First Name:</label>
                    <input className="registerInput"
                        name="firstName" 
                        type="string" 
                        placeholder="John"
                        pattern = "^[A-Za-z]{1,}$"
                        
                        onChange={this.handleInputChange}>
                    </input>
                    <div></div>
                    <span>First Name should contain alphabetical letters only</span>
                </div>


                <div>
                    <label>Last Name:</label>
                    <input 
                        name="lastName"
                        type="string" 
                        placeholder="Doe"
                        pattern = "^[A-Za-z]{1,}$"
                       

                        onChange={this.handleInputChange}/>
                        <div></div>
                         <span >Last Name should contain alphabetical letters only </span>   
               </div>


                <div>
                    <label>Date of Birth:</label>
                    <input 
                        type="date"
                        name="dob"
                        max="2006-12-31" 
                        min="1942-01-01"
                        onChange={this.handleInputChange}/>
                        <div></div>
                         <span >Only users from either 16 (turning 16 included) to 80 can register</span>
                </div>


                <div>
                    <label>Email Address:</label>
                    <input 
                        name="emailAddress"
                        type="email" 
                        placeholder="JD@fakeemail.com"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        onChange={this.handleInputChange}>
                    </input>
                    <div></div>
                    <span > Email must be in the following order: characters@characters.domain </span>   
                </div>


                <div>
                    <label>Cellphone Number:</label>
                    <input 
                        name="cellNo"
                        type="string" 
                        placeholder="050 5050 505"
                        pattern = "[0-9]{10,11}$"
                        onChange={this.handleInputChange}>
                    </input>
                    <div></div>
                    <span > Your phone number should contain 10 digits or 11 digits only  </span>  

                </div>    


                    <label>Password:</label>
                <div>
                    <input 
                        name="password"
                        type="password"
                        pattern="^\S{6,}$"
                        onChange={this.handleInputChange}/>  
                    <div></div>
                    <span >Password must contain 6 or more characters</span>  
                </div>

                
                <div>
                    <label>Re-Enter Password:</label>
                    <input 
                        name="repeatPassword"
                        type="password"
                        pattern="^\S{6,}$"
                        onChange={this.handleInputChange}/> 
                        <div></div>
                    <span >Password must contain 6 or more characters</span>  
                </div>
                        
                    
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
