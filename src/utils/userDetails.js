/**
 * user {
 *      displayName
 *      id
 *      emailAddress
 *      ....
 * }
 * 
 */

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
    if(updater!=null){
        updater(u.displayName)
    }
    user = u
}

export {user, setUser, setUpdater}