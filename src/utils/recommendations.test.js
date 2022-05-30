/**
 * @jest-environment node
 */
import {get_recommendations} from './recommendations.js'

jest.useFakeTimers();
jest.setTimeout(10000);

//tests reccomendations function
describe('recommendations test', () =>{
    test('recommendation test', async () =>{
        try{
            let output = await get_recommendations("general",'1naR0WwJu2JptBUPskhI');
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe(false);
            })
        } catch (e){

        }
    })
})
