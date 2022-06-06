import {submitAddress} from './address.js'

describe('validate address tests',()=>{
    test('Given address with all empty fields, return false', () =>{
      const  address = {
        province : "", 
        city : "" , 
        suburb : "" , 
        street : "" , 
        street_number : "" , 
        area_code : -1
      };
      expect(submitAddress(address,function(){return null;})).toBe(false);
    })
    test('Given address with  filled fields and one field is empty, return false', () =>{
        const  address = {
          province : "Gauteng", 
          city : "Johannesburg" , 
          suburb : "Parktown" , 
          street : "EmpireRoad" , 
          street_number : "" , 
          area_code : 12
        };
        expect(submitAddress(address,function(){return null;})).toBe(false);
      })
    test('Given address with all filled fields and area code is -1, return false', () =>{
        const  address = {
          province : "Gauteng", 
          city : "Johannesburg" , 
          suburb : "Parktown" , 
          street : "EmpireRoad" , 
          street_number : "42" , 
          area_code : -1
        };
        expect(submitAddress(address,function(){return null;})).toBe(false);
      })
    test('Given address with all fields filled in, return true', () =>{
        const  address = {
          province : "Gauteng", 
          city : "Johannesburg" , 
          suburb : "Parktown" , 
          street : "Empire Road" , 
          street_number : "42" , 
          area_code : 1440
        };
        expect(submitAddress(address,function(){return null;})).toBe(true);
      })

  })