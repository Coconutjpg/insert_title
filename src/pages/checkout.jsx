import React from "react";
import { useEffect, useState } from "react";
import { addCredits, emptyCart, getCart, getCredits, getProduct } from "../utils/database_functions";
import { refreshCredits, setCredits, user } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/checkout.css";

var total = 0
var  list = []
 
export function Checkout(){ 
    const [items, setItems] = useState([])
    const [qty, setQty] = useState(0)
    const [t, setT] = useState(0)
    const [l,setList] = useState([])
    const [loaded, setLoaded] = useState(false)

    
   if(!loaded && user!=null){
      console.log("loading")
     setLoaded(true)
     Promise.resolve(getCart(user.email)).then((result) => {
       
       result[1].forEach(product => {
         Promise.resolve(getProduct(product.product_id)).then((item) => {
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
   
   //user gets 50 coconuts everytime they click a button
   const getCoconuts = async (obj)=> {
      if(obj!=null){
         await addCredits(obj.email,1000)
         setCredits(await getCredits(obj.email))
      }else{
         console.log("not signed in")
      }
   }
   
   //decreacing users balance by the cost of their purchace
   const loseCoconuts = async (obj,val)=> {
      if(obj!=null){
         console.log(await getCredits(obj.email) + " <= balance i");
         console.log(await addCredits(obj.email,val) + " <= buy something for 50 => ");
         console.log(await getCredits(obj.email) + " <= balance i+1\n");
         setCredits(await getCredits(obj.email))
         emptyCart(user.email)
      }else{
         console.log("not sighned in")
      }
   }

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
               
               {l.map((item) => {
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