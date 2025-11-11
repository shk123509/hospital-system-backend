import dotenv from "dotenv"
dotenv.config({
    path : "./.env"
})

import { app } from "./app.js"
import connectDB from "./db/index.js"

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`🚀 Server ready at →  http://localhost:${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("The erro is : ", err);
})