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
     const [province] = useState(props.orderObject.province)
     const [city] = useState(props.orderObject.city)                  //variables for order items
     const [suburb] = useState(props.orderObject.suburb)

    const [street] = useState(props.orderObject.street)
    const [status] = useState(props.orderObject.status)
    const [orderNum] = useState(props.orderObject.number)


    /**

     * @param {int} rating 
     * 
     * add a star rating for this user
     */
 
    return (
        <li className="list-item">
            <div className="order-number">
            {orderNum}
            </div>
            <div className="list-item__content">
         <div className="province"> Province: {province} </div>        {/*displaying order item */}
          <div className="city"> City: {city} </div>
          <div className="suburb"> Suburb: {suburb}</div>
          <div className="street"> Street: {street}</div>
          <div className="status"> Status: {status}</div>



            </div>
        </li>
    );
}