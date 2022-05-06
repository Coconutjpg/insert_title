import React from "react"
import "../stylesheets/card.css"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { addToCart, updateQuantity } from "../utils/database_functions"
import { user } from "../utils/userDetails"

export default function Card(props){

    /**
     * state containing the item which is passed in as a property of the tag
     */
    let navigate = useNavigate()
    const [item] = useState(props.item)
    const [path] = useState("/item/:id=" + props.item.id)
    const [type] = useState(props.type)
    const [quantity, setQuantity] = useState(props.quantity)

    //console.log(props.item)
    /**
     * object that simply takes on the value of the item within state
     */

    /** 
     * @param {int} start lower bound
     * @param {int} end upper bound
     * 
     * gives me an array with in a range from start to end range including
     * this is useful because react needs arrays to map to elements.
     */ 
    const range = (start, end) => {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    /**
     * 
     * @param {*} i the index
     * @returns <span/> containing a star that is lit or dark depending on whether
     *          i is <> the item_rating
     */

    
    const getStar = (i) =>{
        if(item.rating - i >= 1){
            return<span key={i} className="fa fa-star checked"/>
        } else if (item.rating - i >= -0.5){ // acounting for half stars
            return <span key={i} className="fa fa-star"/>
        } else{
            return <span key={i} className="fa fa-star"/>
        }
    }

    const add = (num) => {
        var proposed = quantity + num
        console.log(proposed)
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

    const getFooter = () => {
        if(type == "basic") {
            return(
                <div className="rating">
                    {range(1, 5).map((i) =>{
                        return getStar(i)
                    })}
                    <p>C {item.cost}</p>
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
            if(type == 'basic') navigate(path)
        }}>
            <img src={props.item.image_links[0]}/>
            <h4>{item.brand}</h4>
            <h4>{item.name}</h4>
            {getFooter()}   
            
        </div>
    );
}