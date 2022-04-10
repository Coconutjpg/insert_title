import React, {useState} from 'react'
import "../stylesheets/Slider.css"
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'

export default function Slider() {

    const [slideIndex, setSlideIndex] = useState(1)

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
            {dataSlider.map((obj, index) => {  //mapping object id's to images  returning images 
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"} //logic for making particular image display
                    >
                        <img 
                        src={process.env.PUBLIC_URL + `./Imgs/ad${index + 1}.jpg`} //refferencing image from
                        />
                        {/*when we run npm build, we add our custom url, done with process.env.PUBLIC_URL*/}
                    </div>
                )
            })}
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