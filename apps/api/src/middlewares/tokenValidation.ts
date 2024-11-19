import { NextFunction, Request, Response } from "express";
import { decodeToken } from "@/utils/jsonWebToken";

export const tokenValidation = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers
        if(!authorization) throw { msg: 'Token is missing!', status: 400 }
        const token = authorization?.split(' ')[1]
        const decodedToken: any = await decodeToken(token)
        
        req.body.id = decodedToken?.data?.id
        req.body.role = decodedToken?.data?.role
        req.body.token = token
        next()
    } catch (error) {
        next(error)
    }
}