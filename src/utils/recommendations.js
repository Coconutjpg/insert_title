
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
        categories[1].forEach(category => {
            promises.push(
                //get a list of items in a category
                Promise.resolve(getProductsByCategory(category.id)).then(items=>{
                    items[1].forEach(item => {
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
        return getProductsByCategory(cat[1])
    })

}

async function fetchAsync (url) {
    let response = await fetch(url);
    console.log(response)
    let data = await response.json();
    return data;
}
async function get_recommendations(type, item_id){
    
    fetchAsync("http://localhost:8000/?type=click&point=[1,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]")
    //const category = getCategoryOf(item_id);
    switch ( type ) {
        case "simple" : {
            const s = (await Promise.resolve(simple_recommendations(item_id))[1]); 
            console.log(s)
            return s
        }
    }
}

export {get_recommendations}