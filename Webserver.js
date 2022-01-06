"use strict"
import {Application} from "./deps.js";
import {apiRoutes} from "./backend/fileserver.js";
import {frontendFiles} from ".backend/fileserver.js"

const app = new Application();

app.use(apiRoutes);
app.use(frontendFiles);
app.listen({porst: 8000});