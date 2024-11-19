import { Request, Response, NextFunction } from "express";
import prisma from "@/connection/prisma";
// import { mysqlConnection, prisma } from "./../../connection";
import { addHours } from "date-fns";
import snap from "@/utils/midtransInstance/midtransInstance";

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, ticketDetails, referralDiscount = 0, referralPoints = 0 } = req.body
        const { userId } = req.params

        const dataUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })


        const dataEvent = await prisma.event.findUnique({
            where: { id: userId },
            include: {
                tickets: true,
                eventOrganizer: true
            }
        })

        if (!dataEvent) throw { msg: "Event not Found", status: 404 }
        let totalPembayaran = 0;
        const dataDetails = ticketDetails?.map((item: any, i: any) => {

            const subtotal = item.quantity * item.price
            const totalDiscount = item.quantity * item.discount
            totalPembayaran += subtotal
            totalPembayaran -= totalDiscount

            return {
                ticketId: item.ticketId,
                price: subtotal,
                quantity: item.quantity,
                discount: totalDiscount,
                expiredAt: addHours(new Date(), 7)
            }
        })

        if (referralDiscount) {
            const findUserDiscount = await prisma.referralDiscount.findFirst({
                where: {
                    userId: userId,
                    isUsed: false,
                }
            })

            if (addHours(new Date(), 7) >= findUserDiscount?.expiry!) throw { msg: 'ERROR', status: 404 }

            if (findUserDiscount) {
                const discountUser = (findUserDiscount.percentDiscount)/100 * totalPembayaran
                totalPembayaran -= discountUser

                await prisma.referralDiscount.update({
                    where: { id: findUserDiscount.id },
                    data: {
                        isUsed: true,
                        percentDiscount: 0
                    }
                })
            }
        }

        if (referralPoints) {
            const findUserRefferal = await prisma.referralPoint.findFirst({
                where: {
                    userId: userId,


                }
            })

            if (addHours(new Date(), 7) >= findUserRefferal?.expiry!) throw { msg: 'ERROR', status: 404 }

            if (findUserRefferal) {
                const totalPoints = findUserRefferal?.point - referralPoints

                totalPembayaran = Math.max(totalPembayaran - referralPoints, 0)
                await prisma.referralPoint.update({
                    where: { id: findUserRefferal.id },
                    data: {
                        point: totalPoints,
                    }

                })
            }
        }


        if (totalPembayaran == 0) {
            const transactionId = await prisma.transaction.create({
                data: {
                    eventId: (id),
                    totalPrice: totalPembayaran,
                    userId: userId,
                    eventOrganizerId: dataEvent.eventOrganizer.id,
                    status: "PAID"
                }
            })

            const dataArrTransacDetail = dataDetails.map((item: any, i: any) => {
                return {
                    transactionsId: transactionId.id,
                    ticketId: item.ticketId,
                    price: item.price,
                    discount: item.discount,
                    quantity: item.quantity,
                }
            })
            await prisma.transactionDetail.createMany({
                data: dataArrTransacDetail
            })

            for (const item of ticketDetails) {
                await prisma.eventTicket.update({
                    where: { id: item.ticketId },
                    data: { available: { decrement: item.quantity } }
                });
            }

            res.status(200).json({
                error: false,
                message: 'Berhasil Melakukan Pembayaran',
                data: {}
            })

        } else {

            const transactionId = await prisma.transaction.create({
                data: {
                    eventId: (id),
                    totalPrice: totalPembayaran,
                    userId: userId,
                    eventOrganizerId: dataEvent.eventOrganizer.id,
                    status: "WAITING_FOR_PAYMENT"
                }
            })



            const dataArrTransacDetail = dataDetails.map((item: any, i: any) => {
                return {
                    transactionsId: transactionId.id,
                    ticketId: item.ticketId,
                    price: item.price,
                    discount: item.discount,
                    quantity: item.quantity,
                }
            })
            await prisma.transactionDetail.createMany({
                data: dataArrTransacDetail
            })

            for (const item of ticketDetails) {
                await prisma.eventTicket.update({
                    where: { id: item.ticketId },
                    data: { available: { decrement: item.quantity } }
                });
            }



            const query = await mysqlConnection()
            await query.query(`
   

            CREATE EVENT transaction_${transactionId.id}
            ON SCHEDULE AT NOW() + INTERVAL 15 MINUTE
            DO 
            BEGIN
                INSERT INTO transactionstatus (status, transactionsId, updatedAt) VALUES ('EXPIRED', '${transactionId.id}', utc_timestamp());
            END;
        `);


            const paymentToken = await snap.createTransaction({
                payment_type: 'bank_transfer',

                transaction_details: {
                    order_id: transactionId.id.toString(),
                    gross_amount: totalPembayaran,
                },
                customer_details: {
                    first_name: dataUser?.username,
                    email: dataUser?.email,
                    phone: dataUser?.phoneNumber,
                }
            });

            res.status(200).json({
                error: false,
                message: 'Berhasil Melakukan Pembayaran',
                data: { paymentToken }
            })
        }

    } catch (error) {
        next(error)
    }
}



































