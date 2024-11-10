import prisma from "@/connection/prisma"
import { IUser } from "./types"
import { comparePassword } from "@/utils/hashPassword"

export const registerUserService = async({ username, email, password }: IUser) => {
    const isEmailUsed = await prisma.user.findMany({
        where: { email }
    })

    if(isEmailUsed.length > 0) throw { msg: 'Email has been used!', status: 406 }

    const newUser = await prisma.user.create({
        data: { username, email, password }
    })

    return newUser
}

export const authenticationService = async({email, password} : Pick<IUser , 'email' | 'password'>) => {
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if(!user?.email) throw { msg: 'Email or Password invalid! Try again', status: 406 }

    const isPasswordValid = await comparePassword(password, user.password)
    if(!isPasswordValid) throw { msg: 'Email or Password invalid! Try again', status: 406 }

    return user
}

// export const keepAuth = async()