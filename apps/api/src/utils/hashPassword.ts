import bcrypt from 'bcrypt'

export const hashPassword = async(password: string) => {
    const saltOrRounds: number = 10
    return bcrypt.hash(password, saltOrRounds)
}

export const comparePassword = async(passwordBody: string, passwordDB: string) => {
    return bcrypt.compare(passwordBody, passwordDB)
} 