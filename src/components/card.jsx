import React from "react"
import "../stylesheets/card.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

var loaded = false

export default function Card(props){

    /**
     * state containing the item which is passed in as a property of the tag
     */

    const [item, setItem] = useState(0)
    const [path, setPath] = useState(1)

    useEffect(() =>{
        console.log(props.item)
        setItem(props.item)
        setPath("/item/id=" + details.item_id)
    })
    
    //console.log(props.item)
    /**
     * object that simply takes on the value of the item within state
     */


    const details = {
        item_id : item.id,
        item_name : item.name,
        item_image: item.image_link,
        item_price: item.cost,
        item_rating: item.rating,
        item_brand: item.brand
    }

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
        if(details.item_rating - i >= 1){
            return<span key={i} className="fa fa-star checked"/>
        } else if (details.item_rating - i >= -0.5){ // acounting for half stars
            return <span key={i} className="fa fa-star"/>
        } else{
            return <span key={i} className="fa fa-star"/>
        }
    }

    return (
        <Link to={path}>
        <div className="card">
            <img src={details.item_image} />
            <h4>{details.item_brand}</h4>
            <h4>{details.item_name}</h4>
            <div className="rating">{
                range(1, 5).map((i) =>{
                    return getStar(i)
                })
            }</div>
            <p>R {details.item_price}</p>
            
        </div>
        </Link>
    );
}