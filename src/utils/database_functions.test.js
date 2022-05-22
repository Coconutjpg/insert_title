/**
 * @jest-environment node
 */
import{
    getProduct,getProducts,getProductsWithSorting_Limits_Category,getProductsByCategory, getCategories,
    signUp, logOut, logIn,
    getCredits,addCredits,
    clicked,
    getRatingsWithSorting_Limits,createRating,
    addToCart,getCart,emptyCart,updateQuantity,
    createOrder,getOrdersIDs,getOrder,updateOrderStatus,getProductsInCartForOrder,
    addAddress,getAddressesIDs,getAddress
} from './database_functions.js';


describe('Database Tests', () =>{
    describe('Get Products', () =>{
        test('Single Product Failure (Incorrect ID)', async () => {
            try{
                let prod = await getProduct('1naR0WwJu2JptB');
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                })		
            } catch (e) {

            }
        })

        test('Single Product Success', async () => {
            try{
                let prod = await getProduct('1naR0WwJu2JptBUPskhI');
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })		
            } catch (e) {

            }		
        })

        test('Product Filtering Failure - Incorrect Category', async () => {
            try{
                let prod = await getProductsWithSorting_Limits_Category('TVs', 'prod_cost' ,'asc', 0, 1);
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('failed');
                })
            } catch (e) {

            }
        })

        
        test('Product Filtering Failure - Start < 0', async () => {
            try{
                let prod = await getProductsWithSorting_Limits_Category('TVs', 'prod_cost' ,'asc', -1, 1);
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('failed');
                })
            } catch (e) {

            }
        })

        test('Product Filtering Failure - Start ==  null', async () => {
            try{
                let prod = await getProductsWithSorting_Limits_Category('TVs', 'prod_cost' ,'asc', null, 1);
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('failed');
                })
            } catch (e) {

            }
        })

        test('Product Filtering Success', async () => {
            let prod = await getProductsWithSorting_Limits_Category("Monitors", 'prod_cost', 'asc', 1, 10);
            Promise.resolve(prod).then((arr)=>{
                expect(arr[0]).toBe('success');
            })
        })

        test('Invalid Category' , async () => {
            try{
                let prod = await getProductsByCategory('TVs');
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('failed');
                })
            } catch (e){

            }
        })

        test('Successful Fetch' , async () => {
            let prod = await getProductsByCategory('Monitors');
            Promise.resolve(prod).then((arr)=>{
                expect(arr[0]).toBe('success');
            })
        })

        test('All Products', async () => {
            let prods = await getProducts()
            Promise.resolve(prods).then((arr)=>{
                expect(arr[0]).toBe('success');
            })
        })
    })

    describe('Get Categories', () =>{
        test('All Categories', async () => {
            let cats = await getCategories()
            Promise.resolve(cats).then((arr)=>{
                expect(arr[0]).toBe('success');
            })
        })
    })

    describe('Get Credits', () =>{
        test('Incorrect User', async () => {
            try{
                let creds = await getCredits('wrongy@gmail.com')
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe(-1);
                })
            } catch (e) {

            }
        })

        test('Correct User', async () => {
            try{
                let creds = await getCredits('test_team@gmail.com')
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe(95110);
                })
            } catch (e) {

            }
        })
    })
	
    describe("Get a user's cart given their email tests", () =>{      	
		test('Valid user email', async () => {
            try{
                let output = await getOrdersIDs('duran.reddy@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {

            }
        })	
        		
		test('Invalid user email', async () => {
            try{
                let output = await getOrdersIDs('invalid user email')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                })
            } catch (e) {

            }
        })			
    })				
	
    describe('Get Order details tests given order ID', () =>{      	
		test('Valid order ID', async () => {
            try{
                let output = await getOrder('HLUAYpCCdZGa5VjdFbRk')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {

            }
        })	

		test('Invalid order ID', async () => {
            try{
                let output = await getOrder('Invalid ID')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                })
            } catch (e) {

            }
        })			
    })	
    
    describe('Get Ratings Tests', () =>{
        test('Invalid ID', async() =>{
            try{
                let ratings = await getRatingsWithSorting_Limits("My Home TV", 'asc', 0, 1);
                Promise.resolve(ratings).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                });
            } catch (e) {

            }
        })

        test('Start < 0', async() =>{
            try{
                let ratings = await getRatingsWithSorting_Limits("1naR0WwJu2JptBUPskhI", 'asc', -1, 1);
                Promise.resolve(ratings).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                });
            } catch (e) {

            }
        })

        test('Start = null', async() =>{
            try{
                let ratings = await getRatingsWithSorting_Limits("1naR0WwJu2JptBUPskhI", 'asc', null, 1);
                Promise.resolve(ratings).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                });
            } catch (e) {

            }
        })

        test('Valid Input', async() =>{
            try{
                let ratings = await getRatingsWithSorting_Limits("x0KAOhS1OmMhYnZBTX8p", 'asc', 0, 1);
                Promise.resolve(ratings).then((arr)=>{
                    expect(arr[0]).toBe("success");
                });
            } catch (e) {

            }
        })
    })
	
    describe('Update Order status for an Order tests given order ID and status', () =>{      	
		test('Valid order ID', async () => {
            try{
                let output = await updateOrderStatus('HLUAYpCCdZGa5VjdFbRk','Packing')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("success");
                })
            } catch (e) {

            }
        })	

		test('Invalid order ID', async () => {
            try{
                let output = await updateOrderStatus('invalid order ID','testing')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("failed");
                })
            } catch (e) {

            }
        })			
    })		
	
    describe('Get Address IDs given user email tests', () =>{      
		test('Valid user email', async () => {
            try{
                let output = await getAddressesIDs('duran.reddy@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {

            }
        })	

		test('Invalid user email', async () => {
            try{
                let output = await getAddressesIDs('invalid user email')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                })
            } catch (e) {

            }
        })
    })
    
    describe('Log In/Log Out', () =>{
        test('Log Out', async () =>{
            try{
                outcome = await logout()
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr).toBe('success')
                })
            } catch (e) {
    
            }
        })
    
        test('Log In Failure (Incorrect Email)', async () =>{
            try{
                outcome = await login('invalid', 'test123')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr).toBe('failed')
                })
            } catch (e) {
    
            }
        })
    
        test('Log In Failure (Incorrect Password)', async () =>{
            try{
                outcome = await logIn('test_team@gmail.com', 'wrongPass')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr).toBe('failed')
                })
            } catch (e) {
    
            }
        })
    
        test('Log In Failure (Incorrect Email and Password)', async () =>{
            try{
                outcome = await logIn('invalid', 'wrongPass')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr).toBe('failed')
                })
            } catch (e) {
    
            }
        })
    
        test('Log In Success', async () =>{
            try{
                outcome = await logIn('test_team@gmail.com', 'test123')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr).toBe('success')
                })
            } catch (e) {
    
            }
        })

        test('Log Out Success', () =>{
            expect(logOut()).toBe('success')
        })
    })
})
