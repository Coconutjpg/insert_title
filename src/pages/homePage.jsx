import React from "react"
import { getProductsByCategory } from "../utils/database_functions";
import { element } from "prop-types";
import Card from "../components/card";
import "../stylesheets/home.css"


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

    render(){
        this.getlist("Graphics_Cards")
        //alert(this.state.items)

        return(
            <div className="main">
                <h1>Home Page</h1>
                <div className="container">

                <script>
                    alert(hello)
                </script>
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