import performRegistration from "./registration.js"

//failing registration tests
describe('failed registration tests',()=>{
    test('passwords dont match',async ()=>{
        const output = await performRegistration({firstName : "first name",
        lastName : "surname",
        dob : "22/05/2022",
        emailAddress  :  "email@gmail.com",
        cellNo : "1234567890",
        password : "password",
        repeatPassword : "passwor"},function(){return 'test'})
        expect(output).toBe(false);
    })
})
