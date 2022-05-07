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
    success = (message,condition) =>{
	 var x = document.getElementById("snackbar");
     x.className = "show";	
	 x.innerHTML = message;
	 setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 if(condition){
       document.getElementById("homebtn").click()
		} 
	}

    // note that state will be a json element wiht the above fields
    submit = () =>{
        performRegistration(this.state, this.success)
    }

    // keeps track of values that change on the DOM
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value,
        })
        
    }
    
    c=(inputID,spanID)=>{  //This function checks whether a field has been entered and constructs an error for it.

        if(document.getElementById(inputID).value==''){

            document.getElementById(spanID).innerHTML='*required';
        }
        else{

            document.getElementById(spanID).innerHTML='';
        }
    }

    render(){
        return(
            <React.Fragment>
                <h1> Welcome To Registration </h1>
                <form className="registerForm">       
                <div>    

                    <label>First Name:</label>
                    <input className="registerInput"
                        id="FN"
                        name="firstName" 
                        type="string" 
                        placeholder="John"
                        pattern = "^[A-Za-z]{1,}$"
                        onBlur={e => {this.c("FN","requireFN")}}
                        onChange={e => { this.handleInputChange(e); this.c("FN","requireFN") }}>
                    </input>
                    
                    <span id="requireFN"></span>
                    <div></div>
                    <span>First Name should contain alphabetical letters only</span>
                </div>
                <div id="snackbar"></div> 


                <div>
                    <label>Last Name:</label>
                    <input 
                        id="LN" 
                        name="lastName"
                        type="string" 
                        placeholder="Doe"
                        pattern = "^[A-Za-z]{1,}$"
                        onBlur={e => {this.c("LN","requireLN")}}
                        onChange={e => { this.handleInputChange(e); this.c("LN","requireLN") }}>        
                    </input>
                    <span id="requireLN"></span>
                    <div></div>
                    <span >Last Name should contain alphabetical letters only </span>   
               </div>


                <div>
                    <label>Date of Birth:</label>
                    <input 
                        id="DOB"
                        type="date"
                        name="dob"
                        max="2006-12-31" 
                        min="1942-01-01"
                        onBlur={e => {this.c("DOB","requireDOB")}}
                        onChange={e => { this.handleInputChange(e); this.c("DOB","requireDOB") }}>
                    </input>
                    
                    <span id="requireDOB"></span>
                        <div></div>
                         <span >Only users from 16 (turning 16 included) to 80 can register</span>
                </div>


                <div>
                    <label>Email Address:</label>
                    <input 
                        id="MAIL"
                        name="emailAddress"
                        type="email" 
                        placeholder="JD@fakeemail.com"
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$"
                        onBlur={e => {this.c("MAIL","requireMAIL")}}
                        onChange={e => { this.handleInputChange(e); this.c("MAIL","requireMAIL") }}>
                    </input>
                    
                    <span id="requireMAIL"></span>
                    <div></div>
                    <span > Email must be in the following order: characters@characters.domain </span>   
                </div>


                <div>
                    <label>Cellphone Number:</label>
                    <input 
                        id="CELL"
                        name="cellNo"
                        type="string" 
                        placeholder="050 5050 505"
                        pattern = "[0-9]{10,11}$"
                        onBlur={e => {this.c("CELL","requireCELL")}}
                        onChange={e => { this.handleInputChange(e); this.c("CELL","requireCELL") }}>
                    </input>
                    
                    <span id="requireCELL"></span>
                    <div></div>
                    <span > Your phone number should contain 10 digits or 11 digits only  </span>  

                </div>    


                    <label>Password:</label>
                <div>
                    <input 
                        id="PASS"
                        name="password"
                        type="password"
                        pattern="^\S{6,}$"
                        onBlur={e => {this.c("PASS","requirePASS")}}
                        onChange={e => { this.handleInputChange(e); this.c("PASS","requirePASS") }}>
                    </input>
                    
                    <span id="requirePASS"></span>
                    <div></div>
                    <span >Password must contain 6 or more characters</span>  
                </div>

                
                <div>
                    <label>Re-Enter Password:</label>
                    <input 
                        id="REPASS"
                        name="repeatPassword"
                        type="password"
                        pattern={this.state.password}
                        onBlur={e => {this.c("REPASS","requireREPASS")}}
                        onChange={e => { this.handleInputChange(e); this.c("REPASS","requireREPASS") }}>
                    </input>
                    
                    <span id="requireREPASS"></span>
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
