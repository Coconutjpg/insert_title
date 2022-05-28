import { createRating } from "./database_functions"
import { user } from "./userDetails"

export const performReview = async(product, rating, review) =>{

    /**validation can go here */


    if(user == null) return null

    return Promise.resolve(createRating(user.email == null), product.id, review, rating)

} 