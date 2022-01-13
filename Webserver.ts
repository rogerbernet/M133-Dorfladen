"use strict"
import { Application , Router} from "./deps.ts"
import {renderFileToString} from "./deps.ts"
const items = JSON.parse(Deno.readTextFileSync(Deno.cwd()+"/assets/products.json"));
const router = new Router()


router.get("/", async (context) => {
    try {

        console.log("\nHome.True")
        context.response.body = await renderFileToString(Deno.cwd() + "/views/home.ejs", {items: items})
        context.response.type = "html";         
    } 
    catch (error) 
    {
        console.log(error)
    }
})
router.post("/product", async (context) =>{
    try{
    const body = await context.request.body().value
    const productId = body.get("productId")
    console.log(productId)
    context.response.body = await renderFileToString(Deno.cwd() + "/views/product.ejs", {itemId: productId, items: items})
    context.response.type = "html"
    }
    catch (error)
    {
        console.log(error)
    }
})

router.post("/enterCustomerInfo", async (context) =>{
    try{
    const body = await context.request.body().value

    context.response.body = await renderFileToString(Deno.cwd() + "/views/customerInfo.ejs", { })
    context.response.type = "html"
    }
    catch (error)
    {
        console.log(error)
    }
})

router.post("/terminateOrder", async (context) =>{
    try{
    const body = await context.request.body().value;
    const fullname = body.get("customerName");
    const email = body.get("email");
    const street = body.get("street");
    const adress = body.get("adress");


    context.response.body = await renderFileToString(Deno.cwd() + "/views/terminateOrder.ejs", {fullname: fullname, email: email, street: street, adress: adress})
    context.response.type = "html"
    }
    catch (error)
    {
        console.log(error)
    }
})


const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 8000 })