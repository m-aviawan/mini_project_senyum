import { Request, Response, NextFunction } from "express"
import prisma from "@/connection/prisma"
import { createToken, createTokenForVerifyRegister, decodeToken } from "@/utils/jsonWebToken"
import { authenticationUserService, registerUserService } from "@/services/authService"
import { IUser } from "@/services/authService/types"
import fs from 'fs'
import { compile } from "handlebars"
import { transporter } from "@/utils/transporter"
import { v4 as uuid } from "uuid"
import { hashPassword  } from "@/utils/hashPassword"
import { addDays, addMonths } from "date-fns"
import mySqlConnection from "@/connection/mysql2"

export const registerUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, referralCode } = req.body

        let token, newUser, createdReferralPoint, createdReferralDiscount;

        const userReferralCode = uuid().slice(0, 8)
        const isEmailUsed = await prisma.user.findUnique({
            where: { email }
        })
        let isReferralCodeCorrect = false
    
        if(isEmailUsed?.id) throw { msg: 'Email has been used! Try another', status: 406 }
        await prisma.$transaction(async(tx) => {
            
            newUser = await tx.user.create({
                data: { username, email, password: await hashPassword(password), referralCode: userReferralCode }
            })
    
            if(referralCode) {
                const isRefferalCodeCorrect = await tx.user.findUnique({
                    where: { referralCode }
                })
                if(isRefferalCodeCorrect?.id) {
                    createdReferralDiscount = await tx.referralDiscount.create({
                        data: {
                            userId: newUser.id,
                            percentDiscount: 10,
                            expiry: addMonths(new Date, 3)
                        }
                    })
        
                    createdReferralPoint = await tx.referralPoint.create({
                        data: {
                            point: 10000,
                            userId: isRefferalCodeCorrect.id,
                            expiry: addMonths(new Date, 3)
                        }
                    })
        
                    await tx.user.update({
                        where: { id: isRefferalCodeCorrect.id },
                        data: { totalPoint: isRefferalCodeCorrect.totalPoint + 10000 }
                    })
                    
                    isReferralCodeCorrect = true

                }
                
            }
            
        })
        if(isReferralCodeCorrect) {
            const query = await mySqlConnection()
            await query.query(`
               CREATE EVENT transaction_${email}
               ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE 
               DO
               BEGIN
                UPDATE referral_points SET point = 0 WHERE id = '${createdReferralPoint!.id}'   
                UPDATE referral_discounts SET isUsed = 1 WHERE id = '${createdReferralDiscount!.id}'   
                `)


            const emailBodyReferralDiscount = fs.readFileSync('./src/public/emailHTMLCollections/getReferralDiscount.html', 'utf-8')
    
            let compiledEmailBodyReferralDiscount: any = await compile(emailBodyReferralDiscount)
            compiledEmailBodyReferralDiscount = compiledEmailBodyReferralDiscount({discount: `10%`, expiry: addMonths(new Date(), 3)})
    
            await transporter.sendMail({
                to: email,
                subject: 'Keep Your Refferal Discount [Spiral Tickets]',
                html: compiledEmailBodyReferralDiscount
            })


        }

        token = await createToken({id: newUser!.id, role: newUser!.role})
        const tokenForVerifyRegister = await createTokenForVerifyRegister({id: newUser!.id, role: newUser!.role})
        if(!token) throw { msg: 'Create token failed', status: 500 }

        const emailBodyVerifyRegister = fs.readFileSync('./src/public/emailHTMLCollections/verifyRegister.html', 'utf-8')
        const emailBodyReferralCode = fs.readFileSync('./src/public/emailHTMLCollections/getReferralCode.html', 'utf-8')
 
        let compiledEmailBodyVerifyRegister: any = await compile(emailBodyVerifyRegister)
        compiledEmailBodyVerifyRegister = compiledEmailBodyVerifyRegister({username, url: `http://localhost:3000/verify-register/${tokenForVerifyRegister}`})

        let compiledEmailBodyReferralCode: any = await compile(emailBodyReferralCode)
        compiledEmailBodyReferralCode = compiledEmailBodyReferralCode({referralCode: userReferralCode, username})

        
        await transporter.sendMail({
            to: email,
            subject: 'Verify Register [Spiral Tickets]',
            html: compiledEmailBodyVerifyRegister
        })

        await transporter.sendMail({
            to: email,
            subject: 'Referral Code [Spiral Tickets]',
            html: compiledEmailBodyReferralCode
        })
        res.status(201).json({
            error: false,
            message: "Register user success",
            data: {
                username,
                token,
                role: newUser!.role ,
                isVerified: newUser!.isVerified,
                isGoogleRegistered: newUser!.isGoogleRegistered
            }
        })
    } catch (error) {
        next(error)
    }
}

