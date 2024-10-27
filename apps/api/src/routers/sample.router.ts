import { getSample } from "@/controllers/sample.controller";
import { Router } from "express";
const sampleRouter = Router()

sampleRouter.get('/', getSample)

export default sampleRouter