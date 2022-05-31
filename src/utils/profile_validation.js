import { validation } from './validation';
export function validateIncrease(amount) {
        if (isNaN(amount) == true) {
                return false;
        }
        if (amount == null) {
                return false;
        }
        var sNumber = amount + "";
        sNumber = sNumber.replace("+", "");
        sNumber = sNumber.replace("-", "");
        if (sNumber[0] == ".") { //number started with a decimal place
                return false;
        }
        var len = sNumber.len;
        sNumber.replace(".", "");
        if (len - sNumber.len > 1) { // the number had 2 or more decimal points
                return false;
        }
        return validation.onlyDigits(sNumber);
}

export function validateDetails(details, flags) { //details = {firstname :Josh , lastname : James,Password : password, email address : email}
        var flag = true; // return true if all details passed validation
        //change dob
        if (flags.dob) {
                //validate age change
        }
        //change email
        if (flags.email) {
                //validate email change
        }
        //change first name
        if (flags.fName) {
                //validate name change
        }

        //change last name
        if (flags.lName) {
                //validate name change
        }

        //change phone number
        if (flags.phonenum) {
                //validate phone number
        }

        }