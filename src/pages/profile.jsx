import React from "react";
import { useState } from "react";
import { user ,setCredits } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/profile.css"
import { addCredits, getCredits } from "../utils/database_functions";


const getCoconuts = async (obj,amount)=> {
           console.log("not signed in")

    if(obj!=null){
       await addCredits(obj.email,amount)
       setCredits(await getCredits(obj.email))
    }else{
       console.log("not signed in")
    }
 }
 
export function ProfilePage(){
    const [input, setInput] = useState(''); // '' is the initial state value
  
return (
    <React.Fragment>
    {/*creating buttons and add cooconuts field*/}
            <h1> Your Profile</h1>
            <form className="formy">

                <div className="snackbar"></div> 
                
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
                    min="1"
                    max="50000"
                    value={input}
                    onInput={e => setInput(e.target.value)}
                   />
  
                    <div></div>
            <span >please enter a valid number between 1 and 50000</span>
               
               <label style={{marginTop:5, marginBottom:5}}> </label>
               <button id="addBtn" onClick={()=>{getCoconuts(user,parseInt(input,10));console.log(parseInt(input,10)); }}>
                Add Cocobucks
                </button>

            </form>
        </React.Fragment>
);
}
