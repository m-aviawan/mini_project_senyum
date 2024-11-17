import { getUser, updateProfile } from "@/controllers/userController";
import { roleValidation } from "@/middlewares/roleValidation";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { uploader } from "@/middlewares/uploader";
import { Router } from "express";
const userRouter = Router()

userRouter.get('/', tokenValidation, uploader, getUser)
userRouter.patch('/', tokenValidation, uploader, updateProfile)

export default userRouter