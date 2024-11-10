import { Request, Response, NextFunction } from "express"
import prisma from "@/connection/prisma"
import { create } from "domain"
import { createToken, decodeToken } from "@/utils/jsonWebToken"
import { authenticationService, registerUserService } from "@/services/authService"
import { IUser } from "@/services/authService/types"
import { hashPassword } from "@/utils/hashPassword"

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body
    
        const newUser = await registerUserService({ username, email, password: await hashPassword(password) })
        const token = await createToken({id: newUser.id, role: newUser.role})

        res.status(201).json({
            error: false,
            message: "Register new account success",
            data: {
                username,
                role: newUser.role,
                token,
                refferalCode: newUser.refferalCode
            }
        })
    } catch (error) {
        next(error)
    }
}

export const authenticationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
    
        const user = await authenticationService({ email, password })

        const token = await createToken({ id: user.id, role: user.role })
    
        res.status(200).json({
            error: false,
            message: 'Login success',
            data: {
                token,
                username: user.username,
                role: user.role
            }
        })
    } catch (error) {
        next(error)    
    }
}

export const keepAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, role, token } = req.body

        res.status(200).json({
            error: false,
            message: 'Keep auth success',
            data: {
                token,
                role,
                name
            }
        })
    } catch (error) {
        next(error)  
    } 
}

/*
 id           String   @id @default(cuid())
  firstName    String
  lastName     String
  email        String   @unique
  gender       Gender
  birthDate    DateTime
  idCardNumber String
  referralCode String   @default(cuid())
  role       
*/