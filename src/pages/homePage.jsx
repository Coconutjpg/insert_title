import React from "react"
import { getProductsByCategory } from "../utils/database_functions";
import { element } from "prop-types";
import Card from "../components/card";
import "../pages/home/style.css"
import Carousel from "../components/carousel";
import Products from "../components/products";

export default class HomePage extends React.Component{

    state = {
        items : [],
        req_complete : false
    }

    items = []

    // generates an item list retrieved from the db
    getlist = (catagory) =>{
        const cat = catagory; // take input
        if(this.state.req_complete) return;

        let prods = getProductsByCategory(cat);// assign this way just to be safe 
        //As products_in_categories_ is dependent on the async function, a promise is returned, 
        //thus we need to resolve that promise to get access to what was returned in the asynchronous function
        Promise.resolve(prods).then((arr)=>{
            this.items = arr
            this.setState({
                req_complete : true
            })
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
        
        console.log(this.state);
    }
    renderSwitch(cat) {
        switch(cat) {
          case 'All':
           return( 
           <div>
            <Products category="Graphics_Cards"/> 
            <Products category="Monitors"/>
            </div>
            );
          case 'Graphics_cards':
            return( 
                <div>
                 <Products category="Graphics_Cards"/> 
                 </div>
                 );
          case 'Monitors':
            return( 
                <div>
                 <Products category="Graphics_Cards"/> 
                 </div>
                 );
          default:
            return( 
                <div>
                 <Products category="Graphics_Cards"/> 
                 <Products category="Monitors"/>
                 </div>
                 );;
        }
      }
    render(){
        this.getlist("Graphics_Cards");
        //alert(this.state.items)

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
                    <option value="All">All Categories</option>
                    <option value="Graphics_Cards">Graphics Cards</option>
                    <option value="Monitors"> Monitors</option>
                </select>

            </div>
            {/*  <Carousel/> */}   
              {/* <Products/> */}
          {/*  {
                if(document.getElementById("categorySelect").value== "All"){
                   console.log("all elments selected");
                }
            }     */} 
           {/* <Products category="Graphics_Cards"/> 
            <Products category="Monitors"/>*/}
            {this.renderSwitch(this.state.categorySelect)}
                        
              
 
            </div>

        );
    }
}