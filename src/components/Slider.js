import React, {useState} from 'react'
import "../stylesheets/Slider.css"
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import { getProductsByCategory } from '../utils/database_functions'
import { Link, useNavigate } from "react-router-dom"


export default function Slider(params) {

    const [slideIndex, setSlideIndex] = useState(1)
    const [items, setItems] = useState([])
    const [promised, setPromised] = useState(false)
    const [done, setDone] = useState(false)
    let navigate = useNavigate()
    const [path] = useState("/category/:id=" + params.category)

    //sets items in state
    const getProducts = (catagory) =>{
        const cat = catagory; // take input
        setPromised(true)
        let prods = getProductsByCategory(cat);
        Promise.resolve(prods).then((result)=>{
            setItems(result[1])       
            setDone(true)
        })
    }

    if(!promised) getProducts(params.category)

    const get_image = ( ) =>{
        if(items.length > 0) {
            //console.log(items)
            return(<img src = {items[slideIndex].image_links[0]} className="swiper-slide"></img>)
        }
    }

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){  //display next image if there are more to show
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){ //loop back if we're at the last image
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1) //if we go back and there are images to go back to,decrement index of image fetched
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length) //if we go back whilst being on the first image, use the last index
        }
    }

    const moveDot = index => {
        setSlideIndex(index)      //set the index of the image to the index of the dot
    }

    return (
        <div className="container-slider">
        <div className="container-image"
         onClick = {() => {
                navigate(path)  //going to page with particular class name
        }}
        >
            {get_image()}
            </div>
            <BtnSlider moveSlide={nextSlide} direction={"next"} /> {/* used to dispay bttons */}
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">  {/*implementing pagination*/}
                {Array.from({length: 5}).map((item, index) => (
                    <div 
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}