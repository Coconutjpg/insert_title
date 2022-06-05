import {getOrdersIDs,getOrder} from "../utils/database_functions"
import "../stylesheets/order.css"
import { useNavigate, useParams } from "react-router-dom"
import { useState , useEffect } from "react"
import { user } from "../utils/userDetails"
import { OrderItem } from "../components/orderItem"


export default function OrderHistory(){
    const [orders,setOrders] = useState([]) //array storing order objects
    const[loaded,setLoaded] = useState(false)
    const getOrderObjects = ()=>{
        let order_arr = []
        
        Promise.resolve(getOrdersIDs(user.email)).then(result => {  
            let arr=result[1];  //using all the users order id's...
            if(arr!=null){  //only get the orders if the user has 1 or more order id's
                console.log("intended" + JSON.stringify(arr))
            for (var i = 0; i < arr.length; i++) { 
                Promise.resolve(getOrder(arr[i])).then(result =>{   //...get an order object....
                    let order_object = result[1]
                    order_arr.push(order_object)   
                    setOrders(order_arr);
                    //...and add that object to the array
                })
             }
            }
        })
    }
    useEffect( () => {
        if(user!=null && loaded==false){
            console.log("loaded" + loaded)
            setLoaded(true);
        getOrderObjects();  //initialising our state
        }

    })
    
    return (
        <div className="list-wrapper">
        <h1>Order History</h1>
        <ul className="list">
                    {
                        //orders is an array of order objects. for each order object, display an order item 
                        orders.map(orderObj => {
                            console.log(orderObj)
                            return <OrderItem  key={Math.random()}  orderObject={orderObj}></OrderItem>
                        })
                    }
        </ul>
        </div>
    );
}
