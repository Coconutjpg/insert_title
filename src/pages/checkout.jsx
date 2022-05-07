import React from "react";
import { useEffect, useState } from "react";
import { addCredits, getCart, getCredits, getProduct } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/checkout.css";

var total = 0
var  list = []
 
export function Checkout(){ 
    const [items, setItems] = useState([])
    const [qty, setQty] = useState([])
    const [t, setT] = useState(total)
    const [l,setList] = useState(list)

   if(user!=null){
     Promise.resolve(getCart(user.email)).then((result) => {
       result[1].forEach(product => {
         Promise.resolve(getProduct(product.product_id)).then((item) => {
           total += item.cost * product.quantity
           list.push(item)
                   })
       })
       setT(total);
       t==0?setQty(0):setQty(list.length);
     });
     setList([list]); //setting list of items
   }
   
   //user gets 50 coconuts everytime they click a button
   const getCoconuts = async (obj)=> {
      if(obj!=null){
         console.log(await getCredits(obj.email) + " <= balance i");
         console.log(await addCredits(obj.email,50) + " <= get cash =>");
         console.log(await getCredits(obj.email) + " <= balance i+1\n");

      }else{
         console.log("not signed in")
      }
   }
   
   //decreacing users balance by the cost of their purchace
   const loseCoconuts = async (obj,val)=> {
      if(obj!=null){
         console.log(await getCredits(obj.email) + " <= balance i");
         console.log(await addCredits(obj.email,-val) + " <= buy something for 50 => ");
         console.log(await getCredits(obj.email) + " <= balance i+1\n");

      }else{
         console.log("not sighned in")
      }
   }
 
   
    return(
        <React.Fragment>
             <h1 id="checkoutTitle">Checkout</h1>

             <div className="check-container">

            <h4><b>Cart</b><span className="check-price" style={{color:"black"}}><i className="fa fa-shopping-cart"></i> <b>{qty}</b></span></h4>
             <ul>
               
                     {l.map(item => (
                     <li key={item.id}>
                        <p>{item.name}<span class="check-price">C{item.cost}</span></p>
                     </li>
                     ))}
            </ul>
            <hr/>
            <div>Total <span className="check-price" style={{color:"black"}}><b>C{t}</b>  </span></div>     
            <input type="submit" value="Purchace cart" onClick={()=>{loseCoconuts(user,-1*t)}} className="check-btn"/>
            <Link to="/cart">
               <div className="check-btn"> Back to cart </div>
            </Link>
            <div className="check-btn" onClick={()=>{getCoconuts(user)}}> Get Coconuts </div>

      
            
            </div>
        </React.Fragment>
    )
}