/**
 * @jest-environment node
 */
import {get_recommendations} from './recommendations.js'

jest.useFakeTimers();
jest.setTimeout(10000);

//tests reccomendations function
describe('recommendations test', () =>{
    test('recommendation test', async () =>{
        const output = await get_recommendations("general",null)
        expect(output).toStrictEqual({});
    })
})
