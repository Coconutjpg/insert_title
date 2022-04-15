import {
  getProductsByCategory, getCategories ,signUp, logOut, logIn, getProductsWithSorting_Limits_Category, getCredits,addCredits, clicked
} from "./firebase.js"


//Get all the categories
//let categories = getCategories()
//As categories is dependent on the async function, a promise is returned, thus we need to resolve that promise to get access to what was returned in the asynchronous function
//Promise.resolve(categories).then((arr)=> console.log(arr))

//Get all products in certain category
//let products_in_categories_ = getProductsByCategory('Graphics_Cards')
//As products_in_categories_ is dependent on the async function, a promise is returned, thus we need to resolve that promise to get access to what was returned in the asynchronous function
//Promise.resolve(products_in_categories_).then((arr)=> console.log(arr))

//Gets the products based on query inputs
//let products_with_sorts = getProductsWithSorting_Limits_Category("Graphics_Cards",'prod_cost','asc',10000,10)
//Promise.resolve(products_with_sorts).then((arr)=>console.log(arr))

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

//Clicked a product
const clicked_product = document.querySelector('.clicked_product')
clicked_product.addEventListener('click',()=>{
    const prod_clicked = clicked('duranreddy@gmail.com',"FR7sF3vF6NiH6xuItNrs")
    Promise.resolve(prod_clicked).then((ret)=>{
      console.log(ret)
    })
})
