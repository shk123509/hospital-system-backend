import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {createAdmission, updateAdmission, deleteAdmission,getAdmission,Updatestatus,getbypatient,getbydoctor,getbyroom,getbyfilter,get_All_Discharged,filter_Admissions} from "../controllers/admission.controllers.js"

 
const router = Router();

router.use(verifyJWT);

router.route("/create").post(createAdmission)

router.route("/updateAdmission/:admissionId").patch(updateAdmission)

router.route("/deleteAdmission/:admissionId").delete(deleteAdmission)

router.route("/getAdmission/:admissionId").get(getAdmission)

router.route("/updateAdmissionStatus/:admissionId").patch(Updatestatus)

router.route("/getAdmissionpatient/:patientId").get(getbypatient)

router.route("/getAdmissiondoctor/:doctorId").get(getbydoctor)

router.route("/getAdmissionroom/:roomId").get(getbyroom)


router.route("/getAdmissionroomfilter").get(getbyfilter)

router.route("/getdis").get(get_All_Discharged)

router.route("/getbyyyy").post(filter_Admissions)

export default router;