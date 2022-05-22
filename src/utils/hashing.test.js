import{hashing} from './hashing.js'

//is password being hashed
describe("is being hashed tests",() =>{
    test('only letters',async () =>{
        const output = hashing.hashPassword('asdasd');
        expect(output).not.toBe('asdasd');
    })
    test('only digits',async () =>{
        const output = hashing.hashPassword('123');
        expect(output).not.toBe('123');
    })
    test('mixture',async () =>{
        const output = hashing.hashPassword('asd123');
        expect(output).not.toBe('asd123');
    })
});

//is hashed password correct
describe("correct hashing tests",() =>{
    test('only letters',async () =>{
        const output = hashing.hashPassword('asdasd');
        expect(output).toStrictEqual(["$2a$13$Vlv9cq9vG/w8tyM8PRGkvuB8uRPGxDkRb5XuyG9UBQ/QT5CUWcOLi", "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"]);
    })
    test('only digits',async () =>{
        const output = hashing.hashPassword('123456');
        expect(output).toStrictEqual(["$2a$13$Vlv9cq9vG/w8tyM8PRGkvu3CNqpgfB/7XsO/KU0NGz7eWwyuRdGqa", "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"]);
    })
    test('mixture',async () =>{
        const output = hashing.hashPassword('asd123');
        expect(output).toStrictEqual(["$2a$13$Vlv9cq9vG/w8tyM8PRGkvuwJvryNeq6h6TwD4QlSMMxvlYYmrqz3i", "$2a$13$Vlv9cq9vG/w8tyM8PRGkvu"]);
    })
});
