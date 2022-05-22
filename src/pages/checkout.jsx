//importing used modules and functions
import React from "react";
import { useEffect, useState } from "react";
import { addCredits, createOrder, emptyCart, getAddress, getAddressesIDs, getCart, getCredits, getProduct } from "../utils/database_functions";
import { refreshCredits, setCredits, user } from "../utils/userDetails";
import { Link } from "react-router-dom";
import "../stylesheets/checkout.css";
import { AddressCard } from "../components/addressCard";

var heh = false

function AddressSelector(){
   
   const [promised, setPromised] = useState(false)
   const [addresses, setAddresses] = useState([])
   const [selected, setSelected] = useState(-1)
   const [cards, setCards] = useState([])
   
   if(!promised && user!=null){
      setPromised(true)
      Promise.resolve(getAddressesIDs(user.email)).then(result => {
         const address_ids = result[1]
         console.log(result)
         for(var i = 0; i < address_ids.length; i++) {
            Promise.resolve(getAddress(address_ids[i])).then(result =>{
               addresses.push(result[1])
               setAddresses([...addresses])
            })
         }
      })
   } 

   const modifySelection = (index) => {
      setSelected(index)
      for (var i = 0; i <= index; i++){
         
      }
   }

   return (
      <div style={{flex:true}}>
         {addresses.map(address =>{
            const c = <AddressCard address={address}></AddressCard>
            cards.push(c)
            return c
         })}
      </div>
   )
}

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
    const [addressSelector] = useState(<AddressSelector></AddressSelector>)

    //loaded variable is used to determine if this if statement has been carried out already
   if(!loaded && user!=null){
      console.log("loading")
     setLoaded(true)
     Promise.resolve(getCart(user.email)).then((result) => {
       //getting checkout details
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
   
   //user gets 1000 coconuts everytime they click a button
   const getCoconuts = async (obj)=> {
      if(obj!=null){
         await addCredits(obj.email,10000)
         setCredits(await getCredits(obj.email))
      }else{
         console.log("not signed in")
      }
   }
   
   //decreacing users balance by the cost of their purchace
   const loseCoconuts = async (obj,val)=> {
      
      if(obj!=null){
         var balance = await getCredits(obj.email)
         console.log(balance)
         if (val + balance > 0){
            await addCredits(obj.email, val)
            await emptyCart(user.email)
            setCredits(await getCredits(obj.email))
         }
      }else{
         console.log("not signed in")
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
            <label>Send to:</label>
            {addressSelector}
            <input type="submit" value="Purchace cart" onClick={()=>{loseCoconuts(user,-1*t)}} className="check-btn"/>
            <Link to="/cart">
               <div className="check-btn" onClick={() => initialiseState()}> Back to cart </div>
            </Link>
            <div className="check-btn" onClick={()=>{getCoconuts(user)}}> Get Coconuts </div>
            </div>
        </React.Fragment>
    )
}
