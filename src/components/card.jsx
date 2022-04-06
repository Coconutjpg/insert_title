import React from "react"
import "../stylesheets/card.css"

export default class Card extends React.Component{

    state = {
        item_id : this.props.item_id,
        item_name : this.props.item_name,
        item_price : this.props.item_price,
        item_rating : this.props.item_rating,
        item_image : this.props.item_image
    }

    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
    }

    getStar = (i) =>{
        if(this.state.item_rating - i >= 1){
            return<span className="fa fa-star checked"/>
        } else if (this.state.item_rating - i >= -0.5){ // acounting for half stars
            return <span className="fa fa-star"/>
        } else{
            return <span className="fa fa-star"/>
        }
    }

    render() {
        return (
            <div className="card">
                <img src={this.state.item_image} />
                <h4>{this.state.item_name}</h4>
                <div className="rating">{
                    this.range(1, 5).map((i) =>{
                        return this.getStar(i)
                    })
                }</div>
                <p>R{this.state.item_price}</p>
          </div>
        );
    }
}