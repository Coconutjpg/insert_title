//Imports
import { initializeApp }from 'firebase/app'
import {
    getFirestore,collection,getDocs,doc,query,where,onSnapshot,addDoc, getDoc,startAt,startAfter,endAt,endBefore, orderBy,limit, updateDoc, increment, arrayRemove, arrayUnion, setDoc, serverTimestamp,
    deleteDoc
}from 'firebase/firestore'

import{
    getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, updateProfile, updatePassword, updateEmail
}from 'firebase/auth'

import { setUser } from './userDetails';

//Firebase Link
const firebaseConfig = {
  apiKey: "AIzaSyDpPjLSoraZzrcVFYNvNHYYOimsJMBjiNQ",
  authDomain: "give-a-little-7976d.firebaseapp.com",
  projectId: "give-a-little-7976d",
  storageBucket: "give-a-little-7976d.appspot.com",
  messagingSenderId: "646349516170",
  appId: "1:646349516170:web:dc194b6ca743b6a7e36c73",
  measurementId: "G-H6TQB4X0WK"
};

//Initializes the connection to the database
initializeApp(firebaseConfig)

//Gets a reference to the database
const db = getFirestore()

//Gets the authentication token and the current user
const auth = getAuth()
const user = auth.currentUser;

//console.log(user)

//Gets a single products details
async function getProduct(product_id){
  var pass = 'failed'
  var prod = []
  const docRef = doc(db,"Products",product_id)
  
  await getDoc(docRef)
    .then((ret)=>{
      //product exists
      
      if(ret.data()!=null){
        pass = "success"

        //Calculates the rating based on the reviews and gets the ids for the ratings only
        var prod_rating = 0
        var ratings = []
        for(let i=0;i<ret.data().prod_ratings.length;i++){
          var line = ret.data().prod_ratings[i].split(",")
          prod_rating+=parseFloat(line[0])
          ratings.push(line[1])
        }
        prod_rating=prod_rating/ret.data().prod_ratings.length
        if(isNaN(prod_rating)){
          prod_rating=0
        }
      
        //Creates the JSON object
        var product = {
        "id": ret.id,
        "brand": ret.data().prod_brand,
        "cost": ret.data().prod_cost,
        "description": ret.data().prod_desc,
        "name": ret.data().prod_name,
        "image_links": ret.data().prod_images,
        "quantity": ret.data().prod_quantity,
        "rating": prod_rating,
        "ratings_ids": ratings
         }
      prod = product
      }
    })
    .catch(err=>{
      //product doesnt exist
      console.log(err.message)
    })

    return [pass,prod]
} 

//Gets all the products in category category_id (this must be the id of the document representing the category)
//Has to be an async function as we want to wait for the objects before we can return the array
async function getProductsByCategory(category_id){
  //Gets a reference to the specified category 
  const catDocRef = doc(db,'Categories',category_id)

  //Query to get all products that are in the gaming category
  const q = query(collection(db,"Products"),where("prod_cats","==",catDocRef))

  let JSONarr = []
  var pass="failed"
  

  //Needs to wait for the docs
  const productDocsSnap = await getDocs(q)
  .then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
      if(doc.data()!=null){
          pass="success"
      
        //Calculating the product ratings based on the reviews given
        var prod_rating = 0
        for(let i=0;i<doc.data().prod_ratings.length;i++){
          var line = doc.data().prod_ratings[i].split(",")
          prod_rating+=parseFloat(line[0])
        }
        prod_rating=prod_rating/doc.data().prod_ratings.length
          if(isNaN(prod_rating)){
         prod_rating=0
        }
      
        //Creates the JSON object
        var product = {
        "id": doc.id,
        "brand": doc.data().prod_brand,
        "cost": doc.data().prod_cost,
        "description": doc.data().prod_desc,
        "name": doc.data().prod_name,
        "image_links": doc.data().prod_images,
        "quantity": doc.data().prod_quantity,
        "rating": prod_rating,
        "ratings_ids": doc.data().prod_ratings
        }
        JSONarr.push(product)
      }
      else{
        return ['failed',[]]
      }
    })
  })
  return [pass,JSONarr];
}

