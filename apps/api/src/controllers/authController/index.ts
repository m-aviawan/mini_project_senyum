import { Request, Response, NextFunction } from "express"
import prisma from "@/connection"
import { createToken, createTokenForVerifyRegister, decodeToken } from "@/utils/jsonWebToken"
import { authenticationUserService, keepAuthService, registerUserService } from "@/services/authService"
import { IUser } from "@/services/authService/types"
import fs from 'fs'
import { compile } from "handlebars"
import { transporter } from "@/utils/transporter"
import { v4 as uuid } from "uuid"
import { hashPassword  } from "@/utils/hashPassword"
import { addDays, addMonths } from "date-fns"
import mySqlConnection from "@/connection/mysql2"
import { JwtPayload } from "jsonwebtoken"

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, referralCode } = req.body
        
        const resData = await registerUserService({ username, email, password, referralCode })

        res.status(201).json({
            error: false,
            message: "Register success",
            data: {
                username: resData.username,
                token: resData.token,
                role: resData.role,
                isVerified: resData.isVerified,
                isGoogleRegistered: resData.isGoogleRegistered,
                profilePictureUrl: resData.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

export const authenticationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role, isGoogleRegistered } = req.body

        const user = await authenticationUserService({ email, password, role })
        const token = await createToken({ id: user!.id, role: user!.role })
        
        res.status(200).json({
            error: false,
            message: 'Login success',
            data: {
                token,
                username: user!.username,
                role: user!.role,
                isVerified: user!.isVerified,
                isGoogleRegistered: user!.isGoogleRegistered,
                profilePictureUrl: user!.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)    
    }
}

export const keepAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, token } = req.body
        const resData = await keepAuthService({ id, role })

        res.status(200).json({
            error: false,
            message: 'Keep auth success',
            data: {
                token,
                role,
                username: resData.username,
                isVerified: resData.isVerified,
                isGoogleRegistered: resData.isGoogleRegistered,
                profilePictureUrl: resData.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)  
    } 
}

export const verifyRegister = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body

        let user, username, isGoogleRegistered, profilePictureUrl;
        if(role === 'CUSTOMER') {
            user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            if(!user?.id) throw { msg: 'User not found!', status: 406 }
            if(user!.isVerified) throw { msg: `You're already verified!`, status: 406 }
            await prisma.user.update({
                where: { id },
                data: { isVerified: true } 
            })
            username = user?.username
            isGoogleRegistered = user?.isGoogleRegistered
            profilePictureUrl = user?.profilePictureUrl
        } else if(role === 'EO') {
            user = await prisma.eventOrganizer.findUnique({
                where: {
                    id
                }
            })
            if(!user?.id) throw { msg: 'User not found!', status: 406 }
            if(user!.isVerified) throw { msg: `You're already verified!`, status: 406 }
            await prisma.eventOrganizer.update({
                where: { id },
                data: { isVerified: true }
            })
            username = user?.companyName
            isGoogleRegistered = false
            profilePictureUrl = user?.profilePictureUrl
        } else {
            throw { msg: 'Role not found!', status: 406 }
        }
        
        const token = await createToken({ id, role: user!.role })
    
        res.status(200).json({
            error: false,
            message: 'Verify register success',
            data: {
                token,
                role,
                username,
                isVerified: true,
                isGoogleRegistered,
                profilePictureUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerEO = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { companyName, phoneNumber, address, email, pic, password } = req.body
        
        if(!companyName || !phoneNumber || !address || !email || !pic || !password) throw { msg: 'Field must be filled!', status: 406 }
        if(!email.includes('@')) throw { msg: 'Email invalid!' }
        const emailBodyVerifyRegisterForEO = fs.readFileSync('./src/public/emailHTMLCollections/verifyRegisterForEO.html', 'utf-8')
        
        
        const newEO = await prisma.eventOrganizer.create({
            data: {
                companyName,
                phoneNumber,
                email,
                pic,
                password: await hashPassword(password),
                address
            }
        })
        
        
        const token = await createToken({ id: newEO.id, role: newEO.role })
        const tokenForVerifyRegister = await createTokenForVerifyRegister({ id: newEO.id, role: newEO.role })
    
        
        let compiledEmailBodyVerifyRegisterForEO: any = await compile(emailBodyVerifyRegisterForEO)
        compiledEmailBodyVerifyRegisterForEO = compiledEmailBodyVerifyRegisterForEO({ companyName, url: `http://localhost:3000/verify-register-eo/${tokenForVerifyRegister}` })
    
        
        await transporter.sendMail({
            to: email,
            subject: 'Verify Register [Spiral Tickets]',
            html: compiledEmailBodyVerifyRegisterForEO
        })
    
        res.status(201).json({
            error: false,
            message: 'Register Success',
            data: {
                companyName,
                token,
                role: newEO.role,
                isVerified: newEO.isVerified,
                isGoogleRegistered: false,
                profilePictureUrl: newEO.profilePictureUrl
            }
        })
    } catch (error) {
        next(error)
    }
}

export const authWithGoogle = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const checkUser = await prisma.user.findUnique({
            where : {
                email
            }
        })
        let userData;

        if(!checkUser?.id) {
            const password = '12345678'
            const userReferralCode = uuid().slice(0, 8)
                
            const newUser = await prisma.user.create({
                data: { 
                    email, 
                    password: await hashPassword(password), 
                    referralCode: userReferralCode,
                    username: 'Guest',
                    isGoogleRegistered: true,
                    isVerified: true,
                    role: 'CUSTOMER'
                }
            })
    
            userData = {
                username: newUser?.username,
                role: newUser?.role,
                id: checkUser?.id,
                isVerified: newUser?.isVerified,
                isGoogleRegistered: newUser?.isGoogleRegistered,
                profilePictureUrl: newUser?.profilePictureUrl,
            }
        
            const emailBodyReferralCode = fs.readFileSync('./src/public/emailHTMLCollections/getReferralCode.html', 'utf-8')
        
            let compiledEmailBodyReferralCode: any = await compile(emailBodyReferralCode)
            compiledEmailBodyReferralCode = compiledEmailBodyReferralCode({referralCode: userReferralCode, username: 'there'})
    
            await transporter.sendMail({
                to: email,
                subject: 'Referral Code [Spiral Tickets]',
                html: compiledEmailBodyReferralCode
            })
        } else if (checkUser?.id) {
            userData = {
                username: checkUser?.username,
                role: checkUser?.role,
                isVerified: checkUser?.isVerified,
                id: checkUser?.id,
                isGoogleRegistered: checkUser?.isGoogleRegistered,
                profilePictureUrl: checkUser?.profilePictureUrl,
            }
        } else {
            throw { msg: 'Email or Password invalid! Try again', status: 406 }
        }

        const token = await createToken({id: userData?.id, role: userData?.role })

        res.status(200).json({
            error: false,
            message: 'Authentication with Google success',
            data: {
                token,
                username: userData?.username,
                role: userData?.role,
                isVerified: userData?.isVerified,
                isGoogleRegistered: userData?.isGoogleRegistered,
                profilePictureUrl: userData?.profilePictureUrl
            }
        })

    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body
        const user = await prisma.user.findUnique({
            where : {
                email,
                isGoogleRegistered: false
            }
        })
    
        if(!user?.id) throw { msg: 'User not found!' }
    
        const token = await createToken({id: user?.id, role: user?.role})
    
        const emailForgotPassword = fs.readFileSync("./src/public/emailHTMLCollections/forgotPassword.html", 'utf-8')
        let compiledEmailForgotPassword: any = await compile(emailForgotPassword)
        compiledEmailForgotPassword = compiledEmailForgotPassword({username: user?.username, url: `http://localhost:3000/auth/reset-password/${token}/${user?.countResetPass}`})
    
        await transporter.sendMail({
            to: email,
            subject: 'Reset Password [Spiral Ticket]',
            html: compiledEmailForgotPassword
        })
        
        res.status(200).json({
            error: false,
            message: 'Send email reset password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}

export const resetPassword = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params
        const { countResetPass, password } = req.body
        
        const decodedToken: any = await decodeToken(token)
        const isResetPassNeverUsed = await prisma.user.findUnique({
            where: {
                id: decodedToken?.data?.id,
                countResetPass: Number(countResetPass)
            }
        })
        
        if(!isResetPassNeverUsed?.id) throw { msg: 'URL is expired!', status: 406 }

        await prisma.user.update({
            where: {
                id: isResetPassNeverUsed?.id
            },
            data: {
                password: await hashPassword(password),
                countResetPass: Number(isResetPassNeverUsed.countResetPass) + 1
            }
        })
        res.status(200).json({
            error: false,
            message: 'Reset password success',
            data: {}
        })
    } catch (error) {
        next(error)
    }
}