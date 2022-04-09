import React from "react"
import { getProductsByCategory } from "../utils/database_functions";
import "../stylesheets/style.css"
import Carousel from "../components/carousel";
import Products from "../components/products";

export default class HomePage extends React.Component{

    state = {
        items : [],
        req_complete : false.valueOf,
        category : "All"
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
    renderSwitch(cat) {
        console.log("cat = " + cat)
        switch(cat) {
            case "All":
                return( 
                    <div>
                        <Products category="Graphics_Cards"/>
                        <Products category="Monitors"/>
                    </div>
                );
            break;
            default :
                return(
                    <Products category={cat}/>
                )
            break

            
        }
      }
    render(){
        return(
            
            <div>
                <h2 className="sectionHeader">All Products</h2>
                <div className="row row-2 container2">
                <select >
                    <option>Filter By</option>
                    <option>price</option>
                    <option>popularity</option>
                    <option>rating</option>
                    <option>sale</option>
                    <option>category</option>
                </select>
                {/*onChange={this.categorySelect()} */}
                <select name="category" id="categorySelect" onChange={this.handleInputChange} >
                    <option value={"All"}>All Categories</option>
                    <option value={"Graphics_Cards"}>Graphics Cards</option>
                    <option value={"Monitors"}>Monitors</option>
                </select>

            </div>

            {this.renderSwitch(this.state.category)}  

            </div>

        );
    }
}