//Gets all the products in a certain category, but also limits the amount of data receieved and also applies a sorting on it
async function getProductsWithSorting_Limits_Category(category_id,sorting_attribute,sorting_direction,startingValue,limit_num){
  //Going to use a surplus of if statements to see what exactly they want as js doesnt support method overloading and we dont want the repitition of code

  var pass = 'failed'
  let JSONarr = []

  //Quick catches
  if(startingValue<0 || !(sorting_direction=="asc" || sorting_direction=="desc")){
    return [pass,JSONarr]
  }
  //Wants to use the certain request for only a certain category
  if(category_id!=null){
    const catDocRef = doc(db,'Categories',category_id)

    let q = null

    //if statement to do see if the gave a starting value
    if(startingValue!=null){
      //No starting value so dont include a starting value
      q = query(collection(db,"Products"),where("prod_cats","==",catDocRef),orderBy(sorting_attribute,sorting_direction),startAfter(startingValue),limit(limit_num))
    }
    else{
      q = query(collection(db,"Products"),where("prod_cats","==",catDocRef),orderBy(sorting_attribute,sorting_direction),limit(limit_num))
    }
     

    //Needs to wait for the docs
    const productDocsSnap = await getDocs(q)
    .then((snapshot)=>{
      snapshot.docs.forEach((doc)=>{
        if(doc.data()!=null){
          pass = 'success'
          var prod_rating = 0
          for(let i=0;i<doc.data().prod_ratings.length;i++){
            var line = doc.data().prod_ratings[i].split(",")
            prod_rating+=parseFloat(line[0])
          }
          prod_rating=prod_rating/doc.data().prod_ratings.length
          if(isNaN(prod_rating)){
            prod_rating=0
          }
          var product = {
            "id": doc.id,
            "brand": doc.data().prod_brand,
            "cost": doc.data().prod_cost,
            "description": doc.data().prod_desc,
            "name": doc.data().prod_name,
            "image_links": doc.data().prod_images,
            "quantity": doc.data().prod_quantity,
            "rating": prod_rating,
            "ratings_ids": doc.data().prod_ratings
          }
          JSONarr.push(product)
        }
        else{
          return ['failed',[]]
        }
      })
    })
  }
  //Wants to apply the sorting and the limits to all products
  else{
    let prodQuery = null
    
    if(startingValue!=null){
      //Then they are loading more values
      prodQuery = query(collection(db,'Products'),orderBy(sorting_attribute,sorting_direction),startAfter(startingValue),limit(limit_num))
    }
    else{
      //Havent loaded anything else yet
      prodQuery = query(collection(db,'Products'),orderBy(sorting_attribute,sorting_direction),limit(limit_num))
    }
    
    await getDocs(prodQuery)
      .then((snapshot) =>{
        snapshot.docs.forEach((doc)=>{
          if(doc.data()!=null){
            pass = "success"
            var prod_rating = 0
            for(let i=0;i<doc.data().prod_ratings.length;i++){
              var line = doc.data().prod_ratings[i].split(",")
              prod_rating+=parseFloat(line[0])
            }
            prod_rating=prod_rating/doc.data().prod_ratings.length
            if(isNaN(prod_rating)){
              prod_rating=0
            }
             var product = {
              "id": doc.id,
              "brand": doc.data().prod_brand,
              "cost": doc.data().prod_cost,
              "description": doc.data().prod_desc,
              "name": doc.data().prod_name,
              "image_links": doc.data().prod_images,
              "quantity": doc.data().prod_quantity,
              "rating": prod_rating,
              "ratings_ids": doc.data().prod_ratings
            }
            JSONarr.push(product)
          }
          else{
            return ['failed',[]]
          }
        })
      })
  }
  
  return [pass,JSONarr];
}
//Returns an array of JSON objects of the documents in the Category Collection
async function getCategories(){
  const colRef = collection(db,'Categories')
  var pass = "failed"
  let JSONarr = []
  await getDocs(colRef)
  .then((snapshot) =>{
  
  //Creates the JSON object
  snapshot.docs.forEach((doc)=>{ //iterates over all documents
    if(doc.data()!=null){
      pass = "success"
      var category = {
          "id": doc.id,
          "name": doc.data().cat_name,
          "desc": doc.data().cat_desc
        }
        //Adds the JSON object to the array containing all the objects
        JSONarr.push(category)
      }
      else{
        return ['failed',[]]
      }
    })
  })
  .catch(err=>{
  console.log(err.message)
  })
  return [pass,JSONarr];
}

