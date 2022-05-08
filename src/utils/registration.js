import {validation} from "./validation.js";
import {signUp} from "./database_functions.js";
import {setUser } from "./userDetails.js";
import {hashing} from "./hashing.js"
export default function performRegistration(user_data, onSucceed){ //method that fetches the data from gui labels - make to get json data instead

	var fName = user_data.firstName;
	var lName = user_data.lastName;
	var sDob = user_data.dob;
	var sEmail = user_data.emailAddress;
	var sCellNo = user_data.cellNo;
	var sPassword = user_data.password;
	var repPassword = user_data.repeatPassword;
	
 register(fName,lName,sDob,sEmail,sCellNo,sPassword,repPassword, onSucceed);
}

function register(fName,lName,sDob,sEmail,sCell,sPassword,repPassword, onSucceed){ //method for validating input and then inserting to db
	var flag = true; 
	var error = ""; //error stores error message 
	var validation_var = new validation(); //make a validation object so the program realizes validation class exists
	var hashing_var = new hashing();
	//verify 2 passwords are equal -add suggestion of how to make password a strong password in the future
	if(sPassword != repPassword){
		flag = false;
		//error = error + "Password and Repeated Password were not the same" + "\n";
	}
	//check length of password
	if(sPassword.length < 6){
		flag = false;
		//error = error + "The length of your password needs to be atleast 6 characters long" + "\n";
	}
	//validate first name
	if(!validation.onlyLetters(fName) | (fName.length == 0)){
		flag = false;
		//error = error + "First Name should contain only alphabetical letters" + "\n";
	}
	//validate last name
	if(!validation.onlyLetters(lName) | (lName.length == 0)){
		flag = false;
		//error = error + "Last Name should contain only alphabetical letters" + "\n";
	}
	//validate email address
	if(!validation.validEmail(sEmail) | (sEmail.length == 0)){
		flag = false;
		//error = error + "Please enter a valid email address" + "\n";
	}
	//validate cell number
	if(!validation.validPhoneNumber(sCell) | (sCell.length == 0 )){
		flag = false;
		//error = error + "Your phone number should be either 10 digits or 11 digits long" + "\n";
	}
	//validate user date of birth 
	var d = new Date();
	var user_dob = new Date(sDob);
	if((d.getYear() - user_dob.getYear() < 16) | (d.getYear() - user_dob.getYear >80) | (sDob.length == 0)){
	 flag = false;
	 //error = error + "Only users from 16 to 80 can register";
	}

	if(flag){ //user input passed validation, begin process to add user to database
		console.log("success");
		const [hashedPassword, salt] = hashing.hashPassword(sPassword);

		let succ = signUp(fName,lName,sDob,sCell,sEmail,hashedPassword, salt);
        Promise.resolve(succ).then((ret)=>{ 
        //When the signup is successful
        if(ret[0]==="success"){
          	console.log("user added");
          	//When the signUp is successful the user json object will be placed into the second element of the array returned
          	console.log(ret[1]);
          	onSucceed("You have been successfully registered",true);

		} else { //When the signup is unsuccessful
            console.log("unable to add user");
            onSucceed("Registration failed due to poor connection to database",false);
        }
        })
	}
	else { //user input failed validation 
		console.log("failure");
		error = "Registration failed. Please fill in the form or address any highlighted issues. " + "\n"  + error;
        onSucceed(error,false);
	}
}


