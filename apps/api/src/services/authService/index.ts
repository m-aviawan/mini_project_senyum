import prisma from "@/connection/prisma"
import { IUser } from "./types"
import { comparePassword, hashPassword } from "@/utils/hashPassword"
import { transporter } from "@/utils/transporter"
import { v4 as uuid } from "uuid"
import { createTokenForVerifyRegister } from "@/utils/jsonWebToken"
import fs from 'fs'
import { compile } from "handlebars"

export const registerUserService = async({ username, email, password, referralCode }: IUser) => {
    const isEmailUsed = await prisma.user.findUnique({
        where: { email }
    })

    if(isEmailUsed?.id) throw { msg: 'Email has been used! Try another', status: 406 }

    const newUser = await prisma.user.create({
        data: { username, email, password: await hashPassword(password), referralCode }
    })

    return newUser
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
            isGoogleRegistered: false
        }
    } else {
        throw { msg: "Role is missing!", status: 406 }
    }
    return userData
}

// export const keepAuth = async()