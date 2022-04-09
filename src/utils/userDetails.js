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

function setUpdater(f){
    updater = f
}

function setUser(u){
    console.log(u)
    if(updater!=null){
        updater(u.displayName)
    }
    user = u
}

export {user, setUser, setUpdater}