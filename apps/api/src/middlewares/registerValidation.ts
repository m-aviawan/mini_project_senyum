import { Request, Response, NextFunction } from "express";

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body
    
        if(!username || !password || !email ) {
            throw { msg: "Field must be filled!", status: 400}
        }
        if(!email.includes('@')) throw { msg: 'Email invalid!', status: 406 }

        next()
    } catch (error) {
        next(error)
    }
}