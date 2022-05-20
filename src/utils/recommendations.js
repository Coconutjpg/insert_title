
import { getProductsByCategory, getCategories } from "./database_functions"

/**
 * 
 * @param {string} id 
 * @returns the category of an item
 */
 async function getCategoryOf(id){
    var promises = []
    var found = false
    //get all categories
    return Promise.resolve(getCategories()).then((categories) => {
        //check which category the element is in
        categories.forEach(category => {
            promises.push(
                //get a list of items in a category
                Promise.resolve(getProductsByCategory(category.id)).then(items=>{
                    items.forEach(item => {
                        if (item.id == id) {
                            found = category.id
                        }   
                    });  
                    return found
                })
            )
        })
        
        //return the category of the item
        return Promise.all(promises).then(()=>{
            return found
        })
        
    })
}

async function simple_recommendations(item_id){

    return await Promise.resolve(getCategoryOf(item_id)).then((cat) => {
        return getProductsByCategory(cat)
    })

}

async function get_recommendations(type, item_id){
    //const category = getCategoryOf(item_id);
    switch ( type ) {
        case "simple" : {
            const s = await Promise.resolve(simple_recommendations(item_id)); 
            console.log(s)
            return s
        }
    }
}

export {get_recommendations}