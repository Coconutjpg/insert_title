/**
 * @jest-environment node
 */
 import{
    getProduct,getProducts,getProductsWithSorting_Limits_Category,getProductsByCategory, getCategories,
    signUp, logOut, logIn, getUserDetails, getOrderedProducts,userWithProductsJSON, updateUserDetails,
    getCredits,addCredits,
    clicked, getClicks,
    getRatingsWithSorting_Limits,createRating,
    addToCart,getCart,emptyCart,updateQuantity,
    createOrder,getOrdersIDs,getOrder,updateOrderStatus,getProductsInCartForOrder,
    addAddress,getAddressesIDs,getAddress
} from './database_functions.js';


describe('Database Tests', () =>{
    describe('Get Products', () =>{
        test('Single Product Failure (Incorrect ID)', async () => {
            try{
                let prod = await getProduct('invalid');
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
                let prod = await getProductsWithSorting_Limits_Category('Monitors', 'prod_cost' ,'asc', -1, 1);
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('failed');
                })
            } catch (e) {

            }
        })

        test('Product Filtering Success - Category ==  null', async () => {
            try{
                let prod = await getProductsWithSorting_Limits_Category('Monitors', 'prod_cost' ,'asc', null, 1);
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('success');
                })
            } catch (e) {

            }
        })

        test('Product Filtering Success - Category ==  null', async () => {
            try{
                let prod = await getProductsWithSorting_Limits_Category(null, 'prod_cost' ,'asc', 0, 1);
                Promise.resolve(prod).then((arr)=>{
                    expect(arr[0]).toBe('success');
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

        test('Get Ordered Products Fail - Invalid Email', async () => {
            let prods = await getOrderedProducts('invalid@gmail.com');
            Promise.resolve(prods).then((arr)=>{
                expect(arr[0]).toBe('failed');
            })
        })

        test('Get Ordered Products Success', async () => {
            let prods = await getOrderedProducts('readingtests@gmail.com');
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

    describe('Credit Tests', () =>{
        test('Incorrect User', async () => {
            try{
                let creds = await getCredits('invalid')
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe(-1);
                })
            } catch (e) {

            }
        })

        test('Correct User', async () => {
            try{
                let creds = await getCredits('readingtests@gmail.com')
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe(100000);
                })
            } catch (e) {

            }
        })

        test('Incorrect User', async () => {
            try{
                let creds = await addCredits('invalid@gmail.com', 10)
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe('failed');
                })
            } catch (e) {

            }
        })

        test('Invalid Amount', async () => {
            try{
                let creds = await addCredits('writingtests@gmail.com', -10)
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe('success');
                })
            } catch (e) {

            }
        })

        test('Successful Transaction', async () => {
            try{
                let creds = await addCredits('writingtests@gmail.com', 100)
                Promise.resolve(creds).then((arr)=>{
                    expect(arr).toBe('success');
                })
            } catch (e) {

            }
        })
    })
	
    describe("Get a user's cart given their email tests", () =>{      	
		test('Valid user email', async () => {
            try{
                let output = await getOrdersIDs('readingtests@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {

            }
        })	
        		
		test('Invalid user email', async () => {
            try{
                let output = await getOrdersIDs('invalid')
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
                let output = await getOrder('invalid')
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

        test('Size = null', async() =>{
            try{
                let ratings = await getRatingsWithSorting_Limits("1naR0WwJu2JptBUPskhI", 'asc', 1, null);
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
                let output = await updateOrderStatus('invalid','testing')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("failed");
                })
            } catch (e) {

            }
        })			
    })	
    
    describe('Cart Tests', () =>{
        test('Get Cart Failure - Incorrect Email', async () =>{
            try{
                let output = await getCart('invalid@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                })
            } catch (e) {

            }
        })

        test('Get Cart Success', async () =>{
            try{
                let output = await getCart('readingtests@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {

            }
        })

        test('Get Cart for Orders - Invalid Email', async () =>{
            try{
                let output = await getProductsInCartForOrder('invalid@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("failed");
                })
            } catch (e) {

            }
        })

        test('Get Cart for Orders Success', async () =>{
            try{
                let output = await getProductsInCartForOrder('readingtests@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {
l
            }
        })

        test('Empty Cart Failure - Incorrect Email', async () =>{
            try{
                let output = await emptyCart('invalid@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("failed");
                })
            } catch (e) {

            }
        })

        test('Empty Cart Success', async () =>{
            try{
                let output = await emptyCart('writingtests@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("success");
                })
            } catch (e) {

            }
        })
        
        test('Add to Cart Failure - Incorrect Email', async () =>{
            try{
                let output = await addToCart('invalid@gmail.com', '3hfR35gmOpKLGDNLDC1H')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("failed");
                })
            } catch (e) {

            }
        })

        test('Add to Cart Failure - Incorrect Product ID', async () =>{
            try{
                let output = await addToCart('writingtests@gmail.com', 'invalid')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("success");
                })
            } catch (e) {

            }
        })

        test('Add to Cart Success', async () =>{
            try{
                let output = await addToCart('writingtests@gmail.com', 'H8R4BPeNdECUUZU7BV9H')
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe("success");
                })
            } catch (e) {

            }
        })

        test('Update Cart - Invalid Email', async () =>{
            try{
                let output = await updateQuantity('invalid@gmail.com', 'CLm2l46UBoZPnnnVEyR7', 10)
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe(undefined);
                })
            } catch (e) {

            }
        })

        test('Update Cart - Invalid Product ID', async () =>{
            try{
                let output = await updateQuantity('writingtests@gmail.com', 'invalid', 10)
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe(undefined);
                })
            } catch (e) {

            }
        })

        test('Update Cart - Invalid Quantity', async () =>{
            try{
                let output = await updateQuantity('writingtests@gmail.com', 'H8R4BPeNdECUUZU7BV9H', -10)
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe(undefined);
                })
            } catch (e) {

            }
        })

        test('Update Cart - Success', async () =>{
            try{
                let output = await updateQuantity('writingtests@gmail.com', 'CLm2l46UBoZPnnnVEyR7', 10)
                Promise.resolve(output).then((arr)=>{
                    expect(arr).toBe(undefined);
                })
            } catch (e) {

            }
        })

    })
	
    describe('Get Address IDs given user email tests', () =>{      
		test('Valid user email', async () => {
            try{
                let output = await getAddressesIDs('readingtests@gmail.com')
                Promise.resolve(output).then((arr)=>{
                    expect(arr[0]).toBe("success");
                })
            } catch (e) {

            }
        })	

		test('Invalid user email', async () => {
            try{
                let output = await getAddressesIDs('invalid@gmail.com')
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
                outcome = await logIn('invalid', 'reading123')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr).toBe('failed')
                })
            } catch (e) {
    
            }
        })
    
        test('Log In Failure (Incorrect Password)', async () =>{
            try{
                outcome = await logIn('readingtests@gmail.com', 'wrongPass')
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
                outcome = await logIn('readingtests@gmail.com', 'reading123')
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

    describe('Clicks Tests', () =>{
        test('Get Clicks Failed - Incorrect Email', async() =>{
            try{
                outcome = await getClicks('invalid@gmail.com')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe('failed')
                })
            } catch (e) {
    
            }
        })

        test('Get Clicks Success', async() =>{
            try{
                outcome = await getClicks('readingtests@gmail.com')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe('success')
                })
            } catch (e) {
    
            }
        })

        test('Add Clicks Success', async() =>{
            try{
                outcome = await clicked('writingtests@gmail.com', '1naR0WwJu2JptBUPskhI')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe(undefined)
                })
            } catch (e) {
    
            }
        })

        test('Add Clicks - Invalid Email', async() =>{
            try{
                outcome = await clicked('invalid@gmail.com', '1naR0WwJu2JptBUPskhI')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe(undefined)
                })
            } catch (e) {
    
            }
        })

        test('Add Clicks -Invalid Product ID', async() =>{
            try{
                outcome = await clicked('writingtests@gmail.com', 'invalid')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe(undefined)
                })
            } catch (e) {
    
            }
        })
    })

    describe('Get Address Tests', () =>{
        test('Get Address Failed - Incorrect ID', async() =>{
            try{
                outcome = await getAddress('invalid')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe('failed')
                })
            } catch (e) {
    
            }
        })

        test('Get Clicks Success', async() =>{
            try{
                outcome = await getAddress('TestAddress')
                Promise.resolve(outcome).then((arr)=>{
                    expect(arr[0]).toBe('success')
                })
            } catch (e) {
    
            }
        })
    })

    describe('Add to JSONArray Tests', () =>{
        test('Correct Append',() =>{
            const TestJSON = {'age': 22, "name": 'Tester'}
            const arr = []
            const outputJSON = {'age': 22, "name": 'Tester', "products_purchased": []}
            expect(userWithProductsJSON(TestJSON, arr)).toStrictEqual(outputJSON)
        })
    })

    describe('User Details Tests', () =>{
        test('Get User Details Failed - Incorrect Email', async() =>{
            try{
                details = await getUserDetails('invalid@gmail.com')
                Promise.resolve(details).then((arr)=>{
                    expect(arr[0]).toBe('failed')
                })
            } catch (e) {
    
            }
        })

        test('Get User Details Success', async() =>{
            try{
                details = await getUserDetails('readingtests@gmail.com')
                Promise.resolve(details).then((arr)=>{
                    expect(arr[0]).toBe('success')
                })
            } catch (e) {
    
            }
        })

        test('Update User Details Failed - Incorrect Email', async() =>{
            try{
                const detailsJSON = {DoB: null, email: null, first_name: null, last_name: null ,password: null , phoneNumber: null};
                let details = await updateUserDetails('invalid@gmail.com', detailsJSON)
                Promise.resolve(details).then((arr)=>{
                    expect(arr[0]).toBe('failed')
                })
            } catch (e) {
    
            }
        })

        
        test('Update User Details Success (Case 1 - Everything null)', async() =>{
            try{
                const detailsJSON = {DoB: null, email: null, first_name: null, last_name: null ,password: null , phoneNumber: null};
                let details = await updateUserDetails('writingtests@gmail.com', detailsJSON)
                Promise.resolve(details).then((arr)=>{
                    expect(arr[0]).toBe('failed')
                })
            } catch (e) {
    
            }
        })

        test('Update User Details Success (Case 2 - Some Aspects null)', async() =>{
            try{
                const detailsJSON = {DoB: "2002-09-10", email: null, first_name: null, last_name: null ,password: "writing123" , phoneNumber: null};
                let details = await updateUserDetails('writingtests@gmail.com', detailsJSON)
                Promise.resolve(details).then((arr)=>{
                    expect(arr[0]).toBe('success')
                })
            } catch (e) {
    
            }
        })

        test('Update User Details Success (Case 3 - Nothing null)', async() =>{
            try{
                const detailsJSON = {DoB: "2002-09-10", email: "writingtests@gmail.com", first_name: "Writes", last_name : "Tester" ,password: "writing123" , phoneNumber: "0694209000"};
                let details = await updateUserDetails('writingtests@gmail.com', detailsJSON)
                Promise.resolve(details).then((arr)=>{
                    expect(arr[0]).toBe('failed')
                })
            } catch (e) {
    
            }
        })
    })
})
