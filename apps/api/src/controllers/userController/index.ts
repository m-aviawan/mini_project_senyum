import prisma from "@/connection/prisma"
import { cloudinaryUpload } from "@/utils/cloudinary";
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
                gender: userData?.gender,
                profilePictureUrl: userData?.profilePictureUrl
            }
        } else if(role === 'EO') {
            userData = await prisma.eventOrganizer.findUnique({
                where: { id }
            })
            
            if(!userData?.id) throw { msg: 'Event organizer not found!' }
            resData = {
                companyName: userData?.companyName,
                address: userData?.address,
                email: userData?.email,
                phoneNumber: userData?.phoneNumber,
                pic: userData?.pic,
                profilePictureUrl: userData?.profilePictureUrl
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

export const updateProfile = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, phoneNumber, address, birthDate, gender, id, role, pic, companyName } = req.body
        
        let files, updatedProfile, imagesUploaded, resData;
        if(req.files) {
            files = Array.isArray(req.files) ? 
            req.files : req.files['images']
            
            const response: any = await cloudinaryUpload(files[0].buffer)
            const res: string = response?.res
            imagesUploaded = res
        }

        if(role === 'CUSTOMER') {
            if(imagesUploaded) {
                updatedProfile = await prisma.user.update({
                    where: {
                        id
                    },
                    data: {
                        username,
                        phoneNumber,
                        address,
                        birthDate: new Date(birthDate),
                        gender,
                        profilePictureUrl: imagesUploaded
                    }
                })
                resData = {
                    username,
                    phoneNumber,
                    address,
                    birthDate,
                    gender,
                    ProfilePictureUrl: imagesUploaded
                }
            } else {
                updatedProfile = await prisma.user.update({
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
                resData = {
                    username,
                    phoneNumber,
                    address,
                    birthDate,
                    gender
                }
            }
        } else if( role === 'EO') {
            if(imagesUploaded) {
                updatedProfile = await prisma.eventOrganizer.update({
                    where: {
                        id
                    },
                    data: {
                        companyName,
                        phoneNumber,
                        address,
                        pic,
                        profilePictureUrl: imagesUploaded
                    }
                })
                resData = {
                    companyName,
                    phoneNumber,
                    address,
                    pic,
                    profilePictureUrl: imagesUploaded
                }
            } else {
                updatedProfile = await prisma.eventOrganizer.update({
                    where: {
                        id
                    },
                    data: {
                        companyName,
                        phoneNumber,
                        address,
                        pic
                    }
                })
                resData = {
                    companyName,
                    phoneNumber,
                    address,
                    pic
                }
            }
        }
        res.status(200).json({
            error: false,
            message: 'Update profile success',
            data: resData
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