//Gets all products in JSON format
async function getProducts(){
  const colRef = collection(db,'Products')
  var pass = 'failed'
  let JSONarr = []
  
  await getDocs(colRef)
    .then((snapshot)=>{

      snapshot.docs.forEach((doc)=>{
        if(doc.data()!=null){
          pass = 'success'
          var prod_rating = 0
          for(let i=0;i<doc.data().prod_ratings.length;i++){
            var line = doc.data().prod_ratings[i].split(",")
            prod_rating+=parseFloat(line[0])
          }
          prod_rating=prod_rating/doc.data().prod_ratings.length
          if(isNaN(prod_rating)){
            prod_rating=0
          }
          var product = {
            "id": doc.id,
            "brand": doc.data().prod_brand,
            "cost": doc.data().prod_cost,
            "description": doc.data().prod_desc,
            "name": doc.data().prod_name,
            "image_links": doc.data().prod_images,
            "quantity": doc.data().prod_quantity,
            "rating": prod_rating,
            "ratings_ids": doc.data().prod_ratings
          }
          JSONarr.push(product)
        }
        else{
          return ['failed',[]]
        }
        
      })
    })
    return [pass,JSONarr]
}

//Signs the user up and creates the document in their Users collection
async function signUp(first_name,last_name,dob,mobile_number,email,password){
  //Creates the user
  
  //Will use to return if the the signing up is a success/failure and if it is a success then returns the user as a JSON object
    let arr = []
  const makeUser = await createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    
    const user_id = cred.user.uid

    //Adds their display name to their auth token
    updateProfile(auth.currentUser,{
      displayName: first_name + " " + last_name,
    })

    //Creates their document in the users collection 
    setDoc(doc(db,"Users",email),{
      Id:user_id,
      user_first_name: first_name,
      user_last_name:last_name,
      user_DoB: dob,
      user_email: email,
      user_phone:mobile_number,
      user_credits:100000,
      user_clicks: [],
      user_cart: [],
      user_orders: [],
      user_addresses:[],
      user_prods:[]
    })
    .catch((err)=>{
      console.log(err.message)
      arr.push("failed")
    })
    arr.push("success")
    var loggedIn = {
      "displayName": first_name,
      "firstName": first_name,
      "lastName": last_name,
      "DoB": dob,
      "emailAddress": email,
      "phoneNumber": mobile_number,
      "credits": 100000,
      "products_purchased":[]
    }
    arr.push(loggedIn)
  })
  .catch((err)=>{
    arr.push("failed")
  })
  return arr
}

//logging out
function logOut(){
  var pass = 'success'
  signOut(auth)
  .then(()=>{
  })
  .catch((err)=>{
    console.log(err.message)
    pass='failed'

  })
  return pass
}


async function getUserDetails(email){  
  //Get a user reference
  const userRef = doc(db,"Users",email);
  var pass = 'failed';
  var JSONobj = null;

  await getDoc(userRef)
    .then((ret)=>{
      //Check that the user document exists
      if(ret.data()==null){
        return [pass,JSONobj]

      }
      pass = 'success';
      //create the json object
      JSONobj = {
        DoB: ret.data().user_DoB,
        addresses: ret.data().user_addresses,
        cart: ret.data().user_cart,
        credits: ret.data().user_credits,
        firstName: ret.data().user_first_name,
        lastName: ret.data().user_last_name,
        orderIDs: ret.data().user_orders,
        phoneNumber: ret.data().user_phone,
        products_purchased: ret.data().user_prods,
        emailAddress: email
      }
    })
    .catch(err=>{
      console.log(err.message)
    })

    return [pass,JSONobj];
}

