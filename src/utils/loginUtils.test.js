/**
 * @jest-environment node
 */

//Functions that are required for the tests
import {performLogin,validatePassword,validateEmail} from './loginUtils.js'
import {validation} from './validation.js'

const testSuccess = function(){
    console.log('success');
};

//Email Validation, tests that function only returns 
//true when there is one "2" and one "." in the input string
describe("Email Validation",() =>{
    test('no @', () =>{
        expect(validateEmail('hello.com')).toBe(false);
    })

    test('no .', () =>{
        expect(validateEmail('hello@gmailcom')).toBe(false);
    })

    test('neither @ nor .', () =>{
        expect(validateEmail('hello')).toBe(false);
    })

    test('2 @s, no .', () =>{
        expect(validateEmail('hello@gmail@com')).toBe(false);
    })

    test('2 @s, 1 .', () =>{
        expect(validateEmail('hello@gmail@hotmail.com')).toBe(false);
    })

    test('2 .s, no @', () =>{
        expect(validateEmail('hello.gmail.com')).toBe(false);
    })

    test('2 .s, 1 @', () =>{
        expect(validateEmail('hello@gmail..com')).toBe(false);
    })

    test('2 .s, 2 @s', () =>{
        expect(validateEmail('hello@gmail@hotmail..com')).toBe(false);
    })

    test('1 ., 1 @', () =>{
        expect(validateEmail('hello@gmail.com')).toBe(true);
    })
});


//Password Validation, tests that function only returns 
//true when the length of the password is greater than or equal to 6
describe("Password Validation",() =>{
    test('null value', () =>{
        expect(validatePassword(null)).toBe(false);
    })
    
    test('length = 0', () =>{
        expect(validatePassword('')).toBe(false);
    })

    test('length < 6', () =>{
        expect(validatePassword('test')).toBe(false);
    })

    test('length > 6', () =>{
        expect(validatePassword('test1234')).toBe(true);
    })

    test('length = 6', () =>{
        expect(validatePassword('test11')).toBe(true);
    })
});


//Login tests
describe("Perform LogIn Function",() =>{
    test('No email', ()=>{
        let output = performLogin({"emailAddress": "", "password":"Test123"}, testSuccess)
        Promise.resolve(output).then((arr)=>{
            expect(arr).toBe(null);
        })		
    })

    test('Failed email validation', () => {
        let output = performLogin({"emailAddress": "test123@gmailcom", "password":"Test123"}, testSuccess)
        Promise.resolve(output).then((arr)=>{
            expect(arr).toBe(null);
        })		
    })

    test('Failed password validation', () =>{
        let output = performLogin({"emailAddress": "test123@gmailcom", "password":"Test3"}, testSuccess)
        Promise.resolve(output).then((arr)=>{
            expect(arr).toBe(null);
        })		
    })

   test('Successful LogIn', () =>{
        let output = performLogin({"emailAddress": "test_team@gmailcom", "password":"test123"}, testSuccess)
        Promise.resolve(output).then((arr)=>{
            expect(arr).toBe(undefined);
        })		
    })
});
