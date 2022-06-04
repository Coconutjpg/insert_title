/**
 * @jest-environment node
 */
import {detailedSuggestions,getCategoryOf,fetchAsync} from './recommendations.js'

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve("123")
}));

describe('detailed suggestions test', () =>{
    test('test with valid item id',async () =>{
        const output = await detailedSuggestions('1naR0WwJu2JptBUPskhI');
        expect(output).toBe([])
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
        expect(output).toBe([]);
        //expect(fetch).toHaveBeenCalledWith("https://get-sd-cluster.herokuapp.com/getcluster/?point=[1,2,3,4,5,6,7,8,9]");
    })
})


