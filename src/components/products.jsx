import React from "react"
import "../App.css"
import { getCategories, getProductsByCategory } from "../utils/database_functions";
import Card from "./card";

export default class Products extends React.Component{

    // contains the category passed in as a property
    state = {
        category: this.props.category
    }

   items = []

   

   getProducts = (catagory) =>{
      const cat = catagory; // take input
      if(this.state.req_complete) return; // stops constant refresh

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
        
    }
    render(){
       this.getProducts(this.props.category) //settign state
        return(
         
        
            <div className="container">
                  {
                        this.items.map((item) =>{
                            item.category = this.props.category
                            return <Card key={item.id}item={item} type="basic"/>  //returning card objects
                        })
                  }
               </div>
                
         


        );
    }
    
}