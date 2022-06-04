/**
 * @jest-environment node
 */
import {get_recommendations,detailedSuggestions,getCategoryOf,fetchAsync} from './recommendations.js'

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve([1,2,3,4,5])
}));

describe('get recommendations test', () =>{
    test('test with valid type and item id',async () =>{
        const output = await get_recommendations("general",null);
        expect(output[0]).toBe([])
    })
})

describe('detailed suggestions test', () =>{
    test('test with valid item id',async () =>{
        const output = await detailedSuggestions('1naR0WwJu2JptBUPskhI');
        expect(output[0]).toBe([])
    })
})

describe('get category test', () =>{
    test('test with valid item id',async () =>{
        const output = await getCategoryOf('1naR0WwJu2JptBUPskhI');
        expect(output).toBe("Chassis")
    })
})

describe('fetch async tests', () =>{
    test('test with valid url',async () =>{
        const output = await fetchAsync("https://get-sd-cluster.herokuapp.com/getcluster/?point=[1,2,3,4,5,6,7,8,9]");
        expect(output[0]).toBe([]);
        //expect(fetch).toHaveBeenCalledWith("https://get-sd-cluster.herokuapp.com/getcluster/?point=[1,2,3,4,5,6,7,8,9]");
    })
})
