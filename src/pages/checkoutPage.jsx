import React from "react"
import { getCart, getProduct } from "../utils/database_functions";
import "../stylesheets/checkout.css"
import { user } from "../utils/userDetails";


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
            
<div class="check-col-25">
<h2 id="checkoutTitle">Checkout</h2>

  <div class="check-container">
    <h4>Cart <span class="check-price" style="color:black"><i class="fa fa-shopping-cart"></i> <b>{this.getTotQuantity}</b></span></h4>
      {this.renderCartList}
    <hr/>
    <p>Total <span class="check-price" style="color:black"><b>C{this.renderTotal}</b>
      
    </span></p>
            <input type="submit" value="Purchace cart" className="check-btn"/>
            <Link to="/cartPage">
                    <div> <span className="check-btn"></span> Back to cart </div>

                </Link>


  </div>
</div>


           
        );
    }
}