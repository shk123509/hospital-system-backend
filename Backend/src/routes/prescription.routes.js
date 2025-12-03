import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {create,updatePrescription,deletePre,get,getbydoctor,getbypatient,getbyall} from "../controllers/prescription.controllers.js"

const router = Router();

router.use(verifyJWT);

router.route("/create").post(create)
router.route("/updates/:preId").patch(updatePrescription)
router.route("/delete/:preId").delete(deletePre)
router.route("/getby/:preId").get(get)
router.route("/getbydoctor/:doctorId").get(getbydoctor)
router.route("/getbypatient/:patientId").get(getbypatient)
router.route("/getbyall").get(getbyall)
export default router