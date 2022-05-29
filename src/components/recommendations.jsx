import React from 'react'
import { useState } from 'react'
import { get_recommendations } from '../utils/recommendations'
import Card from './card'

export function Recommendations(props){
    const [items, setItems] = useState([])
    const [promised, setPromised] = useState(false)

    if(!promised){
        setPromised(true)
        Promise.resolve(get_recommendations(props.type, props.item_id)).then( prods =>{
            setItems([...prods])
        } )
    }

    return(
        <div className='container'>
            {
                items.map((item) => {
                     return <Card key={item.id} item={item} type="basic"></Card>
                })
            }
        </div>
    )
}