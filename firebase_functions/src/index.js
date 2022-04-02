import {
    test,getDocsInCollection,getProductsInCategory,signUp,print_Auth,logOut,logIn
} from "./firebase.js"

//Get all the products
getDocsInCollection('Products')

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
    const cat = filterForm.category.value;
    getProductsInCategory(cat);
    filterForm.reset()
});

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

   signUp(firstname, lastname, dob, mobile_number, email, password)

  signupForm.reset()
  print_Auth()
});

