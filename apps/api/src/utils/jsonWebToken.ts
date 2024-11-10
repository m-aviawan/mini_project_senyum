import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IUser } from '@/services/authService/types'
dotenv.config()

const privateKeyJsonWebToken = process.env.PRIVATE_KEY_JSON_WEB_TOKEN

console.log(privateKeyJsonWebToken)

export const createToken = async({id, role}: Pick< IUser , 'id' | 'role'>) => {
    return await jwt.sign({data: {id, role}}, `${privateKeyJsonWebToken}`, {expiresIn: '1d'})
}

export const decodeToken = async(token: string) => {
    return await jwt.verify(token, `${privateKeyJsonWebToken}`)
}