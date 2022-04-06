import React from "react"
import "../stylesheets/card.css"

export default class Card extends React.Component{

    state = {
        item : this.props.item
    }
 
    details = {
        item_name : this.state.item.name,
        item_image: this.state.item.image_link,
        item_price: this.state.item.cost,
        item_rating: this.state.item.rating,
        item_brand: this.state.item.brand
    }



    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    getStar = (i) =>{
        if(this.details.item_rating - i >= 1){
            return<span key={i} className="fa fa-star checked"/>
        } else if (this.details.item_rating - i >= -0.5){ // acounting for half stars
            return <span key={i} className="fa fa-star"/>
        } else{
            return <span key={i} className="fa fa-star"/>
        }
    }

    render() {
        return (
            <div className="card">
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