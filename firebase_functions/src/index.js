// Example file to show how 

import {getProductsByCategory, signUp, logOut, logIn} from "./firebase.js" // import functions you need

//logging in
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit',(e)=>{
  e.preventDefault()//prevents page refreshing

  const email = loginForm.email.value
  const password = loginForm.password.value

  logIn(email,password)

  loginForm.reset()
});

document.getElementById("logOut").onclick = function(){
  logOut();
}

const filterForm = document.querySelector('.filter')
filterForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  const cat = filterForm.category.value; // take input
  let prods = getProductsByCategory(cat);// assign this way just to be safe 

  //As products_in_categories_ is dependent on the async function, a promise is returned, 
  //thus we need to resolve that promise to get access to what was returned in the asynchronous function
  Promise.resolve(prods)
  .then((arr)=>{
    console.log(arr)// do what you need in here
  })
  filterForm.reset()
});

//signing up users
const signupForm  = document.querySelector('.signup')
signupForm.addEventListener('submit',(e)=>{
  e.preventDefault()

  //Gets all the users entered info
  const firstName = signupForm.first_name.value
  const lastName = signupForm.last_name.value
  const dob = signupForm.dob.value
  const mobile_number = signupForm.mobile_number.value
  const email = signupForm.email.value
  const password = signupForm.password.value

  signUp(firstName, lastName, dob, mobile_number, email, password)//all arguments in this order

  signupForm.reset()
});
