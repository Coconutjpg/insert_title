import{
    getProduct,getProductsWithSorting_Limits_Category,getProductsByCategory, getCategories,
    signUp, logOut, logIn,
    getCredits,addCredits,
    clicked,
    getRatingsWithSorting_Limits,createRating,
    addToCart,getCart,emptyCart,
    createOrder,getOrders,getProductsInCartForOrder
} from './database_functions.js';

describe('Get Snapshot Requests', () =>{
    describe('Get Products', () =>{
        const successfulProds = [];
        const failedProds = [];

        const expectedProdInfo = {
            "id": 'FR7sF3vF6NiH6xuItNrs',
            "brand": 'Samsung',
            "cost": 34629,
            "description": 'All-encompassing 1000R display with 32:9 aspect ratio 240Hz refresh rate with low input lag QLED technology for a more realistic gaming experience The curve revolution 1000R, the new apex of curved screen technology, matches the contours of the human eye for unimaginable realism. Game-changing 1000R Vivid scenes wrap even more tightly around you. Experience the next level of heart-pounding gaming that\'s superior to anything you\'ve seen before. The 1000R 49-inch super ultra-wide display fills your peripheral vision and draws you into the character\'s shoes. Purer. Brighter. QLED. Superior picture execution. A new level of vibrant resolution is achieved by QLED\'s bright and realistic shades and hues. Enjoy awe-inspiring game scenes with accuracy in every last detail. HDR1000 and HDR10+ Imagery even closer to reality. HDR1000 darkens darks and brightens whites for more dimensional contrast. HDR10+ optimizes brightness and contrast so game scenes look exactly how the developer intended. Visuals look out of this world and just like true life, all at the same time. Dual QHD display The gaming world of your imagination made real. The 49-inch DQHD resolution brings you a display as wide as two QHD monitors sitting side by side, with incredibly detailed, pin-sharp images. Experience a more encompassing view with maximum space to take in all the action. Infinity core lighting design Color the mood. The Infinity Core Lighting Design adds style and radiates a captivating glow in 5 different modes. Let the default ice blue color shine, or change it to your favorite hue with a simple RGB code. Low input lag.- Rapid reflexes. Seize winning control. The incredibly-low 2ms input lag brings never-before-experienced response accuracy to catch notoriously-agile enemies. It\'s so fast, that action begins instantly when you turn on the screen, with virtually no delay between your peripherals and the game. Display Specs Screen Size (Inch) - 49" Screen Size (Class) - 49 Flat / Curved - Curved Active Display Size (HxV) (mm) - 1191.936 x 335.232mm Screen Curvature - 1000R Aspect Ratio - 32:9 Panel Type - VA Brightness (Typical) - 420cd/m2 Peak Brightness (Typical) - 1000cd/m2 Brightness (Min) - 300cd/m2 Contrast Ratio Static - 2500:1(Typ) Dynamic Contrast Ratio - Mega DCR HDR(High Dynamic Range) - Yes Resolution - 5120X1440 Response Time - 1(GTG) ms Viewing Angle (H/V) - 178°(H)/178°(V) Color Support - Max 1.07B Color Gamut (NTSC 1976) - 88%(Typ.) Color Gamut (DCI Coverage) - 0.95 sRGB Coverage - 125%(Typ.) Adobe RGB Coverage - 92%(Typ.) Refresh Rate -Max 240Hz',
            "name": '49" Odyssey G9 Dual-QHD 240Hz Gaming Monitor With 1000R Curved Screen',
            "image_link": ['https://firebasestorage.googleapis.com/v0/b/give-a-little-7976d.appspot.com/o/Images%2FMonitors%2FMonitor-3%2FMonitor-3-Front.jpg?alt=media&token=f0051ac7-28ec-43a0-8967-bd4d02b5124e',
                            'https://firebasestorage.googleapis.com/v0/b/give-a-little-7976d.appspot.com/o/Images%2FMonitors%2FMonitor-3%2FMonitor-3-Front-Rotated.jpg?alt=media&token=e7528676-7ea5-4bb3-a7db-02cdd0125fe1',
                            'https://firebasestorage.googleapis.com/v0/b/give-a-little-7976d.appspot.com/o/Images%2FMonitors%2FMonitor-3%2FMonitor-3-Back.jpg?alt=media&token=096f4f3d-3e3b-4b90-9a13-e03160652962',
                            'https://firebasestorage.googleapis.com/v0/b/give-a-little-7976d.appspot.com/o/Images%2FMonitors%2FMonitor-3%2FMonitor-3-Top.jpg?alt=media&token=34d01d7d-2052-4687-80f2-8addd5b99a1e'],
            "quantity": 25,
            "rating": 5,
            "ratings_ids": ['5,xfbxnfWD75hnZ1EUPZqV', '5,4dJ0qRir8iOUrNIVOlAn', '5,ajnjdYr38rUa5V3rAtTo']
        }

        successfulProds.push("success");
        successfulProds.push(expectedProdInfo);
        failedProds.push("failed");

        test('Single Product Failure', () => {
            let prod = getProduct('FR7sF3vF6NiH5xuItNys');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe(failedProds);
            })
        })

        test('Single Product Success', () => {
            let prod = getProduct('FR7sF3vF6NiH6xuItNrs');
            Promise.resolve(prod).then((arr)=>{
                expect(arr).toBe(successfulProds);
            })
        })
    })
})