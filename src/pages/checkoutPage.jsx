import React from "react"
import { getCart, getProduct } from "../utils/database_functions";
import "../stylesheets/checkout.css"
import { user } from "../utils/userDetails";
import { Link } from "react-router-dom";


export default class CheckoutPage extends React.Component{

 getCartList = ()=>{
   var total=0;
  let cartArr = []
  Promise.resolve(getCart(user.email)).then((result) => {
    result[1].forEach(product => {
      Promise.resolve(getProduct(product.product_id)).then((item) => {
          total += item.cost * product.quantity
        cartArr.push([product.product_id,item.name,item.cost])})
      })
    })
    return [cartArr,total];

  }

  getTotQuantity = ()=>{
    return this.getCartList[0].length;
  }

  renderCartList = () =>{
    const [cartArr,total] = getCartList;
    const list = cartArr.map(product => <ul key={product[0]}><a href="#">{product[1]}</a><span className="check-price">C{product[2]}</span></ul>)
    return <ul>{list}</ul>;

  }
  renderTotal = () =>{
    const [cartArr,total] = getCartList;
     return total;

  }


    render(){
        return(
            
<div className="check-col-25">
<h2 id="checkoutTitle">Checkout</h2>

  <div className="check-container">
    <h4>Cart </h4>
    <span className="check-price" style="color:black"><i className="fa fa-shopping-cart"></i> <b>{this.getTotQuantity}</b></span>
      {this.renderCartList}
    <hr/>
    <p>Total <span className="check-price" style="color:black"><b>C{this.renderTotal}</b>
      
    </span></p>
            <input type="submit" value="Purchace cart" className="check-btn"/>
            <Link to="/cart">
                    <btn className="check-btn">  Back to cart </btn>
            </Link>


  </div>
</div>


           
        );
    }
}