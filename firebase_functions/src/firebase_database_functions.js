import { initializeApp }from 'firebase/app'
import {
    getFirestore,collection,getDocs,doc,query,where,onSnapshot,addDoc
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

//console.log("user uid is: ",uid)
console.log(user)

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

  return JSONarr;
}


//Signs the user up and creates the document in their Users collection
function signUp(first_name,last_name,dob,mobile_number,email,password){
  //Creates the user
  createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    const user_id = cred.user.uid

    //Adds their display name to their auth token
    updateProfile(auth.currentUser,{
      displayName: first_name + " " + last_name,
    })

    //Creates their document in the users collection 
    addDoc(collection(db,'Users'),{
      userId:user_id,
      user_first_name: first_name,
      user_last_name:last_name,
      user_DoB: dob,
      user_email: email,
      user_phone:mobile_number
    })
    .catch((err)=>{
      console.log(err.message)
    })
  })
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
function logIn(email,password){
  signInWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    console.log('user logged in: ',cred.user.displayName)
  })
  .catch((err)=>{
    console.log(err.message)
  })

}

//subscribing to auth changes
onAuthStateChanged(auth,(user)=>{
  console.log('user status changed: ',user)
})

export{getProductsByCategory, signUp, logOut, logIn} // exports all functions
