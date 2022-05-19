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
            let prod = await getProduct('failure');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe("failed");
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
	
	
    describe('Get Address IDs with user email tests', () =>{      
		test('Get Address IDs with valid user email', () => {
            let output = getAddressesIDs('duran.reddy@gmail.com')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })			
		test('Get Address IDs with invalid user email', () => {
            let output = getAddressesIDs('invalid user email')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })
    })		
	
    describe('Get Address with Address ID tests', () =>{
        test('Get Address with valid Address ID', () => {
            let output = getCategories('BzZe6SwluM9xQbuwztAR')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("success");
            })
        })	
        test('Get Address with invalid Address ID', () => {
            let output = getCategories('invalid address id')
            Promise.resolve(output).then((arr)=>{
                expect(arr[0]).toBe("failed");
            })
        })		
    })	
	
})