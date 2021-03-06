import React from 'react'
import { useState } from 'react'
import { getOrderedProducts, getUserDetails } from '../utils/database_functions'
import { user } from '../utils/userDetails'
import { Stars } from './stars'
import Card from './card'
import { useEffect } from 'react'
import { performReview } from '../utils/rating'
import { useNavigate } from 'react-router-dom'


/**
 * 
 * @param {*} props 
 * @returns 
 * 
 * props.details => Details of the item
 * 
 * props.desired_rating => desired rating of the user
 * 
 * 
 */
export function ReviewCreator(props){

    const [details, setDetails] = useState(props.details)
    const [desired_rating, set_desired_rating] = useState(props.desired_rating)
    
    // style for the review box
    const style = {
        position:"absolute",
        marginLeft:"25%",
        marginTop:"10px",
        top:"25%",
        height:"fit-content",
        width:"50%",
        display:"flex",
        flexDirection:"horizontal",
        padding:"5mm"
    } 

    if(desired_rating != details.rating){
        details.rating = desired_rating
        setDetails(details)
    }


    // choose how many stars
    const rate = (rating) => {
        set_desired_rating(rating)
    }


    // close the rating popup
    const exit = () => {
        props.exit()
    }

    // submit review for verification and ultimately submission to db
    const submit_rating = () => {
        const ta = document.getElementById("review-area")
        Promise.resolve(performReview(details, desired_rating, ta.value)).then( (result) =>{
            if(result == "success"){
                var snackbar = document.getElementById("snackbar")
                snackbar.className = "show";	
                snackbar.innerHTML = "You have successfully cast your rating";
                setTimeout(
                    function(){ snackbar.className = snackbar.className.replace("show", ""); window.location.reload();}, 3000);
            } else {
                var snackbar = document.getElementById("snackbar")
                snackbar.className = "show";	
                snackbar.innerHTML = "Something went wrong with your submission";
                setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); exit();  }, 3000);
            }
            
        })

    }


    // cancel the process of rating
    const cancel = () => {
        exit()
    }

    return(
        <div className="container" style={style}>
            <Card type="showcase" item={details} rating_prompt={rate} style={{float:"left"}}></Card>
            <div style = {{flexDirection:"vertical"}}>
                <textarea id= "review-area"style={{width:"100%", height:"80%", margin:"10px", minHeight:"3cm", resize:"none"}} ></textarea>
                <div style={{justifyContent:"space-between", width:"100%"}}>
                    <button style={{paddingTop:"0px", paddingBottom:"0px" ,paddingLeft:"10px", paddingLeft:"10px", margin:"50px"}} onClick={submit_rating}>Done</button>
                    <button style={{paddingTop:"0px", paddingBottom:"0px" ,paddingLeft:"10px", paddingLeft:"10px", margin:"5px", backgroundColor:"red"}} onClick={cancel}>Cancel</button>
                </div>
            </div>
            <div id="snackbar"></div>
        </div>
    )
}

export function Review(props){

    const[ review ] = useState( props.review )
    const[ user_details, set_details ] = useState(false)

    // ensuring this only runs once
    if(user_details == false){
        set_details(true) // "" is a placeholder (not null)
        Promise.resolve(getUserDetails(review.rating_user)).then( result => {
            set_details(result[1])
        })
    }

    // displaying the reviews once the username of the review is retrieved
    if (user_details != null && user_details != {})
        return(
            <div style={{margin:"10mm", overflow:"auto"}} className="container">
                <div>
                    <h4 style={{marginLeft:"10%", marginRight: "90%", float:"left"}}>{user_details.firstName}</h4>
                    <Stars style={{marginLeft:"10%"}} rating={review.rating_score}></Stars>
                </div>  
                <p style={{marginLeft: "15%", float:"left"}}>{review.review}</p>
            </div>
        )

    else return(null)
}