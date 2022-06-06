import {validation} from './validation.js';
import {updateUserDetails} from './database_functions.js';
export async function validateDetails(details,outputMethod,keyEmail) { //details = {firstname :Josh , lastname : James,Password : password, email address : email}
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
    if(flag){ //validation checks were successful,attempt to commit new changes
        if(keyEmail == null){
            return true;
        }
         let succ = updateUserDetails(keyEmail,details);
         var response = await Promise.resolve(succ).then((ret)=>{ 
			//when change is successful
			if(ret[0]==="success"){
                const message = "Details changed successfully";
				outputMethod(message,true);
				return true
			} 
            else if(ret[0]== "failed"){ 
                if(ret[1] == "email_change"){
                    const message = "We require that you have logged in recently, please log in again to change your email";
                    outputMethod(message,false);
                    return false;
                }
                else{
                    const message = "Failed to update your details due to a database error"
                    outputMethod(message,false);
                    return false;
                }
            }
        });
    }
    else{//validation checks failed
        const message = "Detail change failed. Please enter your details in the correct format"
        outputMethod(message,false);
        return false;
    }
    }
