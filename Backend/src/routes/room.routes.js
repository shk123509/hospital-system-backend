import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {createRoom, UpdateRoom, deleteRoom, fetchedRoom, checkbedavailable, fetchedAllRooms, fetchedbyfilter} from "../controllers/room.controllers.js"

const router = Router();
router.use(verifyJWT);

router.route("/create").post(createRoom)

router.route("/updateDetails/:roomId").patch(UpdateRoom)

router.route("deleteroom/:roomId").delete(deleteRoom)

router.route("/fetchedroom/:roomId").get(fetchedRoom)

router.route("/checkava/:roomId").get(checkbedavailable)

router.route("/fetchedall").get(fetchedAllRooms)

router.route("/typesroom/:roombytype").get(fetchedbyfilter)
export default router