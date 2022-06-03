import React from "react"
import "../stylesheets/register.css"
import { Link } from "react-router-dom";
import { user  } from "../utils/userDetails";
import { getUserDetails} from "../utils/database_functions";


export default class ShowDetails extends React.Component{
     
    state = {
        firstName: "",
        lastName: "",
        emailAddress: "",
        cellNo:"",
        dob: "",
        password: "",
        repeatPassword: ""
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

    getDetails = async (obj)=>{  //fetches details from database
        if(obj!=null){
             let usr= await getUserDetails(obj.email);
             return usr[1];
           
        }else{
                console.log("not signed in")
       
     }
    }
    
    
    getDetails2=()=>{   // places details in labels
        Promise.resolve(this.getDetails(user))
        .then(result =>{  
            document.getElementById("fn").innerHTML = "First Name: "+result.firstName, 
            document.getElementById("ln").textContent = "Last Name: "+result.lastName,
            document.getElementById("email").textContent ="Email Address: "+ result.emailAddress,
            document.getElementById("cell").textContent = "Phone Number: "+result.phoneNumber,
            document.getElementById("dob").textContent = "Date of Birth: "+result.DoB 
        })

    }




    render(){
        

	     {/*rendering input fields that display an error for invalid input */}
         return(
           
            <React.Fragment>
             
                <h1>  Details </h1>
                <form className="registerForm">       
                <div>    

                    <label id="fn"></label>
        
                    <div></div>
                </div>
                <div id="snackbar"></div> 


                <div>
                    <label id="ln"></label>
            
             
                    <div></div>
               </div>

                <div>
                    <label id="dob"></label>
                        <div></div>
                </div>

                <div>
                    <label id="email"></label>      
                    <div></div>
                </div>
                <div>
                    <label id="cell"></label>
                    <div></div>

                </div>  

                   
                    <div    className="check-btn"
                            onClick={this.getDetails2}
                            style={{marginTop:20, marginBottom:30}}   >
                            Click here to show Details
                        </div>
                 
                    <div></div>
                    <Link to="/setdetails">      
                        <button 
                            style={{marginTop:20, marginBottom:30}}   >
                            Update Details
                        </button>
                    </Link>
                    <div></div>
                    <Link to="/profile">      
                        <button 
                            style={{ marginBottom:30}}   >
                             Back
                        </button>
                    </Link>



                
 			
                </form>
            </React.Fragment>
        );
    }
  }
