import prisma from "@/connection";
import { v4 as uuid } from "uuid";
import { hashPassword } from "@/utils/hashPassword";
import { addHours, addMonths } from "date-fns";
import mySqlConnection from "@/connection/mysql2";
import fs from 'fs'
import { transporter } from "@/utils/transporter";
import { createToken } from "@/utils/jsonWebToken";
import { compile } from "handlebars";
import { createTokenForVerifyRegister } from "@/utils/jsonWebToken";
import { comparePassword } from "@/utils/hashPassword";
import { IEO, IUser, IUserWithToken } from "./types";
import { decodeToken } from "@/utils/jsonWebToken";

export const registerUserService = async({ username, email, password, referralCode}: Pick< IUser, 'username' | 'email' | 'password' | 'referralCode' >) => {
        
        let token, newUser, createdReferralPoint, createdReferralDiscount, eventSchedulerUniqueId;
        
        const userReferralCode = uuid().slice(0, 8)
        let isReferralCodeCorrect

        const isEmailUsed = await prisma.user.findUnique({
            where: { email }
        })
        if(isEmailUsed?.id) throw { msg: 'Email has been used! Try another', status: 406 }
        
        await prisma.$transaction(async(tx) => {
            
            newUser = await tx.user.create({
                data: { username, email, password: await hashPassword(password), referralCode: userReferralCode }
            })
    
            if(referralCode) {
                const checkReferralCode = await tx.user.findUnique({
                    where: { referralCode }
                })
                
                if(checkReferralCode?.id) {
                    createdReferralDiscount = await tx.referralDiscount.create({
                        data: {
                            userId: newUser.id,
                            percentDiscount: 10,
                            expiry: addHours(addMonths(new Date, 3), 7)
                        }
                    })

                    eventSchedulerUniqueId = createdReferralDiscount?.id
        
                    createdReferralPoint = await tx.referralPoint.create({
                        data: {
                            point: 10000,
                            userId: checkReferralCode.id,
                            expiry: addHours(addMonths(new Date, 3), 7)
                        }
                    })
        
                    await tx.user.update({
                        where: { id: checkReferralCode.id },
                        data: { totalPoint: checkReferralCode.totalPoint + 10000 }
                    })
                    
                    isReferralCodeCorrect = true
                }
                
            }
            
        })

        if(isReferralCodeCorrect) {

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

        const data = {
            username,
            token,
            role: newUser!.role as string,
            isVerified: newUser!.isVerified as boolean,
            isGoogleRegistered: newUser!.isGoogleRegistered as boolean,
            profilePictureUrl: newUser!.profilePictureUrl as string
        }
        
        return data
}

export const authenticationUserService = async({email, password, role} : Pick<IUser , 'email' | 'password' | 'role' >) => {
    let user, comparedPassword, userData;
    if(role === 'CUSTOMER') {
        user = await prisma.user.findUnique({
            where: { 
                email,
                isGoogleRegistered: false
             },
        })
        
        if(!user?.id) throw { msg: 'User not found!', status: 406 }
        const comparedPassword = await comparePassword(password, user?.password)
        if(!comparedPassword) throw { msg: 'Email or Password invalid! Try again', status: 406 }

        userData = {
            username: user?.username,
            role: user?.role,
            isVerified: user?.isVerified,
            id: user?.id,
            isGoogleRegistered: user?.isGoogleRegistered,
            profilePictureUrl: user?.profilePictureUrl,
        }
    } else if( role === 'EO') {
        user = await prisma.eventOrganizer.findUnique({
            where: { email  }
        })
        if(!user?.id) throw { msg: 'User not found!', status: 406 }

        comparedPassword = await comparePassword(password, user!.password)
        if(!comparedPassword) throw { msg: 'Email or Password invalid! Try again', status: 406 }
        
        userData = {
            username: user?.companyName,
            role: user?.role,
            isVerified: user?.isVerified,
            id: user?.id,
            profilePictureUrl: user?.profilePictureUrl,
            isGoogleRegistered: false
        }
    } else {
        throw { msg: "Role is missing!", status: 406 }
    }
    return userData
}

export const keepAuthService = async({ id, role }: Pick<IUser, 'id' | 'role'>) => {
    let username, isVerified, isGoogleRegistered, profilePictureUrl;
        if(role === 'CUSTOMER') {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            username = user?.username
            isVerified = user?.isVerified
            isGoogleRegistered = user?.isGoogleRegistered
            profilePictureUrl = user?.profilePictureUrl
        } else if( role === 'EO') {
            const user = await prisma.eventOrganizer.findUnique({
                where: {
                    id
                }
            })
            username = user?.companyName
            isVerified = user?.isVerified
            profilePictureUrl = user?.profilePictureUrl
            isGoogleRegistered = false
        }

    const data = {
        username,
        isVerified,
        isGoogleRegistered,
        profilePictureUrl
    }
    
    return data
}

export const verifyRegisterService = async({id, role}: Pick<IUser, 'id' | 'role'>) => {
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

    return {
        token,
        role,
        username,
        isGoogleRegistered,
        profilePictureUrl,
        isVerified: true
    }
}

export const registerEOService = async({companyName, phoneNumber, address, email, pic, password }: Pick<IEO , 'companyName' | 'phoneNumber' | 'address' | 'email' | 'pic' | 'password' >) => {
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

        return {
            companyName,
            token,
            role: newEO.role,
            isVerified: newEO.isVerified,
            isGoogleRegistered: false,
            profilePictureUrl: newEO.profilePictureUrl
        }
}

export const authWithGoogleService = async({email}: Pick<IUser, 'email'>) => {
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

    return {
        token,
        username: userData?.username,
        role: userData?.role,
        isVerified: userData?.isVerified,
        isGoogleRegistered: userData?.isGoogleRegistered,
        profilePictureUrl: userData?.profilePictureUrl
    }
}

export const forgotPasswordService = async({ email }: Pick<IUser, 'email'>) => {
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
    
}

export const resetPasswordService = async({token, countResetPass, password}: Pick<IUserWithToken, 'token' | 'countResetPass' | 'password' >) => {
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
}