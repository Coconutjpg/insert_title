import React from "react"
import Cookies from "universal-cookie"
import "../stylesheets/register.css"
import { Link } from "react-router-dom";
import performRegistration from "../utils/registration"
import {hashing} from "../utils/hashing.js";
import {signUp} from "../utils/database_functions.js";
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
    // navigate to the home page after successful registration
    success = (message,condition) =>{
        let cookies = new Cookies();
        var x = document.getElementById("snackbar");
        x.className = "show";	
        x.innerHTML = message;
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        if(condition){
            if (!cookies.get("holder") == false) {  //if the cookie exists, then add the products to the cart
                //cookies.set('holder', JSON.stringify({ [currId]: 1 }), { path: '/' })
            var obj = cookies.get('holder',true);
            var cookieArr=[]
            for(var product in obj){
                cookieArr.push( {
                "quantity": obj[product],
                "product_id": product
              })}
            let numProducts = cookieArr.length;
            console.log(JSON.stringify(cookieArr) + " arr")
            console.log(cookieArr + "cookie");
            console.log("num" + numProducts)
            cookieArr.map(product => {
                product.product_id = product.product_id.split("=")[1];
                Promise.resolve(addToCart(user.email, product.product_id)).then(() => {
                    console.log("in first promist");
                    Promise.resolve(updateQuantity(user.email, product.product_id, product.quantity)).then(() => {
                        numProducts--;
                        console.log("num "  + numProducts)
                        if (numProducts === 0) {
                            cookies.remove("holder")
                        }
                    });

                    })
                })
            }
            setTimeout(function(){
                document.getElementById("homebtn").click();
            } ,3000)
            } 
	}
      ////////////////////
      handleSubmit = async (e) => {  
        console.log("handling email")
        e.preventDefault();  
        //posting details to SMTP server to send email
        let response = await fetch("http://localhost:5000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(this.state),
        });
       //displaying response from SMTP server
      };
//////////////////////////

  // note that state will be a json element wiht the above fields
  submit = (e) =>{
    (async () => {
        let register_success = await performRegistration(this.state, this.success);
        if(register_success){
            const [hashedPassword, salt] = hashing.hashPassword(this.state.password);
            if(hashedPassword == null){
                hashedPassword = this.state.password;
            }
            let succ = signUp(this.state.firstName,this.state.lastName,this.state.dob,this.state.cellNo,this.state.emailAddress.toLowerCase(),hashedPassword);
            Promise.resolve(succ).then((ret)=>{ 
                //When the signup is successful
                if(ret[0]==="success"){
                    //When the signUp is successful the user json object will be placed into the second element of the array returned
                    this.success("You have been successfully registered",true);
                } else { //When the signup is unsuccessful
                    console.log("unable to add user");
                    this.success("Registration failed due to poor connection to database",false);
                }
            })
        }
        if(register_success==true){
            console.log("supposed to send email")
            this.handleSubmit(e);
        }
    })();
   
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

	    {/*rendering input fields that display an error for invalid input */}
        return(
            <React.Fragment>
                <h1> Register </h1>
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
                    <span >your password and confirm password do not match</span>  
                </div>
                        
               
                    <input 
			id="register"
                        type="button" 
                        value="Register"
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
