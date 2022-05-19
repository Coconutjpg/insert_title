import Card from "../components/card"
import { db } from "../App.js"
import "../stylesheets/itemPage.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import Products from "../components/products"
import { setUser, user } from "../utils/userDetails"


/**
 * 
 * @param {string} id 
 * @returns the category of an item
 */
async function getCategoryOf(id){
    var promises = []
    var found = false
    //get all categories
    return Promise.resolve(db.getCategories()).then((categories) => {
        //check which category the element is in
        categories.forEach(category => {
            promises.push(
                //get a list of items in a category
                Promise.resolve(db.getProductsByCategory(category.id)).then(items=>{
                    items.forEach(item => {
                        if (item.id == id) {
                            found = category.id
                        }   
                    });  
                    return found
                })
            )
        })
        
        //return the category of the item
        return Promise.all(promises).then(()=>{
            return found
        })
        
    })
}

export function ItemPage(){

    // get id parameter from url
    let { id } = useParams()
    const item_id = id.split('=')[1]
    const nav = useNavigate()
    
    // state of the component
    const[item, setItem] = useState(0)          // item in question
    const[details, setDetails] = useState(0)    // details of the item
    const[category, setCategory] = useState(0)  // category of the item
    const[currId, setCurrId] = useState("")     // the id of the item currently being displayed

    const getItem = () =>{
        // only ocours if there is a change of id
        if(id != currId){
            Promise.resolve(db.getProduct(item_id)).then((_details) => {
                setItem(<Card key={item_id} item={_details[1]} type="showcase"></Card>) 
                setDetails(_details[1])
                setCurrId(id)
                Promise.resolve(getCategoryOf(item_id)).then((cat) => {
                    setCategory(<Products category={cat}/>)
                })
            }) 
        }
    }

    // self explanatory
    const add_to_cart = () => {
        if(user != null){
            db.addToCart(user.email, item_id)   //add item to cart
            var snackbar = document.getElementById("snackbar")
            snackbar.className = "show";	
            snackbar.innerHTML = "Adding Item to Cart";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);  //displaying snackbar for 3s
        } else {
            var snackbar = document.getElementById("snackbar")  
            snackbar.className = "show";	
            snackbar.innerHTML = "You need to be logged in to have a cart";
            setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        }
        
    }

    getItem()
   
    return (
        <div>
            <div className="horizontal">
                <div>
                    <h3>Item</h3>
                    <div>
                        {item}
                    </div>  
                    <div>
                        <button className="fa-solid fa-shopping-cart" onClick={add_to_cart}></button>
                    </div>   
                </div>
                <div>
                    <h3>Description</h3>
                    <p>{details.description}</p>
                </div>
            </div>
            <div>
                <h3>You May Also Like</h3>
                {category}
            </div>
            <div id="snackbar"></div>
            
        </div>
    );
}
