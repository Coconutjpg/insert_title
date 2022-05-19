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

const products = getProducts()
const monitors = getProductsByCategory('Monitors')
const categories = getCategories()

describe('Get Snapshot Requests', () =>{
    describe('Get Products', () =>{
        const successfulProds = [];
        const failedProds = [];

        successfulProds.push("success");
        successfulProds.push(products[0]);
        failedProds.push("failed");

        test('Single Product Failure (Incorrect ID)', () => {
            let prod = getProduct('FR7sF3vF6NiH5xuItNys');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe(failedProds);
            })
        })

        test('Single Product Success', () => {
            let prod = getProduct('1naR0WwJu2JptBUPskhI');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe(successfulProds);
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
})