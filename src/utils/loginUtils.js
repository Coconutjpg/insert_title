
import{validation} from './validation.js'

function performLogin(details, onSuccess){ //check if the given details match the correct format expected  
	var email = details.emailAddress;
	var password = details.password;
	console.log(email)
	console.log(password)
	if( (email == null) | (password == null) |  (validateEmail(email) == false)  | (validatePassword(password) == false)  ){
		//show toast message error here
        onSuccess("Invalid email address or password",false);
	 	return false;
	}
	//valid details
	return true;
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
