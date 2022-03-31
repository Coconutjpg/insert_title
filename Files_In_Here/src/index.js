import { logIn, test, logOut, getCategoryProds } from './firebase.js'

document.getElementById("logIn").onclick = function(){
    let emailText = document.getElementById("e-mail").value;
    let password = document.getElementById("pass").value;
    logIn(emailText, password);
}

document.getElementById("logOut").onclick = function(){
    logOut();
}

document.getElementById("btnFilter").onclick = function(){
    let cat = document.getElementById("Filter").value;
    prods = getCategoryProds(cat);
    console.log(prods);
}

document.getElementById("test").onclick = function(){
    test('John');
}
