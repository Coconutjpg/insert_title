import React from "react"
import "../stylesheets/card.css"
import { clicked } from "../utils/database_functions"
import { user } from "../utils/userDetails"

export default class Card extends React.Component{

    /**
     * state containing the item which is passed in as a property of the tag
     */
    state = {
        item : this.props.item
    }


    /**
     * object that simply takes on the value of the item within state
     */
    details = {
        item_name : this.state.item.name,
        item_image: this.state.item.image_link,
        item_price: this.state.item.cost,
        item_rating: this.state.item.rating,
        item_brand: this.state.item.brand
    }

    /** 
     * @param {int} start lower bound
     * @param {int} end upper bound
     * 
     * gives me an array with in a range from start to end range including
     * this is useful because react needs arrays to map to elements.
     */ 
    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    /**
     * 
     * @param {*} i the index
     * @returns <span/> containing a star that is lit or dark depending on whether
     *          i is <> the item_rating
     */
    getStar = (i) =>{
        if(this.details.item_rating - i >= 1){
            return<span key={i} className="fa fa-star checked"/>
        } else if (this.details.item_rating - i >= -0.5){ // acounting for half stars
            return <span key={i} className="fa fa-star"/>
        } else{
            return <span key={i} className="fa fa-star"/>
        }
    }

    handleClick = () =>{
        if(user != null){
            clicked(user.email, this.state.item.id)
        }
    }


    render() {
        return (
            <div className="card" onClick={this.handleClick}>
                <img src={this.details.item_image} />
                <h4>{this.details.item_brand}</h4>
                <h4>{this.details.item_name}</h4>
                <div className="rating">{
                    this.range(1, 5).map((i) =>{
                        return this.getStar(i)
                    })
                }</div>
                <p>R {this.details.item_price}</p>
          </div>
        );
    }
}