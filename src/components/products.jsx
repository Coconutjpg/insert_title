import React from "react"
import "../App.css"
import { getProductsByCategory } from "../utils/database_functions";
import Card from "./card";
export default class Products extends React.Component{

   state = {
      category: this.props.category
   }

   items = []

   categorySelect = (event) =>{
    /*  const target = event.target
      const name = target.name
      const value = target.value

      this.getProducts(value)*/
   }

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
        
        //console.log(this.state);
    }
    render(){
       console.log(this.props.category)
       this.getProducts(this.props.category)
        return(
         
         <div> 
            <div className="container">
                  {
                     this.items.map((item) =>{
                           return <Card key={item.id}item={item}/>
                     })
                  }
               </div>
                
         </div>


        );
    }
    
}