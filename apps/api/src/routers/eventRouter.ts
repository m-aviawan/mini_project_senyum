import { createEvent, getEventDetail, getEvents, updateEvent } from "@/controllers/eventController";
import { roleValidation } from "@/middlewares/roleValidation";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { uploader } from "@/middlewares/uploader";
import { Router } from "express";
const eventRouter = Router()

// eventRouter.post('/', tokenValidation, roleValidation, createEvent )
eventRouter.put('/:eventId', tokenValidation, roleValidation, updateEvent)
eventRouter.get('/:eventId', getEventDetail)
eventRouter.get('/', getEvents)
eventRouter.post('/', tokenValidation, uploader, createEvent)

export default eventRouter