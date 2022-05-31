import React from "react";
import { useState } from "react";
import { user ,setCredits } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/profile.css"
import { addCredits, getCredits } from "../utils/database_functions";
import { validateIncrease } from "../utils/profile_validation";

const getCoconuts = async (obj,amount)=> { //database function for adding credits
    if(obj!=null){
       if((isNaN(amount) == false)  && (validateIncrease(amount))){
        amount = amount + 0.00;

        await addCredits(obj.email,amount)
        setCredits(await getCredits(obj.email))
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = "Credits added successfully";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
       }
       else{
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = "Invalid number entered";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
       }

    }else{
        var x = document.getElementById("snackbar");
        x.className = "show";
        x.innerHTML = "Sign in first before adding credits";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
 }
 
export function ProfilePage(){
    const [input, setInput] = useState(0); // 0 is the initial state value
  
return (
    <React.Fragment>
    {/*creating buttons and add coconuts field*/}
            <h1> Your Profile</h1>
            <form className="formy">

                <div className="snackbar"></div> 
                <div id="snackbar"></div> 
                <label></label>
                <button id="details" 
                        style={{marginTop:10, marginBottom:30}}>
                        Details
                    </button>
                <div></div>

                    <button 
                        style={{marginTop:10, marginBottom:30}}>
                        Orders
                    </button>
                <div></div>

                <Link to="/address">
                    <button>
                        Add address
                    </button>
                </Link>

                <label>Add CocoBucks</label>
               
                <input 
                className="profileCocoInput"
                    type="number"
                    min="0"
                    max="50000"
                    value={input}
                    onInput={e => setInput(e.target.value)}
                   />
  
                    <div></div>
            <span >please enter a valid positive number less than 50000</span>
               
               <label style={{marginTop:5, marginBottom:5}}> </label>
               <div id="addBtn" className="check-btn" onClick={()=>{getCoconuts(user,parseInt(input,10));}}>
                Add Cocobucks
                </div>

            </form>
        </React.Fragment>
);
}
