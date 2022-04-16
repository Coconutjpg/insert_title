//Imports
import { initializeApp }from 'firebase/app'
import {
    getFirestore,collection,getDocs,doc,query,where,onSnapshot,addDoc, getDoc,startAt,startAfter,endAt,endBefore, orderBy,limit, updateDoc, increment, arrayRemove, arrayUnion, setDoc
}from 'firebase/firestore'

import{
    getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, updateProfile
}from 'firebase/auth'

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

console.log(user)

//Gets a single products details
async function getProduct(product_id){
  var json = []
  const docRef = doc(db,"Products",product_id)
  
  await getDoc(docRef)
    .then((ret)=>{
      //product exists
      json.push("success")

      //Calculates the rating based on the reviews and gets the ids for the ratings only
      var prod_rating = 0
      var ratings = []
      for(let i=0;i<ret.data().prod_ratings.length;i++){
        var line = ret.data().prod_ratings[i].split(",")
        prod_rating+=parseFloat(line[0])
        ratings.push(line[1])
      }
      prod_rating=prod_rating/ret.data().prod_ratings.length
      
      
      //Creates the JSON object
      var product = {
      "id": ret.id,
      "brand": ret.data().prod_brand,
      "cost": ret.data().prod_cost,
      "description": ret.data().prod_desc,
      "name": ret.data().prod_name,
      "image_link": ret.data().prod_image,
      "quantity": ret.data().prod_quantity,
      "rating": prod_rating,
      "ratings_ids": ratings
    }
    json.push(product)

    })
    .catch(err=>{
      //product doesnt exist
      json.push("failed")
      console.log(err.message)
    })
    return json
} 

//Gets all the products in category category_id (this must be the id of the document representing the category)
//Has to be an async function as we want to wait for the objects before we can return the array
async function getProductsByCategory(category_id){
  //Gets a reference to the specified category 
  const catDocRef = doc(db,'Categories',category_id)

  //Query to get all products that are in the gaming category
  const q = query(collection(db,"Products"),where("prod_cats","==",catDocRef))

  let JSONarr = []

  //Needs to wait for the docs
  const productDocsSnap = await getDocs(q)
  .then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
      
      //Calculating the product ratings based on the reviews given
      var prod_rating = 0
      for(let i=0;i<doc.data().prod_ratings.length;i++){
        var line = doc.data().prod_ratings[i].split(",")
        prod_rating+=parseFloat(line[0])
      }
      prod_rating=prod_rating/doc.data().prod_ratings.length
      
      //Creates the JSON object
      var product = {
      "id": doc.id,
      "brand": doc.data().prod_brand,
      "cost": doc.data().prod_cost,
      "description": doc.data().prod_desc,
      "name": doc.data().prod_name,
      "image_link": doc.data().prod_image,
      "quantity": doc.data().prod_quantity,
      "rating": prod_rating,
      "ratings_ids": doc.data().prod_ratings
    }
    JSONarr.push(product)
    })
  })

  return JSONarr;
}

//Gets all the products in a certain category, but also limits the amount of data receieved and also applies a sorting on it
async function getProductsWithSorting_Limits_Category(category_id,sorting_attribute,sorting_direction,startingValue,limit_num){
  //Going to use a surplus of if statements to see what exactly they want as js doesnt support method overloading and we dont want the repitition of code


  let JSONarr = []
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
        //Creates the JSON object
        var product = {
        "id": doc.id,
        "brand": doc.data().prod_brand,
        "cost": doc.data().prod_cost,
        "description": doc.data().prod_desc,
        "name": doc.data().prod_name,
        "image_link": doc.data().prod_image,
        "quantity": doc.data().prod_quantity,
        "rating": doc.data().prod_rating
      }
      JSONarr.push(product)
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
          //Creates the JSON object
          var product = {
          "id": doc.id,
          "brand": doc.data().prod_brand,
          "cost": doc.data().prod_cost,
          "description": doc.data().prod_desc,
          "name": doc.data().prod_name,
          "image_link": doc.data().prod_image,
          "quantity": doc.data().prod_quantity,
          "rating": doc.data().prod_rating
        }
        JSONarr.push(product)
        })
      })
  }
  
  return JSONarr;
}

//Returns an array of JSON objects of the documents in the Category Collection
async function getCategories(){
  const colRef = collection(db,'Categories')
  let JSONarr = []
  await getDocs(colRef)
  .then((snapshot) =>{
  
  //Creates the JSON object
  snapshot.docs.forEach((doc)=>{ //iterates over all documents
      var category = {
        "id": doc.id,
        "name": doc.data().cat_name,
        "desc": doc.data().cat_desc
      }
      //Adds the JSON object to the array containing all the objects
      JSONarr.push(category)
    })
  })
  .catch(err=>{
  console.log(err.message)
  })
  return JSONarr;
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
      user_credits:0,
      user_clicks: []
    })
    .catch((err)=>{
      console.log(err.message)
      arr.push("failed")
    })
    arr.push("success")
    var loggedIn = {
      "id": user_id,
      "displayName": first_name,
      "firstName": first_name,
      "lastName": last_name,
      "DoB": dob,
      "emailAddress": email,
      "phoneNumber": mobile_number,
      "credits": 0
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
  signOut(auth)
  .then(()=>{
    alert("You Have Logged Out")
  })
  .catch((err)=>{
    console.log(err.message)
  })
}