import { Connection } from "mysql2";

function mysqlConnection(): Connection {
    throw new Error("Function not implemented.");
}
// export const createTransaction = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { tickets, id } = req.body
        
//         if(tickets.length) throw { msg: 'Ticket transactions data is missing', status: 406 }
        
//         let totalPrice = tickets.map((item: any) => item.qty * item.price)
//         totalPrice = totalPrice.reduce((acc: number, curr: number) => acc + curr)

//         const user = await prisma.user.findUnique({
//             where: { id },
//             include: {
//                 referralPoints: true,
//                 referralDiscounts: true
//             }
//         })
//         const limit = totalPrice / 10000 
//         const limitDecimal = ((limit * 10) % 10) / 10


//         let points = await prisma.referralPoint.findMany({
//             where: { 
//                 userId: id,
//             },
//         })

//         let pointsFiltered = points.filter((item: any) => {
//             return (isAfter(new Date(), new Date(item.expiry)) && item.point > 0)
//         })  

//         const slicedPointsFiltered = pointsFiltered.slice(0, Math.ceil(limit))
//         const idPointsArr = slicedPointsFiltered.map((item) => item.id)
//         const lastIdPoints = idPointsArr[idPointsArr.length - 1]
//         const firstIdPoints = idPointsArr.slice(0, idPointsArr.length - 1)
//         await prisma.referralPoint.updateMany({
//             where: {
//                 id: { in : [...idPointsArr] }
//             },
//             data: {
//                 point: 0
//             }
//         })

//         const lastPoint = await prisma.referralPoint.findUnique({
//             where: {
//                 id: lastIdPoints
//             }
//         })

//         await prisma.referralPoint.update({
//             where: {
//                 id: lastIdPoints
//             },
//             data: {
//                 point: lastPoint!.point - ( limitDecimal * 10000 )
//             }
//         })


//         const createdTransaction = await prisma.transaction.create({
//             data: { 
//                 userId: id,
//                 totalPrice
//             }
//         })
    
//         const createDataTransactionDetails = tickets.map((item: any) => {
//             return { 
//                 ticketId: item.ticketId,
//                 price: item.price,
//                 qty: item.qty,
//                 transactionId: createdTransaction.id
//             }
//         })
        
//         await prisma.transactionDetail.createMany({
//             data: createDataTransactionDetails
//         })
        
//         tickets.map(async(item: any) => {
//             const ticket = await prisma.eventTicket.findUnique({
//                 where: { id: item.ticketId }
//             })
//             await prisma.eventTicket.update({
//                 where: { id: item.ticketId },
//                 data: {
//                     available: ticket!.available - item.qty,
//                     bookSeat: ticket!.bookSeat + item.qty
//                 }
//             })

//         })


//         res.status(201).json({
//             error: false,
//             message: 'Create transaction success',
//             data: {
//                 totalPrice,
//                 transactionStatus: createdTransaction.status
//             }
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// export const cancelTransaction = async(req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id, transactionId } = req.body
         
//         const cancelTransaction = await prisma.transaction.update({
//             where: {
//                 id: transactionId
//             },
//             data: {
//                 status: 'CANCELLED',
//                 totalPrice: 0
//             }
//         })
    
//         await prisma.transactionDetail.deleteMany({
//             where: {
//                 transactionId: cancelTransaction.id
//             }
//         })
    
//         res.status(200).json({
//             error: false,
//             message: 'Cancel transaction success',
//             data: {}
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// export const payTransaction = async(req: Request, res: Response, next: NextFunction) => {
    
// }

