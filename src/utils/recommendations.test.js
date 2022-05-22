import {get_recommendations} from './recommendations.js'

describe('recommendations test', () =>{
    test('recommendation test', () =>{
        const output = await get_recommendations("general",'1naR0WwJu2JptBUPskhI')
        expect(output).toStrictEqual({});
    })
})
