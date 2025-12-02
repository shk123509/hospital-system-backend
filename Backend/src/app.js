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
import patientRoute from "./routes/patient.routes.js"
import appointmentRoute from "./routes/appointment.routes.js"
import roomRoutes from "./routes/room.routes.js"
import admissionRoutes from "./routes/admission.routes.js"
import billingRoutes from "./routes/billing.routes.js"

app.use("/api/v2/users", userRoutes)
app.use("/api/v2/doctor",doctorRoute)
app.use("/api/v2/patient", patientRoute)
app.use("/api/v2/appointment", appointmentRoute)
app.use("/api/v2/rooms", roomRoutes)
app.use("/api/v2/admissions", admissionRoutes)
app.use("/api/v2/billings", billingRoutes)


export {app}  