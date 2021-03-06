import React from "react";
import { useEffect, useState } from "react";
import { getCart, getProduct } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import Card from "../components/card";
import { Link } from "react-router-dom";
import "../stylesheets/style.css"
import Cookies from "universal-cookie"
var total = 0

export function Cart(props){ 

    //The state of the cart
    const [items, setItems] = useState([])          // contains data for things displayed
    const [products, setProducts] = useState([])    //contains each element to be displayed
    const [loaded, setLoaded] = useState(false)     // used to prevent infinite refresh around the main promise
    const [t, setT] = useState(total)

    //Called when the user increases or decreases the quantity of an item
    //in the cart
    const modify = (modification) => {
        total += modification
        setT(total)
    }

    //called when an element is removed from the cart
    const remove = () => {
        setItems([])
        setProducts([])
        setLoaded(false)
    }

    // loaded is to stop react from running the promise infinitely
    if(user==null){
        var cookies = new Cookies();
        // loaded is to stop react from running the promise infinitely
        if(!loaded ){
            total=0;
            
            setLoaded(true);
           
            var obj = cookies.get('holder',true);
            var arr=[]
            for(var product in obj){
              arr.push( {
                "quantity": obj[product],
                "product_id": product
              })
            
            }
            console.log(arr)
            arr.forEach(product => {
                product.product_id = product.product_id.split("=")[1];
                Promise.resolve(getProduct(product.product_id)).then((item) => {
                    console.log("fgh:" +product.product_id)
                    console.log("item bruv" + item[0])
                    total += item[1].cost * product.quantity
                    setT(total)

                    // use modified card for cart item
                    const card = (
                        <Card 
                            key={product.product_id} 
                            item={item[1]}  
                            type="cart-item" 
                            quantity={product.quantity}
                            onModify={modify}
                            remove={remove}>
                        </Card>
                    )
                    products.push(card)
                    setProducts([...products]) // use a copy of products (idk why, it just works)
                })
            });}

    }else if(!loaded && user!=null){
        total=0
        Promise.resolve(getCart(user.email)).then((result) => {
            setItems(result[1])
            setLoaded(true)
            result[1].forEach(product => {
                Promise.resolve(getProduct(product.product_id)).then((item) => {
                    total += item[1].cost * product.quantity
                    setT(total)

                    // use modified card for cart item
                    const card = (
                        <Card 
                            key={product.product_id} 
                            item={item[1]} 
                            type="cart-item" 
                            quantity={product.quantity}
                            onModify={modify}
                            remove={remove}>
                        </Card>
                    )
                    products.push(card)
                    setProducts([...products]) // use a copy of products (idk why, it just works)
                })
            });
        })
    }

    return(
        <div>
            <h1>Cart</h1>
            <div className="container">
        {/*displaying products*/}
                {products.map((product) => {
                    return product
                })}
            </div>

            <div>
                {/*displaying total*/}
                <p className="price">Total: C {t}</p>       
                <Link to="/checkoutPage">
                    <div className="containercheck" style={{fontSize: "30px"}}> <span className="fa-solid fa-check fa-sm"></span>Checkout </div>
                </Link>
                
            </div>
            
        </div>
    )
}
