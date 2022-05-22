import React from "react";
import { useEffect, useState } from "react";
import { getCart, getProduct } from "../utils/database_functions";
import { user ,setCredits } from "../utils/userDetails";
import Card from "../components/card";
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
    const [input, setInput] = useState(0); // '' is the initial state value
  
 //user gets 1000 coconuts everytime they click a button

return (
    <React.Fragment>
    {/*creating input fields and tracking changes made to them*/}
            <h1> Your Profile</h1>
            <form className="formy">

                <div className="snackbar"></div> 
                
             
                 

                
                <input 
                    className="detail"
                    type="button" 
                    value="Details"
                   />

                
                <label ></label>
                
                <Link to="/Register">
                    <button 
                        style={{marginTop:10, marginBottom:30}}>
                        Orders
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
              
               <div className="check-btn" onClick={()=>{getCoconuts(user,parseInt(input,10));console.log(parseInt(input,10)); }}> Add Coconuts </div>


            </form>
        </React.Fragment>
);
}
