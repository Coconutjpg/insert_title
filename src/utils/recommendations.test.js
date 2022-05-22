import get_recommendations from './recommendations'

describe('recommendations test', () =>{
    test('recommendation test', () =>{
        const output = await get_recommendations("general",null);
        expect(output).toBe(false);
    })
})