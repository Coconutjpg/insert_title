import { addAddress } from "./database_functions";
import { user } from "./userDetails";

export function submitAddress(address, result_callback){
    // checks that the given address is not missing any fields
    if( address.province == "" || 
        address.city == "" || 
        address.suburb == "" || 
        address.street == "" || 
        address.street_number == "" || 
        address.area_code == -1){
        result_callback(false)
        return false;
    } else {
        result_callback(true,address) //return :  if the addition was successful or not
        return true;
    }
    
}