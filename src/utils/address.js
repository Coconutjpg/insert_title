import { addAddress } from "./database_functions";
import { user } from "./userDetails";

export function submitAddress(address, result_callback){
    // checks that the given address is not missing any fields
    if( user.email == null ||
        address.province == "" || 
        address.city == "" || 
        address.suburb == "" || 
        address.street == "" || 
        address.street_number == "" || 
        address.area_code == -1){
        result_callback(false)
    } else {
        //add address using database method
        addAddress(user.email, address.street_number, address.street, address.suburb, address.city, address.province, address.area_code)
        result_callback(true) //return :  if the addition was successful or not
    }
    
}