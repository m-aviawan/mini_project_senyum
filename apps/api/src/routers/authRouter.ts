import { authenticationUser, keepAuth, registerUser } from "@/controllers/authController";
import { registerValidation } from "@/middlewares/registerValidation";
import { roleValidation } from "@/middlewares/roleValidation";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { Router } from "express";
const authRouter = Router()

authRouter.post('/register', registerValidation, registerUser)
authRouter.post('/', authenticationUser)
authRouter.get('/', tokenValidation, roleValidation, keepAuth)

export default authRouter