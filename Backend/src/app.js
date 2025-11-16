import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true, limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Import all routes

import userRoutes from "./routes/user.routes.js"
import doctorRoute from "./routes/doctor.routes.js"

app.use("/api/v2/users", userRoutes)
app.use("/api/v2/doctor",doctorRoute)


export {app}  