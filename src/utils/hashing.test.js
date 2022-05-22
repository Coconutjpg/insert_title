import{hashing} from './hashing.cjs'

//is password being hashed
describe("hashing tests",() =>{
    test('only letters', () =>{
        expect(hashing.hashPassword('asdasd')).not.toBe('asdasd');
    })
    test('only digits', () =>{
        expect(hashing.hashPassword('123')).not.toBe('123');
    })
    test('mixture', () =>{
        expect(hashing.hashPassword('asd123')).not.toBe('asd123');
    })
});

//is hashed password correct

//is compare password working