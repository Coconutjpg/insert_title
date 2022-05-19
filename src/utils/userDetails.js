/**
 * user {
 *      displayName
 *      id
 *      emailAddress
 *      ....
 * }
 * 
 */

import { db } from "../App"

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
        Promise.resolve(db.getCredits(u.email)).then((creds) => {
            console.log(creds)
            updater.setCredits(creds)
        })
    } else if(updater != null){
        updater.setUserName("")
    }
    
    user = u
}

function refreshCredits(){
    if(updater!=null && user != null){
        Promise.resolve(db.getCredits(u.email)).then((creds) => {
            console.log(creds)
            updater.setCredits(creds)
        })
    }
}

function setCredits(creds){
    updater.setCredits(creds)
}

export {user, setUser, setUpdater, refreshCredits, setCredits}