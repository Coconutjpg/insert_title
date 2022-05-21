

function verifyAddress(sAddress){
//make http request to url with sAddress and api key
GeocoderRequest = {address : sAddress, region : ZA};
const Geocoder = google.maps.Geocoder();
Geocoder.geocode(GeocoderRequest,handleResult)

function handleResult(response){

}


}