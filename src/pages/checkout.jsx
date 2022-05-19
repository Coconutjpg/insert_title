//importing used modules and functions
import React from "react";
import { useEffect, useState } from "react";
import { db } from "../App";
import { refreshCredits, setCredits, user } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/checkout.css";


//Total to store total cost of items
//List to store items in cart
var total = 0
var  list = []
 
export function Checkout(){ 
    const [items, setItems] = useState([])
    const [qty, setQty] = useState(0)
    const [t, setT] = useState(0)
    const [l,setList] = useState([])
    const [loaded, setLoaded] = useState(false)

    //loaded variable is used to determine if this if statement has been carried out already
   if(!loaded && user!=null){
      console.log("loading")
     setLoaded(true)
     Promise.resolve(db.getCart(user.email)).then((result) => {
       //getting checkout details
       result[1].forEach(product => {
         Promise.resolve(db.getProduct(product.product_id)).then((item) => {
           total += item[1].cost * product.quantity
           list.push(item[1])
           
           setT(total);
           setList(list);
           setQty(list.length)
           //t==0?setQty(0):setQty(list.length);
         })
       })
     });
      //setting list of items
   }
   
   //user gets 1000 coconuts everytime they click a button
   const getCoconuts = async (obj)=> {
      if(obj!=null){
         await db.addCredits(obj.email,10000)
         setCredits(await db.getCredits(obj.email))
      }else{
         console.log("not signed in")
      }
   }
   
   //decreasing users balance by the cost of their purchase
   const loseCoconuts = async (obj,val)=> {
      if(obj!=null){
         await db.addCredits(obj.email,val)
         setCredits(await db.getCredits(obj.email))
         db.emptyCart(user.email)
      }else{
         console.log("not sighned in")
      }
   }

   //initialising state variables 
   const initialiseState = () => {
      total = 0
      list = []
      setLoaded(false);
      setList([]);
      setT(0);
      setQty(0);
   }
    
    return(
        <React.Fragment>
             <h1 id="checkoutTitle">Checkout</h1>

             <div className="check-container">

            <h4><b>Cart</b><span className="check-price" style={{color:"black"}}><i className="fa fa-shopping-cart"></i> <b>{qty}</b></span></h4>
               
               { //displaying cart details
               l.map((item) => {
                  console.log(item.name)
                  return(
                     <span key={item.id}>
                        <p>{item.name}<span className="check-price">C{item.cost}</span></p>
                     </span>
                  )}
               )}
            <hr/>
            <div>Total <span className="check-price" style={{color:"black"}}><b>C{t}</b>  </span></div>     
            <input type="submit" value="Purchace cart" onClick={()=>{loseCoconuts(user,-1*t)}} className="check-btn"/>
            <Link to="/cart">
               <div className="check-btn" onClick={() => initialiseState()}> Back to cart </div>
            </Link>
            <div className="check-btn" onClick={()=>{getCoconuts(user)}}> Get Coconuts </div>
            </div>
        </React.Fragment>
    )
}
