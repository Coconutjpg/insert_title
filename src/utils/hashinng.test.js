import { hash } from 'bcrypt'
import{hashing} from './hashing.js'

//correct password tests
describe("correct password",()=>{
    test('1234',()=>{
        password="1234"
        hash=hashing.hashPassword(password)
        expect(hashing.comparePassword(password,hash)).toBe(true);
    })
    test('asdf',()=>{
        password="asdf"
        hash=hashing.hashPassword(password)
        expect(hashing.comparePassword(password,hash)).toBe(true);
    })
})

//incorrect password tests
describe("incorrect password",()=>{
    test('1234',()=>{
        password="1234"
        hash="asdafdaf"
        expect(hashing.comparePassword(password,hash)).toBe(false);
    })
    test('asdf',()=>{
        password="asdf"
        hash="123134134"
        expect(hashing.comparePassword(password,hash)).toBe(false);
    })
})