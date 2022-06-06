import React from "react"

import "../stylesheets/register.css"
import { Link } from "react-router-dom"
import { performLogin } from "../utils/loginUtils"
import Cookies from "universal-cookie"
import { user } from "../utils/userDetails"
import {addToCart,updateQuantity} from "../utils/database_functions"
import {hashing} from '../utils/hashing.js'
import {logIn} from "../utils/database_functions"
//import { useNavigate } from "react-router-dom"

export default class LoginPage extends React.Component {

    state = {
        emailAddress: "",
        password: ""
    }

    success =  (param, condition) => { //used to display messages to the user
        var cookies = new Cookies(); // and will check the cookie if the user logged in successfully
		var x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = param;
            console.log(param);
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
            if (condition == true) {
              //  console.log(!cookies.get("holder") == false)
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
                setTimeout(function () {
                    document.getElementById("linkbtn").click();
                    console.log(this.props)
                }, 3000)
            }
        }

        /**
         * logs in the user by passing in the state object which contains
         * emailAddress; password*/
        login = () => {
         var valid = performLogin(this.state, this.success)
         if(valid){// details were valid so attempt to login
            //do password hashing
            var hashedPassword = hashing.hashPassword(this.state.password)[0];
            if(hashedPassword == null){
                hashedPassword = this.state.password;
            }
            let l = logIn(this.state.emailAddress,hashedPassword);
            Promise.resolve(l).then((result) =>{
                if(result[0]==="success"){ //user was able to login
                    this.success("Welcome " + result[1].displayName,true); 
                }
            else{      //user failed to login 
                this.success("Email Address or Password is incorrect",false);
                }
            })
         }
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
            return (
                <React.Fragment>
                    {/*creating input fields and tracking changes made to them*/}
                    <h1> login </h1>
                    <form className="form">
                        <div id="snackbar"></div>
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
                            onChange={this.handleInputChange} />


                        <input
                            id="login"
                            type="button"
                            value="Login"
                            onClick={this.login} />

                        <label>Don't have an Account?</label>

                        <Link to="/Register">
                            <button
                                style={{ marginTop: 10, marginBottom: 30 }}>
                                Register
                            </button>
                        </Link>

                        <label style={{ marginTop: 10, marginBottom: 10 }}> </label>
                        <Link to="/home">
                            <button id="linkbtn" style={{ marginTop: 0 }}>Home</button>
                        </Link>
                    </form>
                </React.Fragment>
            );
        }
    }
