import React from "react"
import "../stylesheets/order.css"
import { useState, useEffect } from "react"

/**
 * 
 * @param {*} props 
 * ]
 * 
 * @returns 
 */

export  function OrderItem(props){

    /**
     * state containing the item which is passed in as a property of the tag
     */
    const [orderNum] = useState(props.orderObject.number)
    const [purchaceDate] = useState(props.orderObject.street)
    const [arrivalDate] = useState(props.orderObject.suburb)
    const [orderStatus] = useState(props.orderObject.status)

    /**
     * 
     * @param {int} rating 
     * 
     * add a star rating for this user
     */
 
    return (
        <li class="list-item">
            <div class="order-number">
            {orderNum}
            </div>
            <div className="list-item__content">
         <div className="purchace_date"> Purchace Date: {purchaceDate} </div>
          <div className="arrival_date"> Arrival Date: {arrivalDate} </div>
          <div className="status"> Status: {orderStatus}</div>
    
            </div>
        </li>
    );
}