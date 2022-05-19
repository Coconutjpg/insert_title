/** 
* Needed by Frontend to login
* database login authentication
* string validation
*/

import { db } from "../App"
import{validation} from './validation.js'
import {hashing} from './hashing.js'

/* 
performLogin

input: JSON object with emailAddress and password

ouput: if login is successful, returns size 2 array of the string "success" and user details in a JSON Object,
       otherwise an alert is thrown
*/

function performLogin(details, onSuccess){  
	var email = details.emailAddress;
	var password = details.password;
	if( (email == null) | (password == null) |  (validateEmail(email) == false)  | (validatePassword(password) == false)  ){
		//show toast message error here
		console.log("caught invalid data");
        onSuccess("Invalid email address or password",false);
	 	return null;
	}else{ //try to log in 
		var hashedPassword = hashing.hashPassword(password)[0];
		if(hashedPassword == null){
			hashedPassword = password;
		}
		let l = db.logIn(details.emailAddress,hashedPassword);
		Promise.resolve(l).then((result) =>{
			if(result[0]==="success"){

				onSuccess("Welcome " + result[1].displayName,true); 
				return result[1];  // take result[1] (user details) and pass it to the homepage 
			}
		else{      //failed to log in due to poor connection to database
			onSuccess("Email Address or Password is incorrect",false);
			}
		})
	}

}

function validateEmail(emailAddress){     //returns true if a string contains only 1 "@"  and at least 1 "."
   return validation.validEmail(emailAddress); 
}

function validatePassword(password){  //returns true if the password contains at least 6 characters
   if(password == null){
	   return false;
   }
   if(password.length < 6){
	   return false;
   }
   return true;
 }


export {performLogin,validatePassword,validateEmail};
