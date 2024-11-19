import { dashboardController } from "@/controllers/dashboardController";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { Router } from "express";
const dashboardRouter = Router()

dashboardRouter.get('/', tokenValidation, dashboardController)

export default dashboardRouter