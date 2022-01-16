"use strict"
import { Application, Router } from "./deps.ts"
import { renderFileToString } from "./deps.ts"

const items = JSON.parse(Deno.readTextFileSync(Deno.cwd() + "/assets/products.json"));
const router = new Router()


router.get("/", async (context) => {
    try {

        console.log("\nHome.True")
        context.response.body = await renderFileToString(Deno.cwd() + "/views/home.ejs", { items: items })
        context.response.type = "html"
    }
    catch (error) {
        console.log(error)
    }
})
router.post("/product", async (context) => {
    try {
        const body = await context.request.body().value
        const itemId = body.get("itemId")
        console.log(itemId)
        context.response.body = await renderFileToString(Deno.cwd() + "/views/product.ejs", { itemId: itemId, items: items })
        context.response.type = "html"
    }
    catch (error) {
        console.log(error)
    }
})
router.post("/addToCart", async (context) => {
    try {
        const body = await context.request.body().value;
        let itemId = body.get("itemId")
        let count = body.get("count")
        console.log("CookieId " + itemId)
        context.cookies.set(itemId, count)
        context.response.body = await renderFileToString(Deno.cwd() + "/views/home.ejs", { items: items })
        context.response.type = "html"
    }
    catch (error) {
        console.log(error)
    }
})
router.post("/cart", async (context) => {
    try {

        let itemsInCart = new Map();
        for(let i = 0; i< items.length; i++){
            if(context.cookies.get(String(i))){
                itemsInCart.set(String(i), {itemName: items[i].productName, itemCart: context.cookies.get(String(i)), itemOffer: items[i].specialOffer});
            }
        }
        console.log(itemsInCart)
        context.response.body = await renderFileToString(Deno.cwd() + "/views/cart.ejs", { itemsInCart: itemsInCart })
        context.response.type = "html"
    }
    catch (error) {

    }
})

router.post("/enterCustomerInfo", async (context) => {
    try {
        const body = await context.request.body().value

        context.response.body = await renderFileToString(Deno.cwd() + "/views/customerInfo.ejs", {})
        context.response.type = "html"
    }
    catch (error) {
        console.log(error)
    }
})

router.post("/terminateOrder", async (context) => {
    try {
        const body = await context.request.body().value;
        const fullname = body.get("customerName");
        const email = body.get("email");
        const street = body.get("street");
        const adress = body.get("adress");


        context.response.body = await renderFileToString(Deno.cwd() + "/views/terminateOrder.ejs", { fullname: fullname, email: email, street: street, adress: adress })
        context.response.type = "html"
    }
    catch (error) {
        console.log(error)
    }
})


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })