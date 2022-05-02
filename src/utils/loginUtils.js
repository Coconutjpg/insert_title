/** 
* Needed by Frontend to login
* database login authentication
* string validation
*/

import {logIn} from "./database_functions"
import{validation} from './validation.js'


/* 
performLogin

input: JSON object with emailAddress and password

ouput: if login is successful, returns size 2 array of the string "success" and user details in a JSON Object,
       otherwise an alert is thrown
*/
function performLogin(details, onSuccess){  
     	console.log("email address is : " + details.emailAddress);
	var email = details.emailAddress;
	var password = details.password;
	if( (email.length == 0) |  !(validateEmail(email))  | !(validatePassword(password))  ){
		//show toast message error here
		var x = document.getElementById("snackbar");
        	x.className = "show";
        	x.innerHTML = "Invalid email address or password";
        	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 	return null;
	}else{ //try to log in 
     		let l = logIn(details.emailAddress,details.password);
    		Promise.resolve(l).then((result) =>{
         		if(result[0]==="success"){
            			onSuccess(result[1])
            			return result[1];  // take result[1] (user details) and pass it to the homepage 
         		}else{      //failed to log in due to poor connection to database
				var x = document.getElementById("snackbar");
				x.className = "show";
				x.innerHTML = "Failed to log in due to poor connection to database";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

        		}
     		})
	}
}

function validateEmail(email){     //returns true if a string contains only 1 "@"  and at least 1 "."
   return validation.validEmail(email); 
}

function validatePassword(password){  //returns true if the password contains at least 6 characters
	if (password.length < 6){
		return false;
	}
	return true;
 }


export {performLogin,validatePassword,validateEmail};
