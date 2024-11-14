import { authenticationUser, authWithGoogle, forgotPassword, keepAuth, registerEO, registerUser, resetPassword, verifyRegister } from "@/controllers/authController";
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
authRouter.post('/o-auth', authWithGoogle)
authRouter.post('/forgot-password', forgotPassword)
authRouter.patch('/reset-password/:token', resetPassword)

export default authRouter