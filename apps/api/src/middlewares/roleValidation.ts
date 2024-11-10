import { NextFunction, Request, Response } from "express";
import prisma from "@/connection/prisma";

export const roleValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body
    
        if(role === 'CUSTOMER') {
            const user = await prisma.user.findUnique({
                where: { id }
            })
    
            if(!id) throw { msg: 'Token invalid!', status: 406 }
            req.body.name = user?.username
        }else if(role === 'EO') {
            const user = await prisma.eventOrganizer.findUnique({
                where: { id }
            })
            
            if(!id) throw { msg: 'Token invalid!', status: 406 }
            req.body.name = user?.companyName
        }
        next()
    } catch (error) {
        next(error)
    }
}