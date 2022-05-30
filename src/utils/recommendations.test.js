/**
 * @jest-environment node
 */
import {get_recommendations} from './recommendations.js'

jest.useFakeTimers();
jest.setTimeout(100000);

//tests reccomendations function
describe('recommendations test', () =>{
    test('recommendation test', () =>{
        const output = get_recommendations("general",null)
        return expect(output).resolves.toStrictEqual({});
    })
})
