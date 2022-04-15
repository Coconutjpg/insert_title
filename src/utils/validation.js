export class validation{
	//class for validation methods to be used when screening user input
    // to use in other js files-> import{validation} from './validation.js';

 constructor(){
	 //mandatory constructor method 
  } 
 static onlyDigits(sLine){//returns true if a string only contains numbers
	var sChar;
  for(let i = 0;i<sLine.length;i++){
	sChar = sLine[i];
	if( !(sChar >= "0" && sChar<="9") ){
		return false;
	   }
    }
  return true;
 }

 static validEmail(sEmail){ //returns true if a string contains only 1 "@"  and at least 1 "." //maybe restrict email domain in the future?
	var flag1 = false;
	var flag2 = false;
	var sChar;
	for(let i = 0;i<sEmail.length;i++){
		if(sEmail[i] == "@"){
			if(flag1 == false){
				flag1 = true;
			}
			else{
				return false;
			}
		}
		if(flag2 | sEmail[i] == "."){
			flag2 = true;
		}
	}
	if(flag1 && flag2){
		return true;
	}
	else{
		return false;
	}
 }
 static onlyLetters(sString){
	for(let  i = 0;i<sString.length;i++){
		if( (sString[i] >= "a" && sString[i] <="z") | (sString[i] >= "A" && sString[i] <= "Z")){
		}else{
			return false;
		}
	}
	return true;	
 } 
 static validPhoneNumber(sPhoneNumber){ //returns true if a number is exactly 10 digits and contains only numbers
	var a = sPhoneNumber;
	a = a.replace(" ","");
	a = a.replace("+","");	
	if( ( ( a.length == 10)| (a.length == 11)) && (this.onlyDigits(a))){
		return true;
	}else{
		return false;
	}
  }
}




