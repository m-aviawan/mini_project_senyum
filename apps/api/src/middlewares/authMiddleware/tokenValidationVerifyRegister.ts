import { decodeToken } from "@/utils/jsonWebToken";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export const tokenValidationVerifyRegister = async(req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params

    const decodedToken: any = await decodeToken(token)
    if(!decodedToken) throw { msg: 'Token invalid!', status: 406 }

    req.body.id = decodedToken?.data?.id 
    req.body.role = decodedToken?.role?.id
    
    
}