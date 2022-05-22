import{hashing} from './hashing.js'

//is password being hashed
describe("is being hashed tests",() =>{
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
describe("correct hashing tests",() =>{
    test('only letters', () =>{
        expect(hashing.hashPassword('asdasd')).toStrictEqual(["$2a$13$Vlv9cq9vG/w8tyM8PRGkvuB8uRPGxDkRb5XuyG9UBQ/QT5CUWcOLi", "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"]);
    })
    test('only digits', () =>{
        expect(hashing.hashPassword('123456')).toStrictEqual(["$2a$13$Vlv9cq9vG/w8tyM8PRGkvu3CNqpgfB/7XsO/KU0NGz7eWwyuRdGqa", "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"]);
    })
    test('mixture', () =>{
        expect(hashing.hashPassword('asd123')).toStrictEqual(["$2a$13$Vlv9cq9vG/w8tyM8PRGkvuwJvryNeq6h6TwD4QlSMMxvlYYmrqz3i", "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"]);
    })
});

//is compare password working
