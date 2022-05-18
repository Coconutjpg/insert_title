import React, {useState} from 'react'
import "../stylesheets/Slider.css"
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import { getProductsByCategory } from '../utils/database_functions'

export default function Slider(params) {

    const [slideIndex, setSlideIndex] = useState(1)
    const [items, setItems] = useState([])
    const [promised, setPromised] = useState(false)
    const [done, setDone] = useState(false)

    const getProducts = (catagory) =>{
        const cat = catagory; // take input
        if(promised) return; // stops constant refresh
        setPromised(true)
        let prods = getProductsByCategory(cat);
        Promise.resolve(prods).then((arr)=>{
            console.log(arr)
            setItems(arr)
            setDone(true)
        })
    }

    getProducts(params.category)

    const get_image = ( ) =>{
        if(items.length > 0) {
            console.log(items)
            return(<img src = {items[slideIndex].image_links[0]}></img>)
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
            {get_image()}
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