import { registerUser, loginUser, logoutUser,refreshToken,getCurrentUser,UpdateProfile,PasswordChanged } from "../controllers/user.controllers.js";
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser);
 
router.route("/login").post(loginUser) 

router.route("/logout").post(verifyJWT, logoutUser)

router.route("/refreshToken").post(refreshToken)

router.route("/getuser").get(verifyJWT, getCurrentUser)

router.route("/UpdateProfile").post(verifyJWT, UpdateProfile)

router.route("/UpadtePassword").post(verifyJWT, PasswordChanged)




export default router