//Gets the users ordered products
async function getOrderedProducts(email){  
  //Get a user reference
  const userRef = doc(db,"Users",email);
  var pass = 'failed';
  var JSONobj = null;

  await getDoc(userRef)
    .then((ret)=>{
      //Check that the user document exists
      if(ret.data()==null){
        return [pass,JSONobj]
      }
      pass = 'success';
      //get the users products
      JSONobj = ret.data().user_prods;
      
    })
    .catch(err=>{
      console.log(err.message)
    })

    return [pass,JSONobj];
}

//Allows us to add the products purchased to the JSON that they have when the login
function userWithProductsJSON(JSON,productarr){
  JSON.products_purchased = productarr;
  return JSON;
}

//Logs the user in
async function logIn(email,password){
  //Will use to return if the the logging in is a success/failure and if it is a success then returns the user as a JSON object
  let arr = []

  const signIn = await signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    arr.push("success")

    var loggedIn = {
      "displayName":cred.user.displayName,
      "emailAddress":cred.user.email,
    }
    arr.push(loggedIn)
    console.log('user logged in: ',cred.user.displayName)
  })
  .catch((err)=>{
    console.log(err.message)
    arr.push("failed")
  })
  return arr
}

//Gets the user's credits
async function getCredits(email){
  //Gets a reference to their document
  const userRef = doc(db,"Users",email)
  var credits = -1
  await getDoc(userRef)
    .then((ret)=>{
      credits = ret.data().user_credits
    })
    .catch(err=>{
      console.log(err.message)
    })
  
    return credits
}

//Adding credits to the users account
async function addCredits(email,amount){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var init_credits = 0
  //Get their document
  await getDoc(userRef)
    .then((ret)=>{
      init_credits = ret.data().user_credits //Get what they initally had as their credits
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })
  
  if(pass==="success"){
    updateDoc(userRef,{
      user_credits: (init_credits+amount) //Adds the credits to their account
      })
    }
    return pass
}


function deleteOverflow(email,user_clicks){
  var obj_to_delete=""
  var pass = "success"
  if(user_clicks.length==20){
    obj_to_delete=user_clicks[0]
    const userRef = doc(db,'Users',email);
    updateDoc(userRef,{
      user_clicks: arrayRemove(obj_to_delete)
    })
    .catch(err=>{
      pass = 'failed'
    })
  }
  return pass
}

async function clicked(email,product_id){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var users_clicks = null;

  await getDoc(userRef)
    .then((ret)=>{
      users_clicks=ret.data().user_clicks
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })
    
  const get_prd = getProduct(product_id)
  // console.log(get_prd)
  Promise.resolve(get_prd).then((ret)=>{
      if(ret[0]=='success'){
        //Got all the clicks
        if(pass === "success"){
          deleteOverflow(email,users_clicks);
          var date = new Date();
          var concated = (product_id.concat(",",date)).toString();
          updateDoc(userRef,{
            user_clicks: arrayUnion(concated)
          })
          return "success"
        }
      }
      return "failed"
  })
}

