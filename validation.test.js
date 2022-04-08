const {onlyDigits,onlyLetters, validEmail, validPhoneNumber} = require('./validation');

//digit tests
describe("digit tests",() =>{
  test('only letters', () =>{
    expect(onlyDigits('asdasd')).toBe(false);
  })
  test('only digits', () =>{
    expect(onlyDigits(123)).toBe(true);
  })
  test('mixture', () =>{
    expect(onlyDigits('asd123')).toBe(false);
  })
});

//letter tests
describe('letter tests',()=>{
  test('only letters', () =>{
    expect(onlyLetters("123")).toBe(false);
  })
  test('only digits', () =>{
    expect(onlyLetters("asdasd")).toBe(true);
  })
  test('mixture', () =>{
    expect(onlyLetters("123asd")).toBe(false);
  })
})

//email tests
describe('email tests',()=>{
  test('valid email',()=>{
    expect(validEmail("dtjabring123@gmail.com")).toBe(true);
  })
  test('invalid email @',()=>{
    expect(validEmail("dtjabring123gmail.com")).toBe(false);
  })
  test('invalid email .',()=>{
    expect(validEmail("dtjabring123@gmailcom")).toBe(false);
  })
})

//phone number tests
describe('phone number tests',()=>{
  test('valid phone number',()=>{
    expect(validPhoneNumber("0794049822")).toBe(true);
  })
  test('invalid phone number short',()=>{
    expect(validPhoneNumber("079404982")).toBe(false);
  })
  test('invalid phone number long',()=>{
    expect(validPhoneNumber("07940498222")).toBe(false);
  })
  test('invalid phone number letter',()=>{
    expect(validPhoneNumber("0794o49822")).toBe(false);
  })
})
