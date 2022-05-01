//Functions that are required for the tests
import {performLogin,validatePassword,validateEmail} from './loginUtils.js'
import {validation} from './validation.js'

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
describe("Email Validation",() =>{
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
