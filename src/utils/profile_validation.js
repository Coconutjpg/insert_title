import {validation} from './validation';
export function validateIncrease(sNumber){
        if(isNaN(amount) == true){
                return false;
        }
        if(amount == null){
                return false;
        }
        sNumber = sNumber.remove("+")
        sNumber = sNumber.remove("-");
        if(sNumber[0] == "."){ //number started with a decimal place
                return false;
        }
        var len = sNumber.len;
        sNumber.remove(".")
        if(len - sNumber.len > 1 ){ // the number had 2 or more decimal places
                return false;
        }
        return validation.onlyDigits(sNumber);
}