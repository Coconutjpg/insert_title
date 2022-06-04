import { validation } from './validation.js';
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