import { authenticationUser, keepAuth, registerEO, registerUser, verifyRegister } from "@/controllers/authController";
import { registerValidation } from "@/middlewares/registerValidation";
import { roleValidation } from "@/middlewares/roleValidation";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { Router } from "express";
const authRouter = Router()

authRouter.post('/register', registerValidation, registerUser)
authRouter.post('/', authenticationUser)
authRouter.get('/', tokenValidation, keepAuth)
authRouter.patch('/', tokenValidation, verifyRegister)
authRouter.post('/register/event-organizer', registerEO)

export default authRouter