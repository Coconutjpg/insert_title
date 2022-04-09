import {validation} from "./validation.js";
import {signUp} from "./database_functions.js";
import { setUser } from "./userDetails.js";
export default function performRegistration(user_data, onSucceed){ //method that fetches the data from gui labels - make to get json data instead

var fName = user_data.firstName;
var lName = user_data.lastName;
var sDob = user_data.dob;
var sEmail = user_data.emailAddress;
var sCellNo = user_data.cellNo;
var sPassword = user_data.password;
var repPassword = user_data.repeatPassword;
register(fName,lName,sDob,sEmail,sCellNo,sPassword,repPassword,onSucceed);
}

function register(fName,lName,sDob,sEmail,sCell,sPassword,repPassword,onSucceed){ //method for validating input and then inserting to db
	var flag = true;
	var validation_var = new validation();
	//verify passwords -add suggestion of how to make password a strong password in the future
	if(sPassword != repPassword){
		flag = false;
	}
	//check length of password ,maybe check if password is strong?
	if(sPassword.length < 6){
		flag = false;
	}
	//validate first name
	if(!validation.onlyLetters(fName)){
		flag = false;
	}
	//validate last name
	if(!validation.onlyLetters(lName)){
		flag = false;
	}
	//validate email address
	if(!validation.validEmail(sEmail)){
		flag = false;
	}
	//validate cell number
	if(!validation.validPhoneNumber(sCell)){
		flag = false;
	}
	//validate sDob 
	var d = new Date();
	var user_dob = new Date(sDob);
	if((d.getYear() - user_dob.getYear() < 16) | (d.getYear() - user_dob.getYear >80)){
	 flag = false;
	}


	if(flag){ //user input passed validation
		console.log("success");
		let succ = signUp(fName,lName,sDob,sCell,sEmail,sPassword);
        Promise.resolve(succ).then((ret)=>{
        //When the signup is successful
        if(ret[0]==="success"){
          console.log("user added");
          //When the signUp is successful the user json object will be placed into the second element of the array returned
		  	setUser(ret[1])
		  	onSucceed(ret[1])
            console.log(ret[1]);
              }
           //When the signup is unsuccessful
         else{
              console.log("unable to add user");
              }
          })
	} else { //user input failed validation 
		console.log("failure");
		//error();
	}
}
function addUser(){ //register user to database
	
}

function error(){ //use this for a toast message - toast message has to be specified in html
	var toast = document.getElementById("toast"); //toast message informs user that their info is not inserted correctly and what they should add
	toast.className = "show";
	setTimeout(function(){ //function that repeats until timeout
		toast.className = toast.className.replace("show","");
	},3000)
	
}

function init(){
	document.getElementById("btnRegister").onclick = getInputs(); // when clicked, register user
}
