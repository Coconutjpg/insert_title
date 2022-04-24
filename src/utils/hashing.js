const bcrypt = require('bycrypt');
const saltRounds = 13;

function hashPassword(password){
    bcrypt.genSalt(saltRounds,function(err,salt){
        bcrypt.hash(password,salt,function(err,hash){
            return hash
        })
    });
}

function comparePassword(password,hash){
    bcrypt.compare(password,hash,function(err,result){
        if(result){
            return true;
        }
        else{
            return false;
        }
    })
}