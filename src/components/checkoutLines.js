import React from "react"
import "../stylesheets/checkout.css"
import { useState, useEffect } from "react"
import { user } from "../utils/userDetails"

export default function checkoutLines(props){
    const [name] = useState(props.name)
    const [price] = useState(props.price)
    return (
 <ul><a href="#">{name}</a> <span className="check-price">C{price}</span></ul>     
    );
}