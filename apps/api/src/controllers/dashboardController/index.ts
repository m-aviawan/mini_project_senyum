import { NextFunction, Request, Response } from "express";
import prisma from "@/connection/prisma";

export const dashboardController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body
        const { 
            year, 
            revenuePeriod, 
            eventsCreatedPeriod, 
            customerTransactionsPeriod, 
            transactionsPeriod ,
            performance
        } = req.query
        //period => week, month, year
        //performance untuk grafik performa yoy

        const getEventOrganizer = await prisma.eventOrganizer.findUnique({
            where: {
                id
            },
            include: {
                events: true,
            }
        })
        
        const eventsId = getEventOrganizer?.events.map((item) => {
            return item.id
        })

        const getEventsTicket = await prisma.eventTicket.findMany({
            where: {
                eventId: { in: eventsId}
            }
        })
    
        const ticketsId = getEventsTicket.map(item => {
            return item.id
        })
    
        const getTransactionsDetail = await prisma.transactionDetail.findMany({
            where: {
                ticketId: {
                    in: ticketsId
                }
            }
        })

        const latestCreatedEvents = await prisma.event.findMany({
            take: 3,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                tickets: true,
            }
        })

        const topThreeEventsRevenue = await prisma.event.findMany({
            take: 3
        })

        res.status(200).json({
            error: false,
            message: 'Get data dashboard success',
            data: {
                getEventsTicket,
                getTransactionsDetail,
                latestCreatedEvents
            }
        })
    }   
     catch (error) {
        next(error)
    }
}   