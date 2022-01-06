"use strict"
import{Application, Router} from "https://deno.land/x/oak@v6.3.2/mod.ts";
const router = new Router();

router.get("/", (context)=> {
    context.reponse.body = "Hompage";
});