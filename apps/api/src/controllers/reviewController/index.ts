import { NextFunction, Response, Request } from "express"
import prisma from "@/connection/prisma"

export const createReview = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { comments = null, rating, feedback = null, id, eventId } = req.body
        if( !id || !eventId ) throw { msg: 'Missing ID', status: 406 }
        if(!rating) throw { msg: 'Rating must included!', status: 406 }
    
        const newReview = await prisma.review.create({
            data: {
                comments,
                feedback,
                rating: Number(rating),
                eventId,
                userId: id
            },
            include: {
                users: true,
                events: true
            }
        })
    
        res.status(201).json({
            error: false,
            message: 'Create Review Success',
            data: {
                rating,
                comments,
                feedback,
                username: newReview.users.username,
                eventName: newReview.events.name,
                createdAt: newReview.createdAt
            }
        })
    } catch (error) {
        next(error)
    }
}

export const updateReview = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { comments = null, rating = null, feedback, id, eventId } = req.body
        
        if(!eventId || !id) throw { msg: 'Missing ID' }
        if(!rating) throw { msg: 'Rating must included!', status: 406 }
    
        const updateReview = await prisma.review.update({
            where: {
                userId_eventId: {
                    userId: id,
                    eventId
                }
            },
            data: {
                comments,
                feedback,
                rating
            },
            include: {
                users: true,
                events: true
            }
        })
    
        res.status(200).json({
            error: false,
            message: 'Update Review Success',
            data: {
                rating,
                comments,
                feedback,
                username: updateReview.users.username,
                eventNames: updateReview.events.name,
                updatedAt: updateReview.updatedAt
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getReviewsByEvent = async(req: Request, res: Response, next: NextFunction) => {{
    try {
        const { eventId } = req.params
    
        if(!eventId) throw { msg: 'Missing ID', status: 406 }
    
        const getReviews = await prisma.review.findMany({
            where: {
                eventId
            }, 
            include: {
                users: true,
                events: true
            }
        })
    
        if(getReviews.length <= 0) throw { msg: 'Review not found!', status: 404 }
    
        res.status(200).json({
            error: false,
            message: 'Get review by event success',
            data: getReviews
        })
    } catch (error) {
        next(error)
    }
}}

export const getReviewsByUser = async(req: Request, res: Response, next: NextFunction) => {{
    try {
        const { id } = req.body
    
        if(!id) throw { msg: 'Missing ID', status: 406 }
    
        const getReviews = await prisma.review.findMany({
            where: {
                userId: id
            },
            include: {
                users: true
            }
        })
    
        if(getReviews?.length <= 0) throw { msg: 'Review not found!', status: 404 }
    
        res.status(200).json({
            error: false,
            message: 'Get review by user success',
            data: getReviews
        })
    } catch (error) {
        next(error)
    }
}}

export const deleteReview = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, eventId } = req.body
    
        if(!id || !eventId) throw { msg: 'Missing ID', status: 406 }
    
        await prisma.review.delete({
            where: {
                userId_eventId: {
                    userId: id,
                    eventId
                }
            }
        })
    
        res.status(200).json({
            error: false,
            message: 'Delete Review Success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}
/*
  model Review {
  comments String?
  rating   Int
  feedback String?

  userId  String
  users   User   @relation(fields: [userId], references: [id])
  eventId String
  events  Event  @relation(fields: [eventId], references: [id])

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime?

  @@id([userId, eventId])
  @@map("reviews")    
*/