//Logs the user in
async function logIn(email,password){
  //Will use to return if the the logging in is a success/failure and if it is a success then returns the user as a JSON object
  let arr = []

  const signIn = await signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    arr.push("success")

    var loggedIn = {
      "id": cred.user.uid,
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

//Delete the least clicked element in the case the users_clicks size is going to be over 100
function deleteLeastClicked(doc_id,users_clicks){
  var count_clicks = 0;
  var lowest_click_count = 100
  var obj_to_delete = ""
  for(var prd=0;prd<users_clicks.length;prd++){
    var item_clicked = users_clicks[prd].split(",")
    //Counting the number of clicks
    count_clicks+=parseInt(item_clicked[0])
    //Keeps track of the item with the lowest clicks that happened the longest time ago
    if(parseInt(item_clicked[0]<lowest_click_count)){
      lowest_click_count = parseInt(item_clicked[0])
      obj_to_delete = users_clicks[prd]
    }
  }
   //If the number of clicks equals 100 delete the item with the lowest amount of clicks that appeared the longest time ago
   if(count_clicks>=100){
    const docRef = doc(db,'Users',doc_id);
    updateDoc(docRef,{
      user_clicks: arrayRemove(obj_to_delete)
    })

   }
}

//Adding the clicking system
async function clicked(email,product_id){
  const userRef = doc(db,"Users",email)
  var pass = "failed"
  var users_clicks

  await getDoc(userRef)
    .then((ret)=>{
      users_clicks=ret.data().user_clicks
      pass = "success"
    })
    .catch(err=>{
      console.log(err.message)
    })
  
    if(pass === "success"){
      deleteLeastClicked(email,users_clicks)

      var hasBeenClicked = false

      //Going through their clicks
      for(var prd = 0;prd<users_clicks.length;prd++){
        var item_clicked = users_clicks[prd].split(",")

        //Already clicked on the item
        if(product_id===item_clicked[1]){
          hasBeenClicked=true
          var num_clicks = (parseInt(item_clicked[0])+1).toString()
          var concated = num_clicks.concat(",",item_clicked[1])
          //Deleting the entry
          updateDoc(userRef,{
            user_clicks: arrayRemove(users_clicks[prd])
          })

          //Adding the entry
          updateDoc(userRef,{
            user_clicks: arrayUnion(concated)
          })
          
        }
        break;
      }

      //Didnt click on the product
      if(!hasBeenClicked){
        var concated = "1".concat(",",product_id);
        //Adding the entry
        updateDoc(userRef,{
          user_clicks: arrayUnion(concated)
        })

      }
    }
    return pass
}

//Gets the ratings for the product, sorts/limits them based on parameters
async function getRatingsWithSorting_Limits(product_id,sorting_direction,starting_value,limit_num){
 const prodRef = doc(db,"Products",product_id)
 
 let q = null
 //Test if they have a starting value 
  if(starting_value!=null){
    //No starting value so dont include a starting value
    console.log("Has starting value")
    q = query(collection(db,"Ratings"),where("rating_prod","==",product_id),orderBy("rating_score",sorting_direction),startAfter(starting_value),limit(limit_num))
  }
  else{
    console.log("No staring value")
    q = query(collection(db,"Ratings"),where("rating_prod","==",product_id),orderBy("rating_score",sorting_direction),limit(limit_num))
  }  

  var JSONarr = []
  //Gets the documents based on the query
  await getDocs(q)
  .then((snapshot)=>{
    console.log("success")
    snapshot.docs.forEach((doc)=>{
      //Creates the JSON object
      var rating = {
      "id": doc.id,
      "review": doc.data().rating_review,
      "rating_score": doc.data().rating_score,
      "rating_user": doc.data().rating_userid
    }
    JSONarr.push(rating)
    })
  })
  .catch(err=>{
    console.log(err.message)
  })
  return JSONarr
}

//creates a rating
async function createRating(email,product_id,review,score){
  //References to the document and collection needed
  const ratingRef = collection(db,"Ratings")
  const prodRef = doc(db,"Products",product_id)
  var pass = "failed"

  //Creating the new rating
  const newRating = addDoc(ratingRef,{
    "rating_prod": product_id,
    "rating_review": review,
    "rating_score": score,
    "rating_userid": email
  })
  .then(function(docRef){
    var concated = score.toString().concat(",",docRef.id)
    //Adding the rating to the product's array
    updateDoc(prodRef,{
      prod_ratings: arrayUnion(concated)
    })
  })
  pass = "sucess"
  return pass
}
//subscribing to auth changes
onAuthStateChanged(auth,(user)=>{
  console.log('user status changed: ',user)
})

export{getProductsByCategory, getCategories ,signUp, logOut, logIn, getProduct,getProductsWithSorting_Limits_Category,getCredits,addCredits,clicked,getRatingsWithSorting_Limits,createRating} // exports all functions
