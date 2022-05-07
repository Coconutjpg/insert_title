import React from "react";
import { useEffect, useState } from "react";
import { addCredits, getCart, getProduct } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/checkout.css";
import checkoutLines from "../components/checkoutLines";
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

             const line = (
               <checkoutLines 
                   name={product.product_id} 
                   price={item.cost} 
                    >
               </checkoutLines>
           )
           list.push(line)
           setList([...list])         })
       })
       setT(total);
       t>0?setQty(0):setQty(list.length);
     });
    
   }
   
     
   const getCoconuts =(obj)=> {
      console.log("object: !" + obj )
      if(obj!=null){
         addCredits(obj.email,50);
      }else{
         console.log("not sighned in")
      }
   }
   
    return(
        <React.Fragment>
             <h1 id="checkoutTitle">Checkout</h1>

             <div className="check-container">

            <h4><b>Cart</b><span className="check-price" style={{color:"black"}}><i className="fa fa-shopping-cart"></i> <b>{t}</b></span></h4>
                {l.map((line) => {
                    return line
                })}
            <hr/>
            <div>Total <span className="check-price" style={{color:"black"}}><b>C{t}</b>  </span></div>     
            <input type="submit" value="Purchace cart" className="check-btn"/>
            <Link to="/cart">
               <div className="check-btn"> Back to cart </div>
            </Link>
            <div className="check-btn" onClick={getCoconuts(user)}> Get Coconuts </div>

      
            
            </div>
        </React.Fragment>
    )
}