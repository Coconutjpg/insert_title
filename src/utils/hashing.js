
export class hashing{
    //class for password hashing
    //to use in other js files -> import{hashing} from './hashing.js'

    constructor(){
        //mandatory constructor class
    }
    
    var bcrypt = require('bycrypt');
    var saltRounds = 13; //number os salt rounds
    
    //return hashed password
    static hashPassword(password){
        bcrypt.genSalt(saltRounds,function(err,salt){
            bcrypt.hash(password,salt,function(err,hash){
                return hash
            })
        });    
    }

    //compare password entered with hash, returns true if they match
    static comparePassword(password,hash){
        bcrypt.compare(password,hash,function(err,result){
            if(result){
                return true;
            }
            else{
                return false;
            }
        })
    }
}

console.log(7)