export const authenticationUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role } = req.body

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
                isGoogleRegistered: user!.isGoogleRegistered
            }
        })
    } catch (error) {
        next(error)    
    }
}

export const keepAuth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role, token } = req.body
        let username, isVerified, isGoogleRegistered;
        if(role === 'CUSTOMER') {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            username = user?.username
            isVerified = user?.isVerified
            isGoogleRegistered = user?.isGoogleRegistered
        } else if( role === 'EO') {
            const user = await prisma.eventOrganizer.findUnique({
                where: {
                    id
                }
            })
            username = user?.companyName
            isVerified = user?.isVerified
            isGoogleRegistered = false
        }

        res.status(200).json({
            error: false,
            message: 'Keep auth success',
            data: {
                token,
                role,
                username,
                isVerified,
                isGoogleRegistered
            }
        })
    } catch (error) {
        next(error)  
    } 
}

export const verifyRegister = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body

        let user, username, isGoogleRegistered;
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
                isGoogleRegistered
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
                isGoogleRegistered: false
            }
        })
    } catch (error) {
        next(error)
    }
}

export const registerWithGoogle = async(req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body)
        const { email } = req.body
        const password = '12345678'
    
        const userReferralCode = uuid().slice(0, 8)
        const isEmailUsed = await prisma.user.findUnique({
            where: { email }
        })
        if(isEmailUsed?.id) throw { msg: 'Email has been used! Try another', status: 406 }
            
        const newUser = await prisma.user.create({
            data: { 
                email, 
                password: await hashPassword(password), 
                referralCode: userReferralCode,
                username: 'Guest',
                isGoogleRegistered: true,
            }
        })
    
        const token = await createToken({id: newUser!.id, role: newUser!.role})
        const tokenForVerifyRegister = await createTokenForVerifyRegister({id: newUser!.id, role: newUser!.role})
        if(!token) throw { msg: 'Create token failed', status: 500 }
    
        const emailBodyVerifyRegister = fs.readFileSync('./src/public/emailHTMLCollections/verifyRegister.html', 'utf-8')
        const emailBodyReferralCode = fs.readFileSync('./src/public/emailHTMLCollections/getReferralCode.html', 'utf-8')
     
        let compiledEmailBodyVerifyRegister: any = await compile(emailBodyVerifyRegister)
        compiledEmailBodyVerifyRegister = compiledEmailBodyVerifyRegister({username: 'there', url: `http://localhost:3000/verify-register/${tokenForVerifyRegister}`})
    
        let compiledEmailBodyReferralCode: any = await compile(emailBodyReferralCode)
        compiledEmailBodyReferralCode = compiledEmailBodyReferralCode({referralCode: userReferralCode, username: 'there'})
    
        await transporter.sendMail({
            to: email,
            subject: 'Verify Register [Spiral Tickets]',
            html: compiledEmailBodyVerifyRegister
        })
    
        await transporter.sendMail({
            to: email,
            subject: 'Referral Code [Spiral Tickets]',
            html: compiledEmailBodyReferralCode
        })

        res.status(201).json({
            error: false,
            message: 'Register with Google success',
            data: {
                token,
                username: newUser?.username,
                role: newUser?.role,
                isVerified: newUser?.isVerified,
                isGoogleRegistered: newUser?.isGoogleRegistered
            }
        })
    } catch (error) {
        next(error)
    }
}

export const loginWithGoogle = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, isGoogleRegistered } = req.body
        if(!email) throw { msg: 'Email must be filled!', status: 406}

        const userLogin = await prisma.user.findUnique({
            where: {
                email,
                isGoogleRegistered
            }
        })

        if(!userLogin?.id) throw { msg: 'User not found!', status: 406 }
        const token = createToken({id: userLogin.id, role: userLogin.role })


        res.status(200).json({
            error: false,
            message: 'Login with Google success',
            data: {
                token,
                username: userLogin?.username,
                role: userLogin?.role,
                isVerified: userLogin?.isVerified,
                isGoogleRegistered
            }
        })

    } catch (error) {
        next(error)
    }
}

// export const signInWithGoogle = async(req: Request, res: Response, next: NextFunction) => {
//     const token = createToken()
// }

// model EventOrganizer {
//     id          String  @id @default(cuid())
//     email       String
//     companyName String
//     phoneNumber String
//     isVerified  Boolean @default(false)
//     pic         String
//     role        String  @default("EO")
//     events      Event[]
  
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     deletedAt DateTime?
  
//     @@map("event_organizers")
//   }

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