import React from "react"

import "../stylesheets/register.css"
import { Link } from "react-router-dom"
import { performLogin } from "../utils/loginUtils"
import Cookies from "universal-cookie"
import { user } from "../utils/userDetails"

//import { useNavigate } from "react-router-dom"

export default class LoginPage extends React.Component {

    state = {
        emailAddress: "",
        password: ""
    }
    // triggered on successfull login
    success =  (param, condition) => {
        var cookies = new Cookies();
		var x = document.getElementById("snackbar");
            x.className = "show";
            x.innerHTML = param;
            console.log(param);
            setTimeout(function () {
                x.className = x.className.replace("show", "");
            }, 3000);
            if (condition == true) {
                console.log(!cookies.get("holder") == false)
                if (!cookies.get("holder") == false) {  //if the cookie exists, then add the products to the cart
                    //cookies.set('holder', JSON.stringify({ [currId]: 1 }), { path: '/' })
        
                    let cookieArr = [...cookies.get("holder", false)]
                    let numProducts = cookieArr.length;
                    console.log(JSON.stringify(cookieArr) + " arr")
                    console.log(cookieArr + "cookie");
                    console.log("num" + numProducts)

                    cookieArr.map(product => {
                        product.product_id = product.product_id.split("=")[1];
                        Promise.resolve(addToCart(user.email, product.product_id)).then(() => {
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
         * emailAddress; password
         * 
         * 
         * 
         * when the login action is successfull performLogin will
         * trigger the success function
         */
        login = () => {
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
