/** 
* Needed by Frontend to login
* database login authentication
* string validation
*/

import {logIn} from "./database_functions"
import{validation} from './validation.js'
import{setUser} from './userDetails'


/* 
performLogin

input: JSON object with emailAddress and password

ouput: if login is successful, returns size 2 array of the string "success" and user details in a JSON Object,
       otherwise an alert is thrown
*/
function performLogin(details, onSuccess){  
 
     let l = logIn(details.emailAddress,details.password);
     Promise.resolve(l).then((result) =>{
         if(result[0]==="success"){
            setUser(result[1])
            onSuccess(result[1])
            return result[1];  // take result[1] (user details) and pass it to the homepage 
         }
         else{      //reset textfields
        
            alert("incorrect details");

         }
     })

}

function validateEmail(details){     //returns true if a string contains only 1 "@"  and at least 1 "."
   return validation.validEmail(details.emailAddress); 
}

function validatePassword(details){  //returns true if the password contains at least 6 characters
    return validation.validPassword(details.password);
 }


export {performLogin,validatePassword,validateEmail};
