import Card from "../components/card"
import { addToCart, getCategories, getProduct, getProductsByCategory } from "../utils/database_functions"
import "../stylesheets/itemPage.css"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import Products from "../components/products"
import { user } from "../utils/userDetails"

async function getCategoryOf(id){
    var promises = []
    var found = false
    return Promise.resolve(getCategories()).then((categories) => {
        categories.forEach(category => {
            promises.push(
                Promise.resolve(getProductsByCategory(category.id)).then(items=>{
                    items.forEach(item => {
                        if (item.id == id) {
                            found = category.id
                        }   
                    });  
                    return found
                })
            )
        })
        
        return Promise.all(promises).then(()=>{
            return found
        })
        
    })
}

export function ItemPage(){

    let { id } = useParams()
    const item_id = id.split('=')[1]
    
    const[item, setItem] = useState(0)
    const[details, setDetails] = useState(0)
    const[category, setCategory] = useState(0)
    const[currId, setCurrId] = useState("")

    const getItem = () =>{
        if(id != currId){
            Promise.resolve(getProduct(item_id)).then((_details) => {
                setItem(<Card key={item_id} item={_details[1]}></Card>)
                setDetails(_details[1])
                setCurrId(id)
                Promise.resolve(getCategoryOf(item_id)).then((cat) => {
                    setCategory(<Products category={cat}/>)
                })
            }) 
        }
    }


    const add_to_cart = () => {
        addToCart(user.email, item_id)
        console.log("added to cart")
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
            
        </div>
    );
}