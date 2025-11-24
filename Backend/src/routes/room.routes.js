import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {createRoom, UpdateRoom} from "../controllers/room.controllers.js"

const router = Router();
router.use(verifyJWT);

router.route("/create").post(createRoom)

router.route("/updateDetails/:roomId").patch(UpdateRoom)


export default router