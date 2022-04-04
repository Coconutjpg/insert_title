import {validation} from 'validation.js';

function getInputs(){ //method that fetches the data from 
var fName = document.getElementById("firstName").textContent;
var lName = document.getElementById("lastName").textContent;
var sDob = document.getElementById("dob").textContent;
var sEmail = document.getElementById("emailAddress").textContent;
var sCellNo = document.getElementById("cellNo").textContent;
var sPassword = document.getElementById("password").textContent;
var repPassword = document.getElementById("repeatPassword").textContent;

register(fName,lName,sDob,sEmail,sCell,sPassword,repPassword);
}

function register(fName,lName,sDob,sEmail,sCell,sPassword,repPassword){ //method for validating input and then inserting to db
var flag = true;
let x = validation();
//verify passwords
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



if(flag){
	register();
}
else{
flag = false;
error();
   }
}
function register(){}

function error(){ //use this for a toast message - toast message has to be specified in html
	var toast = document.getElementById("toast"); //toast message informs user that their info is not inserted correctly
	toast.className = "show";
	setTimeout(function(){ //function that repeats until timeout
		toast.className = toast.className.replace("show","");
	},3000)
	
}

function init(){
	document.getElementById("btnRegister").onclick = getInputs(); // when clicked, register user
	document.getElementById("btnLogin").onclick = moveLogin(); //when clicked, move to login screen
	document.getElementById("btnHome").onclick = moveHome();  // when clicked,move to home screen
}

function moveLogin(){ //move to login screen
	
}
function moveHome(){ //move to home screen
	
}