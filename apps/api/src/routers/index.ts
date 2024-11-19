import { Router } from "express";
import sampleRouter from "./sampleRouter";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import transactionRouter from "./transactionRouter";
import eventOrganizerRouter from "./eventOrganizerRouter";
import eventRouter from "./eventRouter";
import reviewRouter from "./reviewRouter";
import dashboardRouter from "./dashboardRouter";
const router = Router()

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/transaction', transactionRouter)
router.use('/event-organizer', eventOrganizerRouter)
router.use('/event', eventRouter)
router.use('/review', reviewRouter)
router.use('/dashboard', dashboardRouter)

export default router