import prisma from "@/connection"
import snap from "@/utils/midtrans"
import { NextFunction, Request, Response } from "express"

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id /* User ID */, ticketDetails } = req.body;
        const { eventId } = req.params;

        const dataUser = await prisma.user.findFirst({ where: { id } });
        console.log(dataUser, '<<<<data user ini')
        const dataEvent = await prisma.event.findFirst({ where: { id: eventId } });
        console.log(dataEvent, 'data event <<<<<')

        if (!dataUser || !dataEvent) throw res.status(404).json({ error: true, message: 'User atau Event tidak ditemukan.' });

        let totalPembayaran = 0;

        const details = ticketDetails.map((item: any) => {
            totalPembayaran += item.totalPrice;
            return {
                price: item.price,
                qty: item.qty,
                ticketId: item.id
            };
        });

        const transaction = await prisma.transaction.create({
            data: {
                totalPrice: Number(totalPembayaran),
                status: 'WAITING_FOR_PAYMENT',
                userId: dataUser?.id,
                eoId: dataEvent?.eoId,
                eventId: dataEvent?.id,
                details: {
                    create: details,
                },
            },
            include: { details: true },
        });

        const midtransPayload = {
            transaction_details: {
                order_id: transaction.id,
                gross_amount: totalPembayaran,
            },
            customer_details: {
                first_name: dataUser.username,
                email: dataUser.email,
                phone: dataUser.phoneNumber,
            },
        };

        const paymentToken = await snap.createTransaction(midtransPayload);

        res.status(200).json({
            error: false,
            message: 'Transaksi berhasil dibuat',
            data: {
                paymentUrl: paymentToken.redirect_url,
                transactionId: transaction.id,
            },
        });
    } catch (error) {
        next(error);
    }
};