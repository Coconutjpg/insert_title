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
        sNumber = sNumber.replace(".", "");
        return validation.onlyDigits(sNumber);
}