//Function to get all of the user's clicks
async function getClicks(email){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var user_clicks_count = []
  var JSONarr = []

  //Get the users clicks
  await getDoc(userRef)
    .then((ret)=>{
      user_cart_count = ret.data().user_clicks
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })

    //Have gotten the user's clicks
    if(pass === "success"){
      //Gets all the clicks in JSON format
      for(let i=0;i<user_clicks_count.length;i++){
        var line = user_clicks_count[i].split(",")
        var click = {
          "product_id": line[0],
          "time_clicked": line[1]
        }
        JSONarr.push(click)
      }
    }
    return [pass,JSONarr]

}
//Gets the ratings for the product, sorts/limits them based on parameters
async function getRatingsWithSorting_Limits(product_id,sorting_direction,starting_value,limit_num){
 const prodRef = doc(db,"Products",product_id)
 var pass = "failed"
 let q = null
 //Test if they have a starting value 
  if(starting_value!=null){
    //No starting value so dont include a starting value
    if(sorting_direction=='desc'){
      //Sorting in descending order so use a different field to sort
      var startingValue = 100000000-starting_value
      q = query(collection(db,"Ratings"),where("rating_prod","==",product_id),orderBy("rating_sort",'asc'),startAfter(startingValue),limit(limit_num))
    }
    else{
      q = query(collection(db,"Ratings"),where("rating_prod","==",product_id),orderBy("rating_score",sorting_direction),startAfter(starting_value),limit(limit_num))
    } 
    
  }
  else{
    if(sorting_direction=='desc'){
      //Sorting in descending order so use a different field to sort
      var startingValue = 100000000-starting_value
      q = query(collection(db,"Ratings"),where("rating_prod","==",product_id),orderBy("rating_sort",'asc'),limit(limit_num))
    }
    else{
      q = query(collection(db,"Ratings"),where("rating_prod","==",product_id),orderBy("rating_score",sorting_direction),limit(limit_num))
    } 
    
  } 

  var JSONarr = []

  //Check that the starting value is not negative
  if(starting_value<0){
    return [pass,JSONarr]
  }
  //Gets the documents based on the query
  await getDocs(q)
  .then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
      
      if(doc.data()!=null){
        pass="success"
      
        //Creates the JSON object
        var rating = {
          "id": doc.id,
          "review": doc.data().rating_review,
          "rating_score": doc.data().rating_score,
          "rating_user": doc.data().rating_userid,
          "rating_sort":doc.data().rating_sort
        }
        JSONarr.push(rating)
      }
    })
  })
  .catch(err=>{
    console.log(err.message)
  })
  return [pass,JSONarr]
}

//creates a rating
async function createRating(email,product_id,review,score){
  //References to the document and collection needed
  const ratingRef = collection(db,"Ratings")
  const prodRef = doc(db,"Products",product_id)
  var pass = "failed"
  //Create sort variable for descending order
  var sort = 100000000 - +score + +(Math.random() * (0 - 0.999) + 0.999).toFixed(9)

  //Creating the new rating
  const newRating = addDoc(ratingRef,{
    "rating_prod": product_id,
    "rating_review": review,
    "rating_score": score,
    "rating_userid": email,
    "rating_sort": sort
  })
  .then(function(docRef){
    var concated = score.toString().concat(",",docRef.id)
    //Adding the rating to the product's array
    updateDoc(prodRef,{
      prod_ratings: arrayUnion(concated)
    })
  })
  pass = "success"
  return pass
}

//adding a product to a users cart
async function addToCart(email, product_id){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var wasInCart = false
  var cart_arr = []
  await getDoc(userRef)
    .then((ret)=>{
      if(ret.data()==null){
        return 'failed'
      }
      pass = "success"
      //Gets all the items in their cart
      cart_arr = ret.data().user_cart
    })
    .catch(err=>{
      console.log(err.message)
    })
    if(pass==="success"){
      
      for(var i = 0; i<cart_arr.length;i++){
        var quantity_product = cart_arr[i].split(",")
        console.log(quantity_product)
        //Has not added the product to their cart
        if(quantity_product[1]===product_id){
          wasInCart=true
          var quantity = (parseInt(quantity_product[0])+1).toString()
          var concated = quantity.concat(",",product_id)
          //Deleting the entry
          updateDoc(userRef,{
            user_cart: arrayRemove(cart_arr[i])
          })

          //Adding the entry
          updateDoc(userRef,{
            user_cart: arrayUnion(concated)
          })
          break;
        }
      }
      
      //Wasnt in the cart
      if(!wasInCart){
        var concated = "1".concat(",",product_id)
        updateDoc(userRef,{
          user_cart: arrayUnion(concated)
        })
      }
    }
    return pass
}

