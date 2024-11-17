import prisma from "@/connection/prisma";
import { v4 as uuid } from "uuid";
import { hashPassword } from "@/utils/hashPassword";
import { addMonths } from "date-fns";
import mySqlConnection from "@/connection/mysql2";
import fs from 'fs'
import { transporter } from "@/utils/transporter";
import { createToken } from "@/utils/jsonWebToken";
import { compile } from "handlebars";
import { createTokenForVerifyRegister } from "@/utils/jsonWebToken";
import { comparePassword } from "@/utils/hashPassword";
import { IUser } from "./types";

export const registerUserService = async({ username, email, password, referralCode}: Pick< IUser, 'username' | 'email' | 'password' | 'referralCode' >) => {
        
        let token, newUser, createdReferralPoint, createdReferralDiscount, eventSchedulerUniqueId;
        
        const userReferralCode = uuid().slice(0, 8)
        let isReferralCodeCorrect = false

        const isEmailUsed = await prisma.user.findUnique({
            where: { email }
        })
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

                    eventSchedulerUniqueId = createdReferralDiscount?.id
        
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
               CREATE EVENT transaction_${eventSchedulerUniqueId!}
               ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE 
               DO
               BEGIN
                UPDATE referral_discounts SET isUsed = 1 WHERE id = '${createdReferralDiscount!.id}'   
                `)
                //buat model untuk point balance


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

// export const verifyRegister = async() => {
//     let user, username, isGoogleRegistered;
//         if(role === 'CUSTOMER') {
//             user = await prisma.user.findUnique({
//                 where: {
//                     id
//                 }
//             })
//             if(!user?.id) throw { msg: 'User not found!', status: 406 }
//             if(user!.isVerified) throw { msg: `You're already verified!`, status: 406 }
//             await prisma.user.update({
//                 where: { id },
//                 data: { isVerified: true } 
//             })
//             username = user?.username
//             isGoogleRegistered = user?.isGoogleRegistered
//         } else if(role === 'EO') {
//             user = await prisma.eventOrganizer.findUnique({
//                 where: {
//                     id
//                 }
//             })
//             if(!user?.id) throw { msg: 'User not found!', status: 406 }
//             if(user!.isVerified) throw { msg: `You're already verified!`, status: 406 }
//             await prisma.eventOrganizer.update({
//                 where: { id },
//                 data: { isVerified: true }
//             })
//             username = user?.companyName
//             isGoogleRegistered = false
//         } else {
//             throw { msg: 'Role not found!', status: 406 }
//         }
        
//         const token = await createToken({ id, role: user!.role })
// }