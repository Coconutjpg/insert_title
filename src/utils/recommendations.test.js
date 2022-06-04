/**
 * @jest-environment node
 */
import {detailedSuggestions,getCategoryOf} from './recommendations.js'

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
                expect(arr[0]).toBe(false);
            })
        } catch (e){

        }
    })
})
