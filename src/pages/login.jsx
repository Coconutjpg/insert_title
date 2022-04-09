import React from "react"

import "../stylesheets/register.css"
import { Link } from "react-router-dom"
import { performLogin } from "../utils/loginUtils"
import { useNavigate } from "react-router-dom"


function n(){
    let navigate = useNavigate()
    navigate('/home', {replace: true})
}


export default class LoginPage extends React.Component{

    
    
    state = {
        emailAddress: "",
        password: ""
    }
    // triggered on successfull login
    success = (param) =>{
        document.getElementById("linkbtn").click();
        console.log(this.props)
    }

    /**
     * logs in the user by passing in the state object which contains
     * emailAddress; password
     * 
     * 
     * 
     * when the login action is successfull performLogin will
     * trigger the success function
     */
    login = () =>{
        performLogin(this.state, this.success)
    }

    // keeps track of values that change on the DOM
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value
        })
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
                    <Link to="/home">
                        <button id="linkbtn"  style={{marginTop:0}}>Home</button>
                    </Link>
                </form>
            </React.Fragment>
        );
    }
}
