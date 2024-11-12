import { updateProfileEO } from "@/controllers/eventOrganizerController";
import { roleValidation } from "@/middlewares/roleValidation";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { uploader } from "@/middlewares/uploader";
import { Router } from "express";
const eventOrganizerRouter = Router()

eventOrganizerRouter.patch('/', tokenValidation, uploader, roleValidation, updateProfileEO)

export default eventOrganizerRouter