//Updates the quantity of the product in cart
async function updateQuantity(email, product_id, quantity_wanted){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var cart_arr = []
  
  //Check that the quantity wanted is a valid number
  if(quantity_wanted<0){
       return undefined;
  }
    
  await getDoc(userRef)
    .then((ret)=>{
      pass = "success"
      //Gets all the items in their cart
      cart_arr = ret.data().user_cart
    })
    .catch(err=>{
      console.log(err.message)
    })
    if(pass==="success"){

      const get_prd = getProduct(product_id)
      // console.log(get_prd)
      Promise.resolve(get_prd).then((ret)=>{
          if(ret[0]=='success'){
            //Got the users doc
            if(pass === "success"){
              
              for(var i = 0; i<cart_arr.length;i++){
                var quantity_product = cart_arr[i].split(",")
                //Has not added the product to their cart
                if(quantity_product[1]===product_id){

                  //quantity is 0 thus remove item from cart
                  if(quantity_wanted==0){
                    updateDoc(userRef,{
                      user_cart: arrayRemove(cart_arr[i])
                    })
                    break;
                  }
                  else{
                    var quantity = quantity_wanted.toString()
                    var concated = quantity.concat(",",product_id)
                  
                  //Deleting the entry
                  updateDoc(userRef,{
                    user_cart: arrayRemove(cart_arr[i])
                  })
                
                  //Adding the entry
                  updateDoc(userRef,{
                    user_cart: arrayUnion(concated)
                  })
                  break;
                  }

                }
              }
              return "success"
            }
          }
          return "failed"
      })
      

    }
}

//getting the users cart
async function getCart(email){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var user_cart = []
  var JSONarr = []

  //Get the users cart
  await getDoc(userRef)
    .then((ret)=>{
      user_cart = ret.data().user_cart
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })

    //Have gotten the user's cart
    if(pass === "success"){
      //Gets all the products and their quantities in JSON format
      for(let i=0;i<user_cart.length;i++){
        var line = user_cart[i].split(",")
        var product = {
          "quantity": parseInt(line[0]),
          "product_id": line[1]
        }
        JSONarr.push(product)
      }
    }
    return [pass,JSONarr]
}

//emptying the users cart
async function emptyCart(email){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var user_cart = []
  
  //Getting the document
  await getDoc(userRef)
  .then((ret)=>{
    user_cart = ret.data().user_cart
    pass = "success"
  })
  .catch(err=>{
    console.log(err.message)
  })

  if(pass === "success"){
    //Deleting all products in users cart
    for(let i =0;i<user_cart.length;i++){
      updateDoc(userRef,{
        user_cart: arrayRemove(user_cart[i])
      })
    }
  }
  return pass


}

//creating an order
async function createOrder(email,products_and_quantities,number,street,suburb,city,province,area_code,address_id){
  //Gets a reference to the Orders table
  const orderRef  = collection(db,"Orders")
  var pass = "failed"
  var products = []

  for(var i =0; i<products_and_quantities.length;i++){
    var line_split = products_and_quantities[i].split(",")
    products.push(line_split[1])
  }

  //adds a document to the orders collection
  await addDoc(orderRef,{
    order_purchase_date: serverTimestamp(),
    order_arrival_date: "TBD",
    order_status: "Packing",
    products_and_quantities: products_and_quantities,
    order_add_num:number,
    order_add_street:street,
    order_add_suburb:suburb,
    order_add_city:city,
    order_add_province:province,
    order_add_code:area_code,
    order_add_id:address_id
  })
    .then(function(docRef){
      pass = "success"
      var userRef = doc(db,"Users",email)
      //Add the order to the users document
      updateDoc(userRef,{
        user_orders: arrayUnion(docRef.id)
      })
      //Add the products to the list of the users already purchased products
      for(var i = 0; i<products.length;i++){
        updateDoc(userRef,{
          user_prods: arrayUnion(products[i])
        })
      }
      })
  return pass
}


