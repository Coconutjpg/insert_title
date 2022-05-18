import { doc } from "firebase/firestore"
import {
  getProduct,getProducts,getProductsWithSorting_Limits_Category,getProductsByCategory, getCategories, 
  signUp, logOut, logIn, 
  getCredits,addCredits,
  clicked,
  getRatingsWithSorting_Limits,createRating, 
  addToCart,getCart,emptyCart,updateQuantity,
  createOrder,getOrdersIDs,getOrder,updateOrderStatus,getProductsInCartForOrder,
  addAddress,getAddressesIDs,getAddress
} from "./firebase.js"


//Get all the categories
let categories = getCategories()
//As categories is dependent on the async function, a promise is returned, thus we need to resolve that promise to get access to what was returned in the asynchronous function
Promise.resolve(categories).then((arr)=> console.log(arr))

//Get all products in certain category
let products_in_categories_ = getProductsByCategory('Monitors')
//As products_in_categories_ is dependent on the async function, a promise is returned, thus we need to resolve that promise to get access to what was returned in the asynchronous function
Promise.resolve(products_in_categories_).then((arr)=> console.log(arr))

//Gets the products based on query inputs
let products_with_sorts = getProductsWithSorting_Limits_Category("Graphics_Cards",'prod_cost','asc',10000,10)
Promise.resolve(products_with_sorts).then((arr)=>console.log(arr))

//logging out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click',()=>{
logOut()
})

//signing up users
const signupForm  = document.querySelector('.signup')
signupForm.addEventListener('submit',(e)=>{
e.preventDefault()

 //Gets all the users entered info
 const firstname = signupForm.first_name.value
 const lastname = signupForm.last_name.value
 const dob = signupForm.dob.value
 const mobile_number = signupForm.mobile_number.value
 const email = signupForm.email.value
 const password = signupForm.password.value

let succ = signUp(firstname,lastname,dob,mobile_number,email,password)
Promise.resolve(succ).then((ret)=>{
  //When the signup is successful
  if(ret[0]==="success"){
    console.log("successful")
    console.log(ret[1])
  }
  //When the signup is unsuccessful
  else{
    console.log("unsuccessful")
  }
})
signupForm.reset()
})

//loging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit',(e)=>{
e.preventDefault()

const email = loginForm.email.value
const password = loginForm.password.value
let succ = logIn(email,password)
Promise.resolve(succ).then((ret)=>{
  if(ret[0]==="success"){
    console.log("successful")
    console.log(ret[1])
  }
  else{
    console.log('unsuccessful')
  }


})

})

//Getting a user's credits
const getusersCreditsButton = document.querySelector('.get_users_credits')
getusersCreditsButton.addEventListener('click',()=>{

  const credits = getCredits("duranreddy@gmail.com")
  Promise.resolve(credits).then((ret)=>{
    console.log(ret)
  })

})

//Adding credits to a user
const add_Credits = document.querySelector('.add_credit')
add_Credits.addEventListener('click',()=>{
  const add_credits = addCredits("duranreddy@gmail.com",1000)
  Promise.resolve(add_credits).then((ret)=>{
    console.log(ret)
  })

})

//Gets the details of a single product
const get_product = document.querySelector('.get_product')
get_product.addEventListener('click',()=>{
  const get_prd = getProduct("H8R4BPeNdECUUZU7BV9H")
  Promise.resolve(get_prd).then((ret)=>{
    if(ret[0]==="success"){
      //Got the product
      console.log(ret[1])
    }

  })
})

//Returns a json array of the selected ratings of a product
const get_product_ratings = document.querySelector('.get_products_ratings')
get_product_ratings.addEventListener('click',()=>{
  const get_prd_ratings = getRatingsWithSorting_Limits("H8R4BPeNdECUUZU7BV9H","asc",4,10)
  Promise.resolve(get_prd_ratings).then((ret)=>{
    console.log(ret)
  })
})

//Creates a user review
const create_review = document.querySelector('.add_rating')
create_review.addEventListener('click',()=>{
    const create_rating = createRating("duranreddy@gmail.com","x0KAOhS1OmMhYnZBTX8p","Decent for its price",4)
    Promise.resolve(create_rating).then((ret)=>{
      console.log(ret)
    })
})

//Adds item to user's cart
const addCart = document.querySelector('.add_toCart')
addCart.addEventListener('click',()=>{
  const add_to_Cart = addToCart("duranreddy@gmail.com","H8R4BPeNdECUUZU7BV9H")
  Promise.resolve(add_to_Cart).then((ret)=>{
    console.log(ret)
  })
})

