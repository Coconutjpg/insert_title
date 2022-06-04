
import { async } from "@firebase/util";
import { getProductsByCategory, getCategories } from "./database_functions"

/**
 * 
 * @param {string} id 
 * @returns the category of an item
 */


var categories = [];
var products = [];

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

async function fetchAsync (url) {
//    console.log(url)
    let response = await fetch(url);
    let result = await response.json();
//    console.log(result);
    result = result.replace("\n", "")
    result = result.replace(/ +(?= )/g,'')
    result = result.substring(1, result.length -2)
    result = result.split(" ")
    for (var i = 0; i < result.length; i++){
        result[i] = parseFloat(result[i])
    }

    return(result)
}

function list_index(item_id, list){
    for (var i in list)
        for (var p in list[i])
            if (item_id == list[i][p].id){
                return i
            }
    
    return -1
}

function new_point(){
    const point = []
    for (var i = 0; i < categories.length;  i ++){
        point.push(0.0)
    }
    return point
}

async function detailedSuggestions(item_id){
    // generate 
    if(item_id != undefined){
        var category_index = list_index(item_id, products)
        var point = new_point()
        point[category_index] = 1
        var best_fit = await fetchAsync("https://get-sd-cluster.herokuapp.com/getcluster/?point=["+ point.toString() +"]")
        best_fit[category_index] = 0
    } else {
        best_fit = await fetchAsync("https://get-sd-cluster.herokuapp.com/getcluster/?point=["+ new_point().toString() +"]")
    }



//    console.log(best_fit)
    var list = []
    var i = 0
    while (list.length < 5){
        for (var c in categories){
            const p = products[c][i % products.length]
            if(Math.random() < best_fit[c] && !list.includes(p) && p != undefined && list.length < 5) {list.push(p)}
        }
        i += 1
    }
//    console.log(list)
    return list
}

async function get_recommendations(type, item_id){
    // cache data
    var promises = []
    if(categories.length == 0) {
        await Promise.resolve(getCategories()).then(result => {
            categories = (result[1])
        })
        categories.pop()
    }

    if(products.length == 0){
        for (var index = 0; index < categories.length; index++){
            var cat = categories[index]
            promises.push(
                Promise.resolve(getProductsByCategory(cat.id)).then(result => {
                    products.push(result[1])
                    return(true)
                })
            )
        }
        await Promise.all(promises)
    }

    detailedSuggestions(type, item_id)
    //const category = getCategoryOf(item_id);
    switch ( type ) {
        case "item" : 
            var recommendations = (await Promise.resolve(detailedSuggestions(item_id))); 
            return recommendations
            break;
        
        case "general" : 
            var recommendations = Promise.resolve(detailedSuggestions(null));
            return recommendations
            break;
    }
}

export {get_recommendations,detailedSuggestions,getCategoryOf,fetchAsync}
