import { Request, Response, NextFunction } from "express"

export const midtrans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next (error)
    }
}
