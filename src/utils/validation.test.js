import {validation} from './validation.js'
//digit tests
describe("digit tests",() =>{
  test('only letters', () =>{
    expect(validation.onlyDigits('asdasd')).toBe(false);
  })
  test('only digits', () =>{
    expect(validation.onlyDigits(123)).toBe(true);
  })
  test('mixture', () =>{
    expect(validation.onlyDigits('asd123')).toBe(false);
  })
});

//letter tests
describe('letter tests',()=>{
  test('only letters', () =>{
    expect(validation.onlyLetters("123")).toBe(false);
  })
  test('only digits', () =>{
    expect(validation.onlyLetters("asdasd")).toBe(true);
  })
  test('mixture', () =>{
    expect(validation.onlyLetters("123asd")).toBe(false);
  })
})

//email tests
describe('email tests',()=>{
  test('valid email',()=>{
    expect(validation.validEmail("dtjabring123@gmail.com")).toBe(true);
  })
  test('invalid email @',()=>{
    expect(validation.validEmail("dtjabring123gmail.com")).toBe(false);
  })
  test('invalid email .',()=>{
    expect(validation.validEmail("dtjabring123@gmailcom")).toBe(false);
  })
})

//phone number tests
describe('phone number tests',()=>{
  test('valid phone number',()=>{
    expect(validation.validPhoneNumber("0794049822")).toBe(true);
  })
  test('invalid phone number short',()=>{
    expect(validation.validPhoneNumber("079404982")).toBe(false);
  })
  test('invalid phone number long',()=>{
    expect(validation.validPhoneNumber("079404982220")).toBe(false);
  })
  test('invalid phone number letter',()=>{
    expect(validation.validPhoneNumber("0794o49822")).toBe(false);
  })
})
