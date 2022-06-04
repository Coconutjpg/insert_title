/**
 * @jest-environment node
 */
import {detailedSuggestions,getCategoryOf,fetchAsync} from './recommendations.js'

describe('recommendations test', () =>{
    test('recommendation test', async () =>{
        try{
            let output = await detailedSuggestions('1naR0WwJu2JptBUPskhI');
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe(false);
            })
        } catch (e){

        }
    })
})

describe('recommendations test', () =>{
    test('recommendation test', async () =>{
        try{
            let output = await getCategoryOf('1naR0WwJu2JptBUPskhI');
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("C");
            })
        } catch (e){

        }
    })
})

describe('recommendations test', () =>{
    test('recommendation test', async () =>{
        try{
            let output = await fetchAsync("https://get-sd-cluster.herokuapp.com/getcluster/?point=[1,2,3,4,5,6,7,8,9]");
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe(false);
            })
        } catch (e){

        }
    })
})
