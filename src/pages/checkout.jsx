//importing used modules and functions
import React from "react";
import { useEffect, useState } from "react";
import { addCredits, createOrder, emptyCart, getAddress, getAddressesIDs, getCart, getCredits, getProduct, getProductsInCartForOrder } from "../utils/database_functions";
import { refreshCredits, setCredits, user } from "../utils/userDetails";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/checkout.css";
import { AddressCard } from "../components/addressCard";
import "../stylesheets/order.css";



var heh = false

function AddressSelector(props){
   
   //initializing state
   const [promised, setPromised] = useState(false)
   const [addresses, setAddresses] = useState([])
   const [selected, setSelected] = useState(null)
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

   // called to change selected address
   const modifySelection = (address) => {
      setSelected(address)
      for(var a in addresses){
         if (addresses[a] == address) props.setAddrId(a)
      }
      props.func(address)
   }

   return (
      <div style={{flex:true}}>
         {  addresses.map(address =>{
            const c = <AddressCard className="addr-card" address={address} selected={false} hook={modifySelection} ></AddressCard>
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

   const navigate = useNavigate()

   const [items, setItems] = useState([])
   const [qty, setQty] = useState(0)
   const [t, setT] = useState(0)
   const [summaryLine,setSummaryLine] = useState([])
   const [loaded, setLoaded] = useState(false)
   const [addr, setAddr] = useState(null)
   const [addr_id, setAddrId] = useState(null)
   const [addressSelector] = useState(<AddressSelector func={setAddr} setAddrId={setAddrId}></AddressSelector>)

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
           setSummaryLine(list);
           setQty(list.length)
           //t==0?setQty(0):setQty(list.length);
         })
       })
     });
      //setting list of items
   }
   
   //user gets 1000 coconuts every time they click a button
   const getCoconuts = async (obj)=> {
      if(obj!=null){
         await addCredits(obj.email,10000)
         setCredits(await getCredits(obj.email))
      }else{
         console.log("not signed in")
      }
   }

   //decreasing users balance by the cost of their purchase
   const loseCoconuts = async (obj,val)=> {
      
      if(obj!=null){
         var balance = await getCredits(obj.email)
         if (val + balance > 0 && addr != null){
            var cart = await getProductsInCartForOrder(obj.email)
            cart = cart[1]
            console.log(cart)
            await createOrder(obj.email, cart, addr.number, addr.street, addr.suburb, addr.city, addr.province, addr.area_code, addr_id) 
            await addCredits(obj.email, val)
            await emptyCart(user.email)
            setCredits(await getCredits(obj.email))

            var snackbar = document.getElementById("snackbar")
            snackbar.className = "show";
            snackbar.innerHTML = "Purchase successfull";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); navigate('/home') }, 3000);

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
      setSummaryLine([]);
      setT(0);
      setQty(0);
   }
   
   // format address for display
   const format_addr = (addr) =>{
      if(addr != null){
         const s = addr.province + ", " + addr.city + ", " + addr.street + ", " + addr.number
         return s
      }
      return ""
   }
   return(
      <React.Fragment>
         <h1 id="checkoutTitle">Checkout</h1>

         <div className="check-container">

         <h3><b>Cart</b><span className="check-price" style={{color:"black"}}><i className="fa fa-shopping-cart"></i> <b>{qty}</b></span></h3>
            
            { //displaying cart details
            summaryLine.map((item) => {
               console.log(item.name)
               return(
                  <div key={item.id}>
                     <div>{item.name}<span className="check-price">C{item.cost}</span></div>
                  </div>
               )}
            )}
         <hr/>
         {/** Display the total */}
         <div>Total <span className="check-price" style={{color:"black"}}><b>C{t}</b>  </span></div>     
         <label>Send to: {format_addr(addr)}</label>
         {addressSelector}
         <input type="submit" value="Purchace cart" onClick={()=>{loseCoconuts(user,-1*t)}} className="check-btn"/>
         <Link to="/cart">
            {/* go back to cart */}
            <div className="check-btn" onClick={() => initialiseState()}> Back to cart </div>
         </Link>
         {/* go back to cart */}
         <div className="check-btn" onClick={()=>{getCoconuts(user)}}> Get Coconuts </div>
         </div>
      </React.Fragment>
   )
}