import React from "react";
import { useEffect, useState } from "react";
import { getCart, getProduct } from "../utils/database_functions";
import { user } from "../utils/userDetails";
import Card from "../components/card";
import { Link } from "react-router-dom";

var total = 0

export function Cart(props){ 
    const [items, setItems] = useState([])
    const [products, setProducts] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [t, setT] = useState(total)

    const modify = (modification) => {
        total += modification
        setT(total)
    }

    const remove = () => {
        setItems([])
        setProducts([])
        setLoaded(false)
    }

    if(!loaded && user!=null){
        total=0
        Promise.resolve(getCart(user.email)).then((result) => {
            setItems(result[1])
            setLoaded(true)
            result[1].forEach(product => {
                //console.log(product)
                Promise.resolve(getProduct(product.product_id)).then((item) => {
                    total += item[1].cost * product.quantity
                    setT(total)
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

            <div>
                <p>Total: {t}</p>
                <Link to="/checkout">
                    <div> <span className="fa-solid fa-check"></span> Checkout </div>
                </Link>
                
            </div>
            
        </React.Fragment>
    )
}