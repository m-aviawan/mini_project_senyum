import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IUser } from '@/services/authService/types'
dotenv.config()

const privateKeyJsonWebToken = process.env.PRIVATE_KEY_JSON_WEB_TOKEN

export const createToken = async({id, role}: Pick< IUser , 'id' | 'role'>) => {
    return await jwt.sign({data: {id, role}}, `${privateKeyJsonWebToken}`, {expiresIn: '1d'})
}

export const createTokenForVerifyRegister = async({id, role}: Pick< IUser , 'id' | 'role'>) => {
    return await jwt.sign({data: {id, role}}, `${privateKeyJsonWebToken}`)
}

export const decodeToken = async(token: string) => {
    return jwt.verify(token, `${privateKeyJsonWebToken}`)
}