//Get all the users order ids
async function getOrdersIDs(email){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var user_orders = []

    //Getting the document
    await getDoc(userRef)
    .then((ret)=>{
      user_orders = ret.data().user_orders
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })
    return [pass,user_orders]
}
//getting the customers order
async function getOrder(order_id){

  var pass = "failed"
  var JSONobj = ""
  
  var orderRef = doc(db,"Orders",order_id) 

  await getDoc(orderRef)
    .then((ret)=>{
      pass = "success"

      //Getting the products in a JSON array
      var JSON_products = []
      for(let i=0;i<ret.data().products_and_quantities.length;i++){
        var line = ret.data().products_and_quantities[i].split(",")
        var prod = {
          product_id: line[1],
          quantity: parseInt(line[0])
        }
        JSON_products.push(prod)
      }

      //Gets the order in a JSON format
      var order = {
        purchase_date: ret.data().order_purchase_date,
        arrival_date: ret.data().order_arrival_date,
        status: ret.data().order_status,
        products_and_quantities: JSON_products,
        number:ret.data().order_add_num,
        street:ret.data().order_add_street,
        suburb:ret.data().order_add_suburb,
        city:ret.data().order_add_city,
        province:ret.data().order_add_province, 
        area_code:ret.data().order_add_code
      }

      //Adds the JSON object to the array containing all the objects
      JSONobj=order
    })

  return [pass,JSONobj]
}

async function updateOrderStatus(order_id,status){
  var orderRef = doc(db,"Orders",order_id);
  var pass = "failed"

  await updateDoc(orderRef,{
    order_status: status
  })
  .then(()=>{
    pass = "success"
  })

  return pass
}
//getting the products in the shopping cart to allow for easier use of createOrder function
async function getProductsInCartForOrder(email){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var arr = []

  await getDoc(userRef)
    .then((ret)=>{
      pass = "success"
      arr = ret.data().user_cart
    })
  
  return [pass,arr]
}

//add an address to a user
async function addAddress(email,number,street,suburb,city,province,area_code){
  //References to the document and collection needed
  const addressRef = collection(db,"Addresses")
  const userRef = doc(db,"Users",email)
  var pass = "success"
  //Creating the new rating
  const newRating = addDoc(addressRef,{
    "add_number":number,
    "add_street":street,
    "add_suburb":suburb,
    "add_city":city,
    "add_province":province,
    "add_code":area_code
  })
  
  .then(function(docRef){
    var add_id = docRef.id
    //Adding the address to the user's array
    updateDoc(userRef,{
      user_addresses: arrayUnion(add_id)
    })
    
      
  })
  .catch(err=>{
    pass = "failed"
    })

  return pass;
}

async function getAddressesIDs(email){
  const userRef = doc(db,"Users",email)
  var pass = "failed";
  var user_addresses = [];

  await getDoc(userRef)
    .then((ret)=>{
      user_addresses = ret.data().user_addresses
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })

  return [pass,user_addresses]
}

async function getAddress(address_id){
  const addRef = doc(db,"Addresses",address_id)
  var pass = "failed"
  var JSONobj = "";
  
  await getDoc(addRef)
    .then((ret)=>{
      pass = "success"
      JSONobj={
        "city":ret.data().add_city,
        "area_code":ret.data().add_code,
        "number":ret.data().add_number,
        "province":ret.data().add_province,
        "street":ret.data().add_street,
        "suburb":ret.data().add_suburb   
      }
    })
    .catch(err=>{
      console.log(err.message)
    })
    return [pass,JSONobj]
}

