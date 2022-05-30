import performRegistration from "./registration.js"

//failing registration tests
describe('failed registration tests',()=>{
    test('passwords dont match',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "passwor"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('passwords length < 6',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "pass",
        repeatPassword : "pass"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('first name has numbers',async ()=>{
        const output = await performRegistration({firstName : "first1name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('first name is length 0',async ()=>{
        const output = await performRegistration({firstName : "",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('last name has numbers',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname1",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('surname has length 0',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('invalid email',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "emailgmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('email length 0',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('cell number invalid',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "123456789",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('cell number length 0',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "04/11/2000",
        emailAddress  :  "email@gmail.com",
        cellNo : "",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('too young to use website (not 16 yet)',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "22/05/2022",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('too old to use website (over 80)',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "22/05/1922",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
    test('date length 0',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
})

//passing registration tests that fails beacuse email is used
describe('valid registration test',()=>{
    test('valid registration',async ()=>{
        const output = await performRegistration({firstName : "name",
	@@ -144,6 +144,6 @@ describe('valid registration test',()=>{
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "password"},function(){return 'test'})
        expect(output).toBe(false);
    })
})
