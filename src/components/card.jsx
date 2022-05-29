import React from "react"
import "../stylesheets/card.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { addToCart, clicked, updateQuantity } from "../utils/database_functions"
import { user } from "../utils/userDetails"
import { Stars } from "./stars"


/**
 * 
 * @param {*} props 
 * 
 * item         => json object describing the item
 * quantity     => number of this item in the cart
 * type         => type of item ["basic", "cart-item", "showcase"]
 * 
 * @returns 
 */

export default function Card(props){

    /**
     * state containing the item which is passed in as a property of the tag
     */
    let navigate = useNavigate()
    const [item] = useState(props.item)
    const [path] = useState("/item/:id=" + props.item.id)
    const [type] = useState(props.type)
    const [quantity, setQuantity] = useState(props.quantity)

    /**
     * 
     * @param {int} rating 
     * 
     * add a star rating for this user
     */
    const cast_rating = (rating) => {
        
        props.rating_prompt(rating)
    }

    /**
     * 
     * @param {int} num 
     * 
     * used to add and subtract from the quantity of an item in the cart
     * prompts to remove product when subtraction would lead to a 
     * zero count
     * 
     */
    const add = (num) => {
        var proposed = quantity + num
        //console.log(proposed)
        if(proposed > 0){
            updateQuantity(user.email, props.item.id, proposed)
            setQuantity(proposed)
            props.onModify(num * item.cost)
        } else {
            if(window.confirm("Do you want to remove this item from your cart?")){
                Promise.resolve(updateQuantity(user.email, props.item.id, proposed)).then((result) => {
                    props.onModify(num * item.cost)
                    setQuantity(proposed)
                    props.remove()
                })
               
            } else {
                console.log("done")
            }
        }
    }

    /**
     * 
     * @returns an apropriate bottom section of of the item card depending on
     * what is required
     * 
     * cart-item => add and subtract buttons, 
     *              quantity
     *              total cost
     * 
     * basic =>     rating 
     *              price
     * 
     * 
     */

    const getFooter = () => {

        if(type == "basic") {
            return(
                <div className="rating">
                    <Stars key={Math.random()} open={false} rating = {item.rating}/>
                    <h4 className="currency">C {item.cost}</h4>
                </div> 
            )
        }

        if(type == "showcase") {
            return(
                <div className="rating">
                    <Stars key={Math.random()} rate={cast_rating} open={true} keep={false} rating = {item.rating}/>
                    <h4 className="currency">C {item.cost}</h4>
                </div> 
            )
        }

    

        if (type == "cart-item"){
            return(
                <div className="rating">
                    <h4>Unit Price: C {item.cost}</h4>
                    <h4>Quantity : {quantity}</h4>
                    <h4>Total : C {item.cost * quantity}</h4>

                    <button className="fa-solid fa-minus" id="subtract" onClick={()=>{add(-1)}}></button>
                    <button className="fa-solid fa-plus" id="add" onClick={()=>{add(1)}}></button>
                </div>
            )
        }        
    }


    return (
        <div className="card" onClick={() => {
            if(type == 'basic') { //
                if(user != null){
                    clicked(user.email, item.id)  //storing user click
                }
                navigate(path)  //going to page with particular class name
            }
        }}>
            <img src={props.item.image_links[0]}/>
            <h4>{item.brand}</h4>
            <h4>{item.name}</h4>
            {getFooter()}   
            
        </div>
    );
}