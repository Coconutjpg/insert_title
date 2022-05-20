
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

async function simple_recommendations(){
    while(false){

    }

    return "done"
}

async function get_recommendations(item_id, type){
    const category = getCategoryOf(item_id);
    
    switch ( type ) {
        case "simple" : return Promise.resolve(simple_recommendations()); break
    }
}

export {get_recommendations}