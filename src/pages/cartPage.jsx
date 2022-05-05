import React from "react";
import { useEffect, useState } from "react";
import { getCart, getProduct } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import Card from "../components/card";

export function Cart(props){ 
    const [items, setItems] = useState([])
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)

    if(!loaded && user!=null){
        console.log("loaded")
        Promise.resolve(getCart(user.email)).then((result) => {
            setItems(result[1])
            setLoaded(true)
            result[1].forEach(product => {
                //console.log(product)
                Promise.resolve(getProduct(product.product_id)).then((item) => {
                    console.log(item)
                    const card = (<Card key={product.product_id} item={item[1]} type="cart-item" quantity={product.quantity}></Card>)
                    products.push(card)
                    setProducts([...products])
                })
            });
        })
    }

    return(
        <React.Fragment>
            <h1>Hello</h1>
            <div className="cart">
                {products.map((product) => {
                    return product
                })}
            </div>
            
        </React.Fragment>
    )
}