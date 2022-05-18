import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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

    const on_success = () =>{
        nav("/profile")
    }

    const submit_address = () => {
        // insert backend stuff here

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
            </form>

            <button>Done</button>
        </div>
    )
}