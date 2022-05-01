//import React from "react"
import { user } from "../utils/userDetails"
import Card from "../components/card"
import { getProduct } from "../utils/database_functions"
import "../stylesheets/itemPage.css"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import Products from "../components/products"

export function ItemPage(){

    let { id } = useParams()
    const item_id = id.split('=')[1]
    
    const[item, setItem] = useState(0)
    const[details, setDetails] = useState(0)
    const[loaded, setLoaded] = useState(false)

    const getItem = () =>{
        if(!loaded){
            Promise.resolve(getProduct(item_id)).then((_details) => {
                setItem(<Card key={item_id} item={_details[1]}></Card>)
                setDetails(_details[1])  
                setLoaded(true)
            }) 
        }
    }

    console.log(details)
    useEffect(() =>{
        getItem()
    }, [])
   
    return (
        <div>
            <div className="horizontal">
                <div>
                    <h3>Item</h3>
                    <div>
                        {item} 
                    </div>
                    
                   <div>
                       <button className="fa-solid fa-shopping-cart"></button>
                   </div>   
                </div>
                <div>
                    <h3>Description</h3>
                    <p>{details.description}</p>
                </div>
               
               
            </div>
            <div>
                <h3>You May Also Like</h3>
                <Products category="Monitors"/>
            </div>
            
        </div>
    );
}