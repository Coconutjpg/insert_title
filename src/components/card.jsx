import React from "react"
import "../stylesheets/card.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { selected_item, set_selected_item } from "../App"

export default function Card(props){

    /**
     * state containing the item which is passed in as a property of the tag
     */

    const [item, setItem] = useState(0)
    const [path, setPath] = useState(1)

    useEffect(() =>{
        setItem(props.item)
        setPath("/item/id=" + item.id)
        //console.log(item.image_links)
    })
    
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

    return (
        <Link to={path}>
        <div className="card" onClick={() => {set_selected_item(item)}}>
            <img src={props.item.image_links[0]}/>
            <h4>{item.brand}</h4>
            <h4>{item.name}</h4>
            <div className="rating">{
                range(1, 5).map((i) =>{
                    return getStar(i)
                })
            }</div>
            <p>R {item.cost}</p>
            
        </div>
        </Link>
    );
}