//Get user cart
const get_cart = document.querySelector('.get_Cart')
get_cart.addEventListener('click',()=>{
  const get_Cart = getCart("duranreddy@gmail.com")
  Promise.resolve(get_Cart).then((ret)=>{
    //Then we got their cart
    if(ret[0]==="success"){
      if(ret[1].length>0){
        for(let i = 0; i<ret[1].length;i++){
          console.log(ret[1][i])
        }
      }
      else{
        console.log("Cart is empty")
      }
    }
  })
})

//Emptying the user's cart
const empty_Cart = document.querySelector('.empty_Cart')
empty_Cart.addEventListener('click',()=>{
  const Empty_Cart = emptyCart("duranreddy@gmail.com")
  Promise.resolve(Empty_Cart).then((ret)=>{
    console.log(ret)
  })
})


//Get the products in the cart for the order
const get_products_cart_order = document.querySelector('.get_ProductsCartOrder')
get_products_cart_order.addEventListener('click',()=>{
  const getProducts = getProductsInCartForOrder('duranreddy@gmail.com')
  Promise.resolve(getProducts).then((ret)=>{
    if(ret[0]==="success"){
      console.log(ret[1])
    }
  })
})

//Update the quantity of an item in the cart
const updateQuantityItem = document.querySelector('.update_Quantity')
updateQuantityItem.addEventListener('click',()=>{
  const update_quantity = updateQuantity('duranreddy@gmail.com','H8R4BPeNdECUUZU7BV9H',0)
  Promise.resolve(update_quantity).then((ret)=>{
    if(ret==="success"){
      console.log("success")
    }
  })
})

const get_products = document.querySelector('.get_Products')
get_products.addEventListener('click',()=>{
  let getAllProducts = getProducts()
  Promise.resolve(getAllProducts).then((ret)=>{
    console.log(ret)
  })
})

const new_click = document.querySelector('.new_clicked')
new_click.addEventListener('click',()=>{
  let NC = clicked('duran.reddy@gmail.com','FR7sF3vF6NiH6xuItNrs')
  Promise.resolve(NC).then((ret)=>{
    console.log(ret)
  })
})

//Creating a new order
const c_new_order = document.querySelector('.new_createOrder')
c_new_order.addEventListener('click',()=>{
  const Create_NewOrder = createOrder('duran.reddy@gmail.com',["2,hzOAgiL7NoPz6d6dhOdr","1,ZnUYk79AJeKqnjt65YSz"],29,"Blank Stret","Randon Suburb","Random City","Random Province","BzZe6SwluM9xQbuwztAR")
  Promise.resolve(Create_NewOrder).then((ret)=>{
    console.log(ret)
  })
})

//Getting new orders by id
const get_new_orderids = document.querySelector('.new_getOrdersID')
get_new_orderids.addEventListener('click',()=>{
  const get_NewOrderIds = getOrdersIDs('duran.reddy@gmail.com')
  Promise.resolve(get_NewOrderIds).then((ret)=>{
    console.log(ret)
  })
})

//Getting new orders by id
const get_new_order = document.querySelector('.new_getOrder')
get_new_order.addEventListener('click',()=>{
  const get_NewOrder = getOrder('tEH8p1lmyhxg47UbEPaB')
  Promise.resolve(get_NewOrder).then((ret)=>{
    if(ret[0]==="success"){
      console.log(ret[1])
    }
  })
})

//Updating order status
const update_orderstatus = document.querySelector('.update_OrderStatus')
update_orderstatus.addEventListener('click',()=>{
  const update_OrderStatus = updateOrderStatus('8Bx1G7zfBljkGgztR76t','Shipped')
  Promise.resolve(update_OrderStatus).then((ret)=>{
    console.log(ret)
  })
})

//Add address
const add_address = document.querySelector('.add_Address')
add_address.addEventListener('click',()=>{
  const add_Address = addAddress("duran.reddy@gmail.com",29,"Blank Street","Random Suburb","Random City","Random Province","0000")
  Promise.resolve(add_Address).then((ret)=>{
    console.log(ret)
  })
})

//Get addressids
const get_addressids = document.querySelector('.get_AddressesIDs')
get_addressids.addEventListener('click',()=>{
  const get_AddressesIds = getAddressesIDs("duran.reddy@gmail.com")
  Promise.resolve(get_AddressesIds).then((ret)=>{
    if(ret[0]==="success"){
      console.log(ret[1]);
    }
  })
})

//Get address
const get_address = document.querySelector('.get_Address')
get_address.addEventListener('click',()=>{
  const get_Address = getAddress("BzZe6SwluM9xQbuwztAR")
  Promise.resolve(get_Address).then((ret)=>{
    if(ret[0]==="success"){
      console.log(ret[1]);
    }
  })
})

