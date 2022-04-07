// Example file to show how the functions are used to help with the backend implementation

import {
  getProductsByCategory, getCategories ,signUp, logOut, logIn
} from "./firebase.js"


//logging out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click',()=>{
logOut()
})

//Get all the categories
let categories = getCategories()
//As categories is dependent on the async function, a promise is returned, thus we need to resolve that promise to get access to what was returned in the asynchronous function
Promise.resolve(categories).then((arr)=> console.log(arr))

//Get all products in certain category
let products_in_categories_ = getProductsByCategory('Graphics_Cards')
//As products_in_categories_ is dependent on the async function, a promise is returned, thus we need to resolve that promise to get access to what was returned in the asynchronous function
Promise.resolve(products_in_categories_).then((arr)=> console.log(arr))

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
    //When the signUp is successful the user json object will be placed into the second element of the array returned
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
    //When the login is successful the user json object will be placed into the second element of the array returned
    console.log(ret[1])
  }
  else{
    console.log('unsuccessful')
  }
})
})
