import React from 'react'
import { useState } from 'react'

/**
 * 
 * @param {*} props 
 * @returns individual star
 */
function Star (props){

    // set hover_rating to the index of the star
    const hover = () => {
        props.on_hover(props.index)
    }


    // set hover_rating to zero when user stops hovering over star
    const end_hover = () => {
        props.on_hover(0)
    }
    
    // get class name based on the rating 
    if (props.rating < props.index){
        return (
            <span 
                key={props.index} 
                onMouseOver = {hover}
                onMouseLeave={end_hover} 
                className="fa fa-star unchecked"
            />
        )
    } else {
        return <span key={props.index} onMouseLeave={end_hover} className="fa fa-star checked"/>
    }
}


/**
 * 
 * @param {*} props
 * @returns display for the rating of a product
 * 
 * props.item             => the item this rating is for 
 * 
 * props.rating           => the rating of the item
 * 
 * props.open             => true (can take rating); false (dont take rating from user)
 * 
 * props.rate             => passes the rating back to the card for processing (callback)
 * 
 */

export function Stars (props) {
    
    const [hover_rating, set_hover_rating] = useState(0)
    const [rating, set_rating] = useState(props.rating)
    const [open] = useState(props.open) // refers to whether the item is open for rating

    const get_rating = () => {
        if (hover_rating == 0 || !open) {
            return rating       // user is not trying to rate so display current rating of the product
        } else {
            return hover_rating // display rating the user is about to set
        }
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
     * allows the user to cast a vote given the item is ratable
     */
    const cast_rating = () => {
        if(open && hover_rating > 0) {
            props.rate(hover_rating)
        }
    } 


    return (
        <div onClick={cast_rating}>{
            range(1, 5).map(i => {
                return <Star key={i} index = {i} rating={get_rating()} on_hover={set_hover_rating} rate={cast_rating}></Star>
            })
        }</div>
    )



}