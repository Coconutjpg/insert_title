import { createRating } from "./database_functions"
import { user } from "./userDetails"

export const performReview = async(product, rating, review) =>{

    /**validation can go here */

    console.log(rating + 1)
    if(user == null) return null

    return Promise.resolve(createRating(user.email, product.id, review, rating))

} 