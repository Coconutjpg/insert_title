import React, { useState } from "react"
import Carousel from 'react-bootstrap/Carousel'
import { getProductsByCategory } from "../utils/database_functions"
import "react-bootstrap/cjs/Carousel"

export function Slides(params){
    const [items, setItems] = useState(params.items)
    const [promised, setPromised] = useState(false)
    const [done, setDone] = useState(false)

    const getProducts = (catagory) =>{
        const cat = catagory; // take input
        if(promised) return; // stops constant refresh
        setPromised(true)
        let prods = getProductsByCategory(cat);// assign this way just to be safe 
        //As products_in_categories_ is dependent on the async function, a promise is returned, 
        //thus we need to resolve that promise to get access to what was returned in the asynchronous function
        Promise.resolve(prods).then((arr)=>{
            setItems(arr)
            setDone(true)
        })
    }


    getProducts(params.category)

    const parsed_elements = () => {
        if(!done) return(<div></div>)
        return (
            items.map((item) => {
                return (
                    <Carousel.Item key={"carousel-"+item.id + Math.random(5)} interval={1000}>
                        <img
                            className="d-block w-100"
                            src={item.image_links[0]}
                            alt="https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png">
                        </img>
                    </Carousel.Item>
                )
            })
        )
    }

    return(
        <Carousel>
            {parsed_elements()}
        </Carousel>
    )

}