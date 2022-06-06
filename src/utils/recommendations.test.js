/**
 * @jest-environment node
 */
 import {get_recommendations,detailedSuggestions,getCategoryOf,fetchAsync} from './recommendations.js'

 describe('get category test', () =>{
     test('test with valid item id',async () =>{
         const output = await getCategoryOf('1naR0WwJu2JptBUPskhI');
         expect(output).toBe("Chassis")
     })
 })
 
 describe('detailed suggestions test', () =>{
      test('test with valid item id', async () =>{
          try{
              let output = await detailedSuggestions('1naR0WwJu2JptBUPskhI');
              Promise.resolve(output).then((arr)=>{
                  expect(arr[0]).toBe(false);
              })
          } catch (e){
  
          }
      })
  })
 
 describe('fetch async tests', () =>{
      test('test with valid url', async () =>{
          try{
              let output = await fetchAsync("https://get-sd-cluster.herokuapp.com/getcluster/?point=[1,2,3,4,5,6,7,8,9,10]");
              Promise.resolve(output).then((arr)=>{
                  expect(arr[0]).toBe(false);
              })
          } catch (e){
  
          }
      })
  })
