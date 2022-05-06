/**
 * user {
 *      displayName
 *      id
 *      emailAddress
 *      ....
 * }
 * 
 */

import { getCredits } from "./database_functions";

var user = null
var updater = null;


/**
 * @param {function} f 
 * 
 * f is the function that will be called (stored in the navigator)
 * that will update the welcome text
 */
function setUpdater(f){
    updater = f
}

// called when the user changes
function setUser(u){
    if(updater!=null && u != null){
        updater.setUserName(u.displayName)
        console.log(u.email)
        Promise.resolve(getCredits(u.email)).then((creds) => {
            console.log(creds)
            updater.setCredits(creds)
        })
    }
    
    user = u
}

export {user, setUser, setUpdater, updater}