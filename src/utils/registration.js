import {validation} from "./validation.js";

export default function performRegistration(user_data){ //method that fetches the data from gui labels - make to get json data instead

var fName = user_data.firstName;
var lName = user_data.lastName;
var sDob = user_data.dob;
var sEmail = user_data.emailAddress;
var sCellNo = user_data.cellNo;
var sPassword = user_data.password;
var repPassword = user_data.repeatPassword;
console.log(user_data)
register(fName,lName,sDob,sEmail,sCellNo,sPassword,repPassword);

//var user_data = JSON.parse(inputJSON);
//console.log(inputJSON);
}

function register(fName,lName,sDob,sEmail,sCell,sPassword,repPassword){ //method for validating input and then inserting to db
	var flag = true;
	let x = new validation();
	//verify passwords -add suggestion of how to make password a strong password in the future
	if(sPassword != repPassword){
		flag = false;
	}
	//check length of password ,maybe check if password is strong?
	if(len(sPassword) < 6){
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
	//Date d = new Date();
	//Date user = new Date(sDob);
	//if((d.getYear() - user.getYear() < 16) | (d.getYear() - user.getYear >80)){
	//flag = false;
	//}


	if(flag){
		addUser();
	} else {
		flag = false;
		error();
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
