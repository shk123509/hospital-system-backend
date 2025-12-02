import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {createdBilling, updateBilling, UpdatesStatus, deleteBilling, getByStatsu, getbybillingid} from "../controllers/billing.controllers.js"



const router = Router();
router.use(verifyJWT);

router.route("/created").post(createdBilling)

router.route("/Updates/:billingId").patch(updateBilling)

router.route("/UpdatesStatus/:billingId").patch(UpdatesStatus)

router.route("/delete/:billingId").delete(deleteBilling)

router.route("/getbystatsu").post(getByStatsu)

router.route("/getbubillingid/:billingId").get(getbybillingid)


export default router