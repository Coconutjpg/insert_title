/** 
* Needed by Frontend to login
* database login authentication
* string validation
*/

import {logIn} from "./database_functions"
import{validation} from './validation.js'
import {hashing} from './hashing.js'

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
	if( (email == null) | (password == null) |(email.length == 0) |  !(validateEmail(email))  | !(validatePassword(password))  ){
		//show toast message error here
		console.log("caught invalid data");
		var x = document.getElementById("snackbar");
        	x.className = "show";
        	x.innerHTML = "Invalid email address or password";
        	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	 	return null;
	}else{ //try to log in 
	        var hashedPassword = hashing.hashPassword(details.password);
     		let l = logIn(details.emailAddress,hashedPassword);
    		Promise.resolve(l).then((result) =>{
         		if(result[0]==="success"){
             var x = document.getElementById("snackbar");
             x.className = "show";
             x.innerHTML = "Welcome " + result[1].displayName;
             setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);  
             return result[1];  // take result[1] (user details) and pass it to the homepage 
         		}
          else{      //failed to log in due to poor connection to database
				var x = document.getElementById("snackbar");
				x.className = "show";
				x.innerHTML = "Email Address or Password is incorrect";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

        		}
     		})
	}

}

function validateEmail(details){     //returns true if a string contains only 1 "@"  and at least 1 "."
   return validation.validEmail(details.emailAddress); 
}

function validatePassword(details){  //returns true if the password contains at least 6 characters
   if(details.password == null){
	   return false;
   }
   if(details.password.length < 6){
	   return false;
   }
   return true;
 }


export {performLogin,validatePassword,validateEmail};
