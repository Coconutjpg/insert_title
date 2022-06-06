import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {submitAddress} from "../utils/address.js"
import { addAddress } from "../utils/database_functions.js"
import { user } from "../utils/userDetails.js"

//initialising state
const template = {
    province : "",
    city : "",
    suburb : "",
    street : "",
    street_number : "",
    area_code: -1
}

//displaying address page
export function AddressPage(){
    const nav = useNavigate()
    const [state, setState] = useState(template)
    
    //event handler to update state upoon changes made by the user
    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        state[name] = value
        setState({
            ...state 
        })
    }

    const on_success = (result,address) =>{
        if (result == true){
            //add address using database method
            if(user.email != null){
            //adding address if the user is logged in
            addAddress(user.email, address.street_number, address.street, address.suburb, address.city, address.province, address.area_code);
                
             //displaying message stating address has been added for 3s
            var snackbar = document.getElementById("snackbar")
            snackbar.className = "show";	
            snackbar.innerHTML = "You have successfully added your address";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); nav("/profile")}, 3000);
            }
            else{
                //displaying message stating address has not been added for 3s
                var snackbar = document.getElementById("snackbar")
                snackbar.className = "show";	
                snackbar.innerHTML = "User token error. Please log in again";
                setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); nav("/profile")}, 3000);
                
            }
        } else {
            //displaying message stating address has not been added for 3s

            var snackbar = document.getElementById("snackbar")
            snackbar.className = "show";	
            snackbar.innerHTML = "Failure. Please fill in all the fields correctly";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        }
        
    }

    
    //function to add address 
    const submit_address = () => {
        console.log(state)
        submitAddress(state, on_success);
    }

    //displaying address input page 
    return(
        <div>
            <h3>Address</h3>

            <form className = "form">
                <label> Province </label>
                <input 
                    name = "province"
                    onChange={handleInputChange}
                />

                <label> City </label>
                <input 
                    name = "city"
                    onChange={handleInputChange}
                />

                <label> Suburb </label>
                <input 
                    name = "suburb"
                    onChange={handleInputChange}
                />

                <label> Street </label>
                <input 
                    name = "street"
                    onChange={handleInputChange}
                />

                <label> Street Number </label>
                <input 
                    type="number" 
                    name = "street_number"
                    onChange={handleInputChange}
                />

                <label> Area Code </label>
                <input 
                    type="number"
                    name = "area_code"
                    onChange={handleInputChange}
                />
                
                <button style = {{margin:60 + "px"}} type="button" onClick={() => submit_address()}>Submit</button>
                <div className="s"></div>
            </form>

        </div>
    )
}
