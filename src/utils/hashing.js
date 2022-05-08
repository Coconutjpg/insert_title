const bcrypt = require('bcryptjs');

export class hashing{
    //class for password hashing
    //to use in other js files -> import{hashing} from './hashing.js'
    constructor(){
        //mandatory constructor class
    }
  
    //return hashed password
    static hashPassword(password){
        var saltRounds = 13;
        //var salt = bcrypt.genSaltSync( saltRounds )
        var salt = "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"
        var hash =  bcrypt.hashSync( password, salt )
        return [hash, salt]
    }

    //compare password entered with hash, returns true if they match
    static comparePassword(password,hash){
        var saltRounds = 13;
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


