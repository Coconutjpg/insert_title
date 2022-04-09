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

function setUser(u){
    console.log(u)
    user = u
}

export {user, setUser}