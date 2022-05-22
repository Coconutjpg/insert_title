import React from "react"
import { getCategories, getProductsByCategory } from "../utils/database_functions";
import "../stylesheets/style.css"
import Slider from "../components/Slider"
import Products from "../components/products";


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

    /**
     * 
     * @param {string} cat category
     * @returns 
     * display products depending on category
     */
    renderSwitch(cat) { 
        console.log("cat = " + cat)
        switch(cat) {
            case "All":
                return( 
                    <div>
                    {
                        this.state.categories.map((category) => {
                            console.log("slide" +cat +  Math.round(Math.random() * 100))
                            return (
                                <div key={category.id}>
                                    <Slider key={"slide" + cat} category = { category.id }/>
                                </div> 
                            )   //displaying categories
                        })
                    }  
                    </div>
                );
            break;
            default :
                return(
                    <Products key={cat} category={cat}/>
                )
            break

            
        }
      }
    render(){
        return(
            
            <div>
                 {/*<Slider/> coming in the next sprint*/}
                {/*filter dropbox */}
                <h2 className="sectionHeader">Products</h2>
                <div className="row row-2 container2">
                <select >
                    {/*Drop down menu for filters*/}
                    <option>Filter By</option>     
                    <option>price</option>
                    <option>popularity</option>
                    <option>rating</option>
                    <option>sale</option>
                    <option>category</option>
                </select>
                {/*category dropbox */}
                <select name="category" id="categorySelect" onChange={this.handleInputChange} >
                    <option value={"All"}>All Categories</option>
                    <option value={"Graphics_Cards"}>Graphics Cards</option>
                    <option value={"Monitors"}>Monitors</option>
                </select>

            </div>
            {/* displays items */}
            {this.renderSwitch(this.state.category)}  

            </div>

        );
    }
}