//updating the users details function
async function updateUserDetails(email,JSONobj){
  var pass = 'failed';
  var failed_arr = [];
  const userRef = doc(db,"Users",email)

  if(JSONobj.password!=null){
    //User wants a password reset
    updatePassword(auth.currentUser,JSONobj.password)
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("password_reset")
    })
    pass = 'success'
  }

  if(JSONobj.DoB!=null){
    //User wants a DoB change
    updateDoc(userRef,{
      user_DoB: JSONobj.DoB
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("DoB_change")
    })
    pass = "success"
  }

  if(JSONobj.first_name!=null){
    //User wants a first_name change
    updateDoc(userRef,{
      user_first_name: JSONobj.first_name
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("firstName_change")
    })
    //Update the name that will be displayed when they log in
    updateProfile(auth.currentUser,{
      displayName: JSONobj.first_name
    })
    pass = "success"
  }

  if(JSONobj.last_name!=null){
    //User wants a last_name change
    updateDoc(userRef,{
      user_last_name: JSONobj.last_name
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("lastName_change")
    })
    pass = "success"
  }

  if(JSONobj.phoneNumber!=null){
    //User wants a last_name change
    updateDoc(userRef,{
      user_phone: JSONobj.phoneNumber
    })
    .catch((error)=>{
      console.log(error.message);
      failed_arr.push("phoneNumber_change")
    })
    pass = "success"
  }

  if(JSONobj.email!=null){
    //User wants to change their email address
    var check = "failed";

    //Establish the variables that will be copied over to the user's new document
    var id = null;
    var dob = null;
    var addresses = null;
    var cart = null;
    var clicks = null;
    var credits = null;
    var firstname = null;
    var lastname = null;
    var orders = null;
    var phone = null;
    var prods = null;

    // Get the values to copy over from existing doc
    await getDoc(userRef)
    .then((ret)=>{
      id = ret.data().Id;
      dob = ret.data().user_DoB;
      addresses = ret.data().user_addresses;
      cart = ret.data().user_cart;
      clicks = ret.data().user_clicks;
      credits = ret.data().user_credits;
      firstname = ret.data().user_first_name;
      lastname = ret.data().user_last_name;
      orders = ret.data().user_orders;
      phone = ret.data().user_phone;
      prods = ret.data().user_prods;
      check = "success"
    })
    .catch(err=>{
      console.log(err.message)
      failed_arr.push("email_change")
    })

    if(check==="success"){
      //Then got the document successfully
      
      //Change the email
      await updateEmail(auth.currentUser, JSONobj.email)
      .then(() => {
        // Email updated

        //Create the doc to copy user docs
        setDoc(doc(db,"Users",JSONobj.email),{
          Id:id,
          user_first_name: firstname,
          user_last_name:lastname,
          user_DoB: dob,
          user_email: JSONobj.email,
          user_phone:phone,
          user_credits:credits,
          user_clicks: clicks,
          user_cart: cart,
          user_orders: orders,
          user_addresses:addresses,
          user_prods:prods
        })
        .then(()=>{
          //doc created so delete old doc
          //Only delete the doc if the two emails are different
          if(email!=JSONobj.email){
            deleteDoc(doc(db,"Users",email))
            .catch((error)=>{
              failed_arr.push("email_change")
              console.log(error.message);
            })
          }
          
        })        
        .catch((err)=>{
          //doc not created
          console.log(err.message)
          failed_arr.push("email_change")
          updateEmail(auth.currentUser, email)
        })
      }).catch((error) => {
        //email not changed
        console.log(error.message)
        failed_arr.push("email_change");
      });

    }
  }

  if(failed_arr.length>0){
    return ["failed",failed_arr]
  }
  console.log(failed_arr)
  return [pass];
}
//subscribing to auth changes
onAuthStateChanged(auth,(user)=>{
  setUser(user)
  console.log('user status changed: ',user)
})

export{getProduct,getProducts,getProductsWithSorting_Limits_Category,getProductsByCategory, getCategories,
  signUp, logOut, logIn, getUserDetails, getOrderedProducts,userWithProductsJSON, updateUserDetails,
  getCredits,addCredits,
  clicked,
  getRatingsWithSorting_Limits,createRating,
  addToCart,getCart,emptyCart,updateQuantity,
  createOrder,getOrdersIDs,getOrder,updateOrderStatus,getProductsInCartForOrder,
  addAddress,getAddressesIDs,getAddress} // exports all functions
