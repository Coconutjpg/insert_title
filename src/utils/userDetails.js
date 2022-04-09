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
    console.log({
        field: "user",
        user:u.displayName
    })
    user = u;
}

export {user, setUser}