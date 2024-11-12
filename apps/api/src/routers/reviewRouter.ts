import { createReview, deleteReview, getReviewsByEvent, getReviewsByUser, updateReview } from "@/controllers/reviewController";
import { tokenValidation } from "@/middlewares/tokenValidation";
import { Router } from "express";
const reviewRouter = Router()

reviewRouter.get('/:eventId', getReviewsByEvent)
reviewRouter.get('/user', getReviewsByUser)
reviewRouter.post('/', tokenValidation, createReview)
reviewRouter.put('/', tokenValidation, updateReview)
reviewRouter.delete('/', tokenValidation, deleteReview)

export default reviewRouter