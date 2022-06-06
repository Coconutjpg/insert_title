import {validateIncrease} from './profile_validation.js'

describe("validate increase of credits tests",() =>{
    test('Given null value, should return false', () =>{
      expect(validateIncrease(null)).toBe(false);
    })
    test('Given a value that is not a number,should return false', () =>{
      expect(validateIncrease("notanumber")).toBe(false);
    })
    test('Given a value that starts with a decimal point, should return false', () =>{
      expect(validateIncrease(".01")).toBe(false);
    })
    test('Given a value with 2 decimal points,should return false', () =>{
        expect(validateIncrease("0.1.0")).toBe(false);
      })
      test('Given a value with only digits and one decimal place,should return true', () =>{
        expect(validateIncrease("500")).toBe(true);
      })
  });