import { Router } from "express";
import sampleRouter from "./sample.router";
const router = Router()

router.use('/sample', sampleRouter)

export default router