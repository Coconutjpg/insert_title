import {validateDetails} from './updateDetailsValidation';

describe('validate user Details tests',()=>{
    test('Given details that are all empty,return false',async ()=>{
        const output = await validateDetails({first_name : "",
        last_name : "",
        email  :  "",
        cellNo : "",
        phoneNumber: "",
        DoB : ""},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('Given details with one empty field,return false',async ()=>{
        const output = await validateDetails({first_name : "",
        last_name : "lastname",
        email  :  null,
        cellNo : null,
        phoneNumber: null,
        DoB : null},function(){return 'test'})
        expect(output).toBe(false);
    })    
    test('Given details that are all null,return true',async ()=>{
        const output = await validateDetails({first_name : null,
        last_name : null,
        email  :  null,
        cellNo : null,
        phoneNumber: null,
        DoB : null},function(){return 'test'})
        expect(output).toBe(true);
    })

    test('Given valid details, return true',async ()=>{
        const output = await validateDetails({first_name : "Test",
        last_name : null,
        email  :  null,
        cellNo : null,
        phoneNumber: null,
        DoB : null},function(){return 'test'})
        expect(output).toBe(true);
    })

})