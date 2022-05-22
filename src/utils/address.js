

export function verifyAddress(sAddress){ //verify if a street address exists
//make http request to url with sAddress and api key 
var key = ""; //key for accesssing google maps geocoding api
var query = "https://maps.googleapis.com/maps/api/geocode/json" //url for post request that returns a json of the search results
var address = sAddress; //address the user has given
//do a post method 
if(key != ""){
    let xhr = new XMLHttpRequest(); //post request
    xhr.open("POST",query)
    xhr.setRequestHeader('address',sAddress);
    xhr.setRequestHeader('key',key)
    xhr.send();
    xhr.onload = function(response) { // method for when the request receives a response
        console.log(response)
        //check if there were any results found for the address
        if(response.status == "ZERO_RESULTS"){
            return false;
        }
        return true;
    }
    }
    else{
        return true;
    }
}