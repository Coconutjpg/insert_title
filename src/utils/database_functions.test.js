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


describe('Get Snapshot Requests', () =>{
    describe('Get Products', () =>{
        const successfulProds = [];
        const failedProds = [];
        const products = getProducts();
        successfulProds.push("success");
        successfulProds.push(products[0]);
        const monitors = getProductsByCategory('Monitors')
        const categories = getCategories()
        const credits = getCredits('duran.reddy@gmail.com')
        failedProds.push("failed");

        test('Single Product Failure (Incorrect ID)', async () => {
            let prod = await getProduct('1naR0WwJu2JptB');
            Promise.resolve(prod).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })			
        })

        test('Single Product Success', async () => {
            let prod = await getProduct('1naR0WwJu2JptBUPskhI');
            Promise.resolve(prod).then((arr)=>{
                expect(arr[0]).toBe("success");
            })				
        })

        test('Product Filtering Failure', () => {
            let prod = getProductsWithSorting_Limits_Category('TVs', 'prod_cats' ,'asc', 0, 1);
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe([]);
            })
        })

        test('Product Filtering Success', () => {
            let prod = getProductsWithSorting_Limits_Category('Monitors', 'prod_cats', 'asc', 0, 1);
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe(Monitors[0]);
            })
        })

        test('Invalid Category' , () => {
            let prod = getProductsByCategory('TVs');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe([]);
            })
        })

        test('Successful Fetch' , () => {
            let prod = getProductsByCategory('Monitors');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe(monitors);
            })
        })

        test('All Products', () => {
            let prods = getProducts()
            Promise.resolve(prods).then((arr)=>{
                expect(arr).toBe(products);
            })
        })
    })

    describe('Get Categories', () =>{
        test('All Categories', () => {
            let cats = getCategories()
            Promise.resolve(cats).then((arr)=>{
                expect(arr).toBe(categories);
            })
        })
    })

    describe('Get Credits', () =>{
        test('Incorrect User', () => {
            let creds = getCredits('wrongy@gmail.com')
            Promise.resolve(creds).then((arr)=>{
                expect(arr).toBe(-1);
            })
        })

        test('Correct User', () => {
            let creds = getCredits('duran.reddy@gmail.com')
            Promise.resolve(creds).then((arr)=>{
                expect(arr).toBe(credits);
            })
        })
    })
	
   //getRatingsWithSorting_Limits does not yet return a true/false if successful
   /* describe('Get Ratings for Product given product ID,sorting order,starting value,max number to return tests', () =>{      	
		test('invalid product ID given', () => {
            let output = getRatingsWithSorting_Limits(product_id,sorting_direction,starting_value,limit_num)
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })			
		test('valid product ID given', () => {
            let output = getRatingsWithSorting_Limits(product_id,sorting_direction,starting_value,limit_num)
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })
		test('valid product ID given and starting value excluded', () => {
            let output = getRatingsWithSorting_Limits(product_id,sorting_direction,starting_value,limit_num)
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })
		test('valid product ID given and invalid starting value given', () => {
            let output = getRatingsWithSorting_Limits(product_id,sorting_direction,starting_value,limit_num)
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failure");
            })
        })		
    })	*/	
	
    describe("Get a user's cart given their email tests", () =>{      	
		test('Valid user email', () => {
            let output = getOrdersIDs('duran.reddy@gmail.com')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })			
		test('Invalid user email', () => {
            let output = getOrdersIDs('invalid user email')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })			
    })		
	
    describe('Get Order IDs for a user tests given user email', () =>{      	
		test('Valid user email', () => {
            let output = getOrdersIDs('duran.reddy@gmail.com')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })			
		test('Invalid user email', () => {
            let output = getOrdersIDs('invalid user email')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })			
    })		
	
    describe('Get Order details tests given order ID', () =>{      	
		test('Valid order ID', () => {
            let output = getOrder('HLUAYpCCdZGa5VjdFbRk')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })			
		test('Invalid order ID', () => {
            let output = getOrder('invalid order ID')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })			
    })		
	
    describe('Update Order status for an Order tests given order ID and status', () =>{      	
		test('Valid order ID', () => {
            let output = updateOrderStatus('HLUAYpCCdZGa5VjdFbRk','Packing')
            Promise.resolve(output).then((arr)=>{
                expect(arr).toBe("success");
            })
        })			
		test('Invalid order ID', () => {
            let output = updateOrderStatus('invalid order ID','testing')
            Promise.resolve(output).then((arr)=>{
                expect(arr).toBe("failed");
            })
        })			
    })		
	
    describe('Get Address IDs given user email tests', () =>{      
		test('Valid user email', () => {
            let output = getAddressesIDs('duran.reddy@gmail.com')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })			
		test('Invalid user email', () => {
            let output = getAddressesIDs('invalid user email')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })
    })		
	
    describe('Get Address given Address ID tests', () =>{
        test('Valid Address ID', () => {
            let output = getCategories('BzZe6SwluM9xQbuwztAR')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })	
        test('Invalid Address ID', () => {
            let output = getCategories('invalid address id')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })		
    })	
	
})