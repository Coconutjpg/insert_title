import {get_recommendations} from './recommendations.js'

describe('recommendations test', () =>{
    test('recommendation test', () =>{
        expect(get_recommendations("general",'1naR0WwJu2JptBUPskhI')).toStrictEqual({});
    })
})
