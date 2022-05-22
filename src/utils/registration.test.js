import performRegistration from "./registration.js"

//failing registration tests
describe('failed registration tests',()=>{
    test('passwords dont match',()=>{
        expect(performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "22/05/2022",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "passwor"},function(){return 'test'})).toBe({});
    })
})
