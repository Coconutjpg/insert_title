import React from "react"
import "../stylesheets/profile.css"
import { Link } from "react-router-dom";
import { user  } from "../utils/userDetails";
import {updateUserDetails } from "../utils/database_functions";


export default class UpdateDetails extends React.Component{
     
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        cellNo:"",
        dob: ""
    }




updateChanges = async(obj) => {
    var s= this.state;
    var json = {
     "first_name":s.firstName,
     "last_name":s.lastName, 
     "email":s.emailAddress,
     "phoneNumber":s.cellNo,
     "DoB":s.dob
     };

    if(s.firstName===""){
        json.first_name=null;
    }
    if(s.lastName===""){
        json.last_name=null;
    }
    if(s.emailAddress===""){
        json.email=null;
    }
    if(s.cellNo===""){
        json.phoneNumber=null;
    }
    if(s.dob===""){
        json.DoB=null;
    }
  
    
        if(obj!=null){
              await updateUserDetails(obj.email,json);
           
        }else{
                alert("You are not signed in")
       
     }
     document.getElementById("detailForm").reset();

    

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

    
    render(){

	     {/*rendering input fields that display an error for invalid input */}
         return(
            <React.Fragment>
                <h1> Update Details </h1>
                <form className="registerForm" id="detailForm">       
                <div>    

                    <label>First Name:</label>
                    <input className="registerInput"
                        id="FN"
                        name="firstName" 
                        type="string" 
                        placeholder="John"
                        pattern = "^[A-Za-z]{1,}$"
                        onChange={e => { this.handleInputChange(e);  }}>  
                    </input>
                    
        
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

                        onChange={e => { this.handleInputChange(e);  }}>       
                    </input>
             
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
                  
                        onChange={e => { this.handleInputChange(e) }}>
                    </input>
                    
               
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
                       
                        onChange={e => { this.handleInputChange(e) }}>
                    </input>
                    
          
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
              
                        onChange={e => { this.handleInputChange(e) }}> 
                    </input>
                    
                 
                    <div></div>
                    <span > Your phone number should contain 10 digits or 11 digits only  </span>  

                </div>    


             
                     <div   className="check-btn"
                   
                            id="update"
                            style={{marginTop:50, marginBottom:30}} 
                             onClick={
                            ()=>{
                                Promise.resolve(this.updateChanges(user))
                                .then(console.log("successful update"))}
                                }  >
                                  
                            Update
                     
                        </div>
                     
                        <div></div>
                    
                
                    <Link to="/showdetails">      
                        <button 
                            style={{ marginBottom:30}} 
                          >
                            Back
                        </button>
                    </Link>
 			
                </form>
            </React.Fragment>
        );
    }
  }
