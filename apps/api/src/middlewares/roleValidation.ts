import { NextFunction, Request, Response } from "express";
import prisma from "@/connection/prisma";

export const roleValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body
    
        if(role === 'CUSTOMER') throw { msg: 'Role not authorized!' }
        
        next()
    } catch (error) {
        next(error)
    }
}