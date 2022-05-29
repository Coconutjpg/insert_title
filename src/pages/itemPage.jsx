import Card from "../components/card"
import { addToCart, getCategories, getProduct, getOrderedProducts, getRatingsWithSorting_Limits } from "../utils/database_functions"
import "../stylesheets/itemPage.css"
import { useNavigate, useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import { user } from "../utils/userDetails"
import { Recommendations } from "../components/recommendations"
import { ReviewCreator, Review } from "../components/review"


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
    const[suggestions, setSuggestions] = useState()
    const[reviews, setReviews] = useState([])   // store the reviews
    const[desired_rating, set_desired_rating] = useState(0)
    const[show_review_box, set_show_review_box] = useState(false)

    const rate = (rating) => {
        set_desired_rating(rating)

        if(user != null) {
            Promise.resolve(getOrderedProducts(user.email)).then( result => { 
                const ordered = result[1]               
                if(ordered.indexOf(item_id) > -1){
                    set_show_review_box(true)
                }
            })
        }
        
       
        
    }

    const getItem = () =>{
        // only ocours if there is a change of id
        if(id != currId){
            Promise.resolve(getProduct(item_id)).then((_details) => {
                setItem(<Card key={item_id} item={_details[1]} type="showcase" rating_prompt={rate}></Card>) 
                setDetails(_details[1])
                setCurrId(id)
                setSuggestions(<Recommendations key={item_id} type="item" item_id={item_id}></Recommendations>)
            }) 

            Promise.resolve(getRatingsWithSorting_Limits(item_id, 'asc', 0, 50)).then( result => {
                console.log(result)
                var _reviews = result[1]
                setReviews(_reviews)      
            })
        }
    }

    const displayReviewBox = () => {
        if(show_review_box == true){
            console.log("ahem")
            return (
                <ReviewCreator 
                    details = {details} 
                    desired_rating={desired_rating} 
                    exit = {() => {set_show_review_box(false)}}
                >

                </ReviewCreator>)
        }
        
    } 

    // add item to cart
    const add_to_cart = () => {
        if(user != null){
            addToCart(user.email, item_id)   //add item to cart
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

    useEffect( () => {
        getItem()
    })
    
   
    return (
        <div style={{height:"100%"}}>
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

                <div style={{position: "inherit", top:0 + "px", width:"70%"}}> {/*todo: place description on top*/}
                    <h3>Description</h3>
                    <p>{details.description}</p>
                </div>

                <div style={{width:"30%"}}>
                    <h3>Reviews</h3>
                    {
                        reviews.map(review => {
                            return <Review key={Math.random()} review={review}></Review>
                        })
                    }
                </div>
            </div>
            <div>
                <h3>Goes well with</h3>
                {suggestions}
                
            </div>
            {displayReviewBox()}
            <div id="snackbar"></div>
        </div>
    );
}
