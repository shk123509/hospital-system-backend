import { createDoctor, updateProfile, deleteDoctor, getdoctorByUserId, getDoctor, checkAvailable} from "../controllers/doctor.controllers.js"
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"


const router = Router()

router.route("/createDoctor").post(verifyJWT, createDoctor)

router.route("/updateProfiles/:doctorId").patch(verifyJWT, updateProfile)

router.route("/deleteDoctor/:doctorId").delete(verifyJWT, deleteDoctor)

router.route("/getdoctor/:userId").get(verifyJWT, getdoctorByUserId)

router.route("/getdoctors/:doctorId").get(verifyJWT, getDoctor)

router.route("/ckeckdoctor/:doctorId").get(verifyJWT, checkAvailable)


export default router