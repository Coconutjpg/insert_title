import React from "react";
import { useEffect, useState } from "react";
import { getCart, getProduct } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import Card from "../components/card";
import { Link } from "react-router-dom";

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
    if(!loaded && user!=null){
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
        <React.Fragment>
            <h1>Cart</h1>
            <div className="container">
                {products.map((product) => {
                    return product
                })}
            </div>

            <div>
                <p>Total: {t}</p>
                <Link to="/checkoutPage">
                    <div> <span className="fa-solid fa-check"></span> Checkout </div>
                </Link>
                
            </div>
            
        </React.Fragment>
    )
}