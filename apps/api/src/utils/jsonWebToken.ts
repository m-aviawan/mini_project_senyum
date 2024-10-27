import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const privateKeyJsonWebToken = process.env.PRIVATE_KEY_JSON_WEB_TOKEN

console.log(privateKeyJsonWebToken)

export const createToken = async(password: string) => {
    return await jwt.sign(password, `${privateKeyJsonWebToken}`, {expiresIn: '1d'})
}

export const decodeToken = async(token: string) => {
    return await jwt.verify(token, `${privateKeyJsonWebToken}`)
}