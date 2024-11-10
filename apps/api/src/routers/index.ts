import { Router } from "express";
import sampleRouter from "./sampleRouter";
import authRouter from "./authRouter";
const router = Router()

router.use('/auth', authRouter)

export default router