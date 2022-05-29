import React from 'react'
import { useState } from 'react'
import { getUserDetails } from '../utils/database_functions'
import { user } from '../utils/userDetails'
import { Stars } from './stars'


function ReviewCreator(){
    
    if(user != null)
        return(
            <div>
                <h4> user.display_name </h4>
            </div>
        )
}

export function Review(props){

    const[ review ] = useState( props.review )
    const[ user_details, set_details ] = useState(false)

    // ensuring this only runs once
    if(user_details == false){
        set_details(true) // "" is a placeholder (not null)
        console.log(review)
        Promise.resolve(getUserDetails(review.rating_user)).then( result => {
            //username = result[1]
            
            console.log(result)
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