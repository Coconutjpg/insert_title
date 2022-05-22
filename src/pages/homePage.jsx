import React from "react"
import { getCategories, getProductsByCategory } from "../utils/database_functions";
import "../stylesheets/style.css"
import Slider from "../components/Slider"
import Products from "../components/products";
import { Link, useNavigate } from "react-router-dom"
import { Recommendations } from "../components/recommendations";



export default class HomePage extends React.Component{

    constructor(){
        super()
        this.listCategories()
    }

    //State variables
    state = {
        items : [],
        req_complete : false.valueOf,
        category : "All",
        categories: []
    }
    
    //function to display particuler categories
    listCategories = () =>{
        console.log("sigh")
        Promise.resolve(getCategories()).then((cats) => {
            this.setState({categories : cats[1]})
            this.renderSwitch()
        })
    }

     // keeps track of values that change on the DOM
     handleInputChange = (event) => {

        const target = event.target;
        const name = target.name;
        const value = target.value;
        
        this.setState({
            [name]: value
        })
        
        console.log(value);
    }

    render(){
        return(
            
            <div>
                 {/*<Slider/> coming in the next sprint*/}
                {/*filter dropbox */}
                <h2 className="sectionHeader">PRODUCTS</h2>
                <div className="row row-2 container2">
                    <Recommendations type="general"></Recommendations>
                </div>
            {/* displays categories */}

                <div style={{display:"flex", flexWrap:"wrap"}}>
                {
                    this.state.categories.map((category) => {
                        return (
                            <div className="child_pair" key={category.id}>
                                <Slider key={"slide" + category} category = { category.id }/>
                            </div> 
                        )   //displaying categories
                    })
                }  
                </div>
            </div>

        );
    }
}
