import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {createdBilling, updateBilling, UpdatesStatus, deleteBilling, getByStatsu, getbybillingid,getbypatientid,getbyadmissionId,getbyfilter,autoCalculate,prevent} from "../controllers/billing.controllers.js"



const router = Router();
router.use(verifyJWT);

router.route("/created").post(createdBilling)

router.route("/Updates/:billingId").patch(updateBilling)

router.route("/UpdatesStatus/:billingId").patch(UpdatesStatus)

router.route("/delete/:billingId").delete(deleteBilling)

router.route("/getbystatsu").post(getByStatsu)

router.route("/getbubillingid/:billingId").get(getbybillingid)

router.route("/getbypatientId/:patientId").get(getbypatientid)

router.route("/getbyadmission/:admissionId").get(getbyadmissionId)

router.route("/getbyfilter").post(getbyfilter)

router.route("/autocalculateAmount").post(autoCalculate)

router.route("/prevent/:billingId").get(prevent)


export default router