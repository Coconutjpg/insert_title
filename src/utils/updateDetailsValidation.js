import {validation} from './validation.js';
export function validateDetails(details,outputMethod) { //details = {firstname :Josh , lastname : James,Password : password, email address : email}
    var flag = true; // return true if all details passed validation
    //initialise detail values
    var fName = details.first_name;
    var lName = details.last_name;
    var email = details.email;
    var phoneNum = details.phoneNumber;
    var dob = details.DoB;
    //validate name change
    if(fName!= null){
        if ((validation.onlyLetters(fName) == false)  | (fName.length == 0)) {
            flag = false;
        }
    }
    //validate last name change
    if(lName != null){
        if ( (validation.onlyLetters(lName) == false)  | (lName.length == 0)) {
            flag = false;
        }    
    }
    //validate email change
    if(email!= null){
        if ((validation.validEmail(email) == false) | (email.length == 0)) {
            flag = false;
        }        
    }
    //validate phone number change
    if(phoneNum != null){
        if ((validation.validPhoneNumber(phoneNum) == false) | (phoneNum.length == 0)) {
            flag = false;
        } 
    }
   
    //validate dob change
    if(dob != null){
        var d = new Date();
        var user_dob = new Date(dob);
        if((d.getYear() - user_dob.getYear() < 16) | (d.getYear() - user_dob.getYear() >80) | (dob.length == 0)){
            flag = false;
        }
    }
    return flag;
    }
