import{hashing} from './hashing.js'

//correct password tests
describe("correct password",()=>{
    test('1234',()=>{
        var password="1234"
        var hash=hashing.hashPassword(password)
        expect(hashing.comparePassword(password,hash)).toBe(true);
    })
    test('asdf',()=>{
        var password="asdf"
        var hash=hashing.hashPassword(password)
        expect(hashing.comparePassword(password,hash)).toBe(true);
    })
})

//incorrect password tests
describe("incorrect password",()=>{
    test('1234',()=>{
        var password="1234"
        var hash="asdafdaf"
        expect(hashing.comparePassword(password,hash)).toBe(false);
    })
    test('asdf',()=>{
        var password="asdf"
        var hash="123134134"
        expect(hashing.comparePassword(password,hash)).toBe(false);
    })
})
