import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {submitAddress, verifyAddress} from "../utils/address.js"
const template = {
    province : "",
    city : "",
    suburb : "",
    street : "",
    street_number : "",
    area_code: -1
}

export function AddressPage(){
    const nav = useNavigate()
    const [state, setState] = useState(template)
    
    const handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        state[name] = value
        setState({
            ...state 
        })
    }

    const on_success = (result) =>{
        if (result == true){
            var snackbar = document.getElementById("snackbar")
            snackbar.className = "show";	
            snackbar.innerHTML = "You have successfully added your address";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); nav("/profile")}, 3000);
            
        } else {
            var snackbar = document.getElementById("snackbar")
            snackbar.className = "show";	
            snackbar.innerHTML = "Failure. Please fill in all the fields correctly";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        }
        
    }

    const submit_address = () => {
        console.log(state)
        submitAddress(state, on_success);
    }

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

            <button>Done</button>
        </div>
    )
}