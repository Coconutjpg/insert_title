import { initializeApp }from 'firebase/app'
import {
    getFirestore,collection,getDocs,doc,query,where,onSnapshot,addDoc
}from 'firebase/firestore'

import{
    getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,onAuthStateChanged, updateProfile
}from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDpPjLSoraZzrcVFYNvNHYYOimsJMBjiNQ",
  authDomain: "give-a-little-7976d.firebaseapp.com",
  projectId: "give-a-little-7976d",
  storageBucket: "give-a-little-7976d.appspot.com",
  messagingSenderId: "646349516170",
  appId: "1:646349516170:web:dc194b6ca743b6a7e36c73",
  measurementId: "G-H6TQB4X0WK"
};

//Initialises the connection to the database
initializeApp(firebaseConfig)

//Gets a reference to the database
const db = getFirestore()

//Gets the authentication token and the current user
const auth = getAuth()
const user = auth.currentUser;

//console.log("user uid is: ",uid)
console.log(user)

//Gets all the docs in the collection coll (coll must be the collection id)
function getDocsInCollection(coll){
  const colRef = collection(db,coll)

  //Prints all the relevant info about the products
  getDocs(colRef)
  .then((snapshot) =>{
  let products = []
  snapshot.docs.forEach((doc)=>{ //iterates over all documents
      products.push({...doc.data(), id: doc.id}) //pushes the data from the doc onto the array as well as the document id. The three dots spread this information into an object in the array
    })
  console.log(products)
  })
  .catch(err=>{
  console.log(err.message)
  })
}

//Gets all the products in category category_id (this must be the id of the document representing the category)
async function getProductsInCategory(category_id){
  //Gets a reference to the specified category
  const catDocRef = doc(db,'Categories',category_id)

  //Query to get all products that are in the gaming category
  const q =query(collection(db,"Products"),where("prod_cats","==",catDocRef))

  //Needs to wait for the docs
  const productDocsSnap = await getDocs(q)
  .then((snapshot)=>{
    let products = []
    snapshot.docs.forEach((doc)=>{
      products.push({...doc.data(), id: doc.id})
    })
    console.log(products)
  })  
}


//Signs the user up and creates the document in their Users collection
function signUp(first_name,last_name,dob,mobile_number,email,password){
  //Creates the user
  createUserWithEmailAndPassword(auth,email,password)
  .then((cred)=>{
    const user_id = cred.user.uid
    console.log('user created: ', cred.user.uid)

    //Adds their display name to their auth token
    updateProfile(auth.currentUser,{
      displayName: first_name + " " + last_name
    })

    //Creates their document in the users collection 
    addDoc(collection(db,'Users'),{
      userId:user_id,
      firstName: first_name,
      lastName:last_name,
      DoB: dob,
      phoneNumber:mobile_number
    })
    .catch((err)=>{
      console.log(err.message)
    })
  })
}


//logging out
//const logoutButton = document.querySelector('.logout')
//logoutButton.addEventListener('click',()=>{
function logOut(){
  signOut(auth)
  .then(()=>{
    console.log("user has logged out")
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

function test(name){
  console.log("hello "+ name);
}

//just for testing p2
function print_Auth(){
  console.log(auth.user)
}

export{
  test, getDocsInCollection,getProductsInCategory,signUp,print_Auth,logOut,logIn
}

