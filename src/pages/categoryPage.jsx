import Card from "../components/card"
import { addToCart, getCategories, getProduct, getProductsByCategory } from "../utils/database_functions"
import "../stylesheets/itemPage.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import Products from "../components/products"
import { setUser, user } from "../utils/userDetails"

export function CategoryPage(){

    // get id parameter from url
    let { id } = useParams()
    const nav = useNavigate()
    
    // state of the component
    const[category, setCategory] = useState(id.split('=')[1])  // category of the item

   
    return (
        <div>
           <Products key={category} category={category}/>
            
            <div id="snackbar"></div>
            
        </div>
    );
}
