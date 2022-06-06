import {validation} from "./validation.js";

export default async function performRegistration(user_data, onSucceed){ //method that fetches the data from gui labels - make to get json data instead

	var fName = user_data.firstName;
	var lName = user_data.lastName;
	var sDob = user_data.dob;
	var sEmail = user_data.emailAddress;
	var sCellNo = user_data.cellNo;
	var sPassword = user_data.password;
	var repPassword = user_data.repeatPassword;
	
 //register(fName,lName,sDob,sEmail,sCellNo,sPassword,repPassword, onSucceed);
 var result = await register(fName,lName,sDob,sEmail,sCellNo,sPassword,repPassword, onSucceed,user_data);
 return result;
}

const register = async(fName,lName,sDob,sEmail,sCell,sPassword,repPassword, onSucceed,data) =>{
//function register(fName,lName,sDob,sEmail,sCell,sPassword,repPassword, onSucceed){ //method for validating input and then inserting to db
	var flag = true; 
	var validation_var = new validation(); //make a validation object so the program realizes validation class exists
	//verify 2 passwords are equal -add suggestion of how to make password a strong password in the future
	if(sPassword != repPassword){
		flag = false;
	}
	//check length of password
	if(sPassword.length < 6){
		flag = false;
	}
	//validate first name
	if((validation.onlyLetters(fName) == false) | (fName.length == 0)){
		flag = false;
	}
	//validate last name
	if((validation.onlyLetters(lName) == false) | (lName.length == 0)){
		flag = false;
	}
	//validate email address
	if((validation.validEmail(sEmail)==false) | (sEmail.length == 0)){
		flag = false;
	}
	//validate cell number
	if((validation.validPhoneNumber(sCell)==false) | (sCell.length == 0 )){
		flag = false;
	}
	//validate user date of birth 
	var d = new Date();
	var user_dob = new Date(sDob);
	if((d.getYear() - user_dob.getYear() < 16) | (d.getYear() - user_dob.getYear >80) | (sDob.length == 0)){
	 flag = false;
	}
	if(flag){ //user input passed validation
		return true;
	}
	else { //user input failed validation 
		console.log("failure");
		const error = "Registration failed. Please fill in the form or address any highlighted issues. ";
        onSucceed(error,false);
		return false
	}
}


