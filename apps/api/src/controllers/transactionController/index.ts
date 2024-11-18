import { NextFunction, Request, Response } from "express";
import prisma from "@/connection";
import { isAfter } from "date-fns";

export const createTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        // const { tickets, id } = req.body
        const {  id } = req.body
        const tickets = [
            {
                id: 1,
                price: 150_000,
                qty: 2
            },
            {
                id: 2,
                price: 100_000,
                qty: 3
            },
        ]

        if(!tickets.length) throw { msg: 'Ticket transactions data is missing', status: 406 }
        
        const totalPriceArr = tickets.map((item: any) => item.qty * item.price)
        const totalPrice = totalPriceArr.reduce((acc: number, curr: number) => acc + curr)

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                referralPoints: true,
                referralDiscounts: true
            }
        })
        const limit = totalPrice / 10000 
        const limitDecimal = ((limit * 10) % 10) / 10

        if(user?.referralPoints?.length! > 0) {
            let points = await prisma.referralPoint.findMany({
                where: { 
                    userId: id,
                },
            })
    
            let pointsFiltered = points.filter((item: any) => {
                return (isAfter(new Date(), new Date(item.expiry)) && item.point > 0)
            })  
    
            const slicedPointsFiltered = pointsFiltered.slice(0, Math.ceil(limit))
            const idPointsArr = slicedPointsFiltered.map((item) => item.id)
            const lastIdPoints = idPointsArr[idPointsArr.length - 1]
            const firstIdPoints = idPointsArr.slice(0, idPointsArr.length - 1)
            await prisma.referralPoint.updateMany({
                where: {
                    id: { in : [...idPointsArr] }
                },
                data: {
                    point: 0
                }
            })
    
            const lastPoint = await prisma.referralPoint.findUnique({
                where: {
                    id: lastIdPoints
                }
            })
    
            await prisma.referralPoint.update({
                where: {
                    id: lastIdPoints
                },
                data: {
                    point: lastPoint!.point - ( limitDecimal * 10000 )
                }
            })
        }



        // const createdTransaction = await prisma.transaction.create({
        //     data: { 
        //         userId: id,
        //         totalPrice
        //     }
        // })
    
        // const createDataTransactionDetails = tickets.map((item: any) => {
        //     return { 
        //         ticketId: item.ticketId,
        //         price: item.price,
        //         qty: item.qty,
        //         transactionId: createdTransaction.id
        //     }
        // })
        
        // await prisma.transactionDetail.createMany({
        //     data: createDataTransactionDetails
        // })
        
        // tickets.map(async(item: any) => {
        //     const ticket = await prisma.eventTicket.findUnique({
        //         where: { id: item.ticketId }
        //     })
        //     await prisma.eventTicket.update({
        //         where: { id: item.ticketId },
        //         data: {
        //             available: ticket!.available - item.qty,
        //             bookSeat: ticket!.bookSeat + item.qty
        //         }
        //     })

        // })


        res.status(201).json({
            error: false,
            message: 'Create transaction success',
            data: {
                totalPrice,
                // transactionStatus: createdTransaction.status
            }
        })
    } catch (error) {
        next(error)
    }
}

export const cancelTransaction = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, transactionId } = req.body
         
        const cancelTransaction = await prisma.transaction.update({
            where: {
                id: transactionId
            },
            data: {
                status: 'CANCELLED',
                totalPrice: 0
            }
        })
    
        await prisma.transactionDetail.deleteMany({
            where: {
                transactionId: cancelTransaction.id
            }
        })
    
        res.status(200).json({
            error: false,
            message: 'Cancel transaction success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const payTransaction = async(req: Request, res: Response, next: NextFunction) => {
    
}