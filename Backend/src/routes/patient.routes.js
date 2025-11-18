import { createPatient,UpdatePatient, deleteProfiles, getPatientByuserId , getPatientByPatientId, Updatestatus, updateReport, getPatientOfQuary} from "../controllers/patient.controllers.js"
import { upload } from "../middleware/cloudinary.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { Router } from "express"

const router = Router()
router.use(verifyJWT);

router.route("/register").post(
    upload.fields([{ name: "report", maxCount: 1 }]),
    createPatient
);

router.route("/updatePatient/:patientId").patch(UpdatePatient)

router.route("/delete/:patientId").delete(deleteProfiles)

router.route("/getPatient/:userId").get(getPatientByuserId)

router.route("/fetchedpatient/:patientId").get(getPatientByPatientId)

router.route("/statusUpdate/:patientId").patch(Updatestatus)

router.route("/updateReport/:patientId").patch(
    upload.single("report"),
    updateReport

)

router.route("/fetchallPatient").get(getPatientOfQuary)







export default router
