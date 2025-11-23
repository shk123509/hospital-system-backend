import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createAppointment, UpdateAppointment,getslefbydoctor, CancelAppointment,UpdateStatus,getselfbypatientid, getAppointment,deleteAppointment,  getAppointmentPatientId, getApointmentDoctorId, availabilityofAppointment } from "../controllers/appoinment.controllers.js";

const router = Router();
router.use(verifyJWT);

router.route("/create").post(createAppointment);


router.route("/updateStatus/:appointmentId").patch(UpdateStatus);

router.route("/getAppointment/:appointmentId").get(getAppointment)

router.route("/Updates/:appointmentId").post(UpdateAppointment)

router.route("/getappointmentbyPatientId/:patientID").get(getAppointmentPatientId)

router.route("/getappointmentbyDoctorID/:doctorId").get(getApointmentDoctorId)

router.route("/checkAvaliable").post(availabilityofAppointment)

router.route("/deletebyid/:appointmentId").delete(deleteAppointment)

router.route("/fetchedrequired/:appointmentId").get(getselfbypatientid)

router.route("/fetchedselfdoctor/:appointmentId").get(getslefbydoctor)

router.route("/cancel/:appointmentId").get(CancelAppointment)


export default router;