import prisma from "@/connection/prisma"
import { Request, Response, NextFunction } from "express"

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body

        let userData, resData;

        if(role === 'CUSTOMER') {
            userData = await prisma.user.findUnique({
                where: { id },
            })
            
            if(!userData?.id) throw { msg: 'User not found!' }
            resData = {
                username: userData?.username,
                email: userData?.email,
                phoneNumber: userData?.phoneNumber,
                address: userData?.address,
                birthDate: userData?.birthDate,
                gender: userData?.gender
            }
        } else if(role === 'EO') {
            userData = await prisma.eventOrganizer.findUnique({
                where: { id }
            })
            
            if(!userData?.id) throw { msg: 'Event organizer not found!' }
            resData = {
                companyName: userData?.companyName,
                email: userData?.email,
                phoneNumber: userData?.phoneNumber,
                pic: userData?.pic
            }
        }
        
        res.status(200).json({
            error: false,
            message: 'Get user success',
            data: resData
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, phoneNumber, address, birthDate, gender, id, role } = req.body
        console.log(req.body)
        let updatedUser
        if(role !== 'CUSTOMER') throw { msg: 'role invalid!', status: 406 }
        if(birthDate) {
            updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    username,
                    phoneNumber,
                    address,
                    birthDate: new Date(birthDate),
                    gender
                }
            })
        } else {
            updatedUser = await prisma.user.update({
                where: {
                    id
                },
                data: {
                    username,
                    phoneNumber,
                    address,
                    gender
                }
            })

        }
        console.log(updatedUser)
        console.log('12345')
        res.status(200).json({
            error: false,
            message: 'Update user success',
            data: {
                username,
                phoneNumber,
                address,
                birthDate,
                gender
            }
        })
    } catch (error) {
        next(error)
    }
}

// id                String  @id @default(cuid())
// username          String
// email             String  @unique
// password          String
// referralCode      String  @unique
// isVerified        Boolean @default(false)
// profilePictureUrl String?
// phoneNumber       String?
// address           String?  @db.LongText
// gender            Gender?
// role              String  @default("CUSTOMER")
// totalPoint        Int     @default(0)