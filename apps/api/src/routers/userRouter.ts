import { getUser, updateUser } from "@/controllers/userController";
import { roleValidation } from "@/middlewares/roleValidation";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/', tokenValidation, getUser)
userRouter.patch('/', tokenValidation, updateUser)

export default userRouter