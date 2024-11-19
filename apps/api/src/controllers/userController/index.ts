import prisma from "@/connection"
import { getUserService, updateProfileService } from "@/services/userService";
import { cloudinaryUpload } from "@/utils/cloudinary";
import { Request, Response, NextFunction } from "express"

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.body

        const resData = await getUserService({ id, role })
        
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
        
        let files, imagesUploaded;
        if(req.files) {
            files = Array.isArray(req.files) ? 
            req.files : req.files['images']
            
            const response: any = await cloudinaryUpload(files[0].buffer)
            const res: string = response?.res
            imagesUploaded = res
        }

        const resData = await updateProfileService({ username, phoneNumber, address, birthDate, gender, id, role, pic, companyName, imagesUploaded })
        
        res.status(200).json({
            error: false,
            message: 'Update profile success',
            data: resData
        })
    } catch (error) {
        next(error)
    }
}

export const getUserTransactionList = async(req: Request, res: Response, next: NextFunction) => {
    try {
        
        const { id, role } = req.body
        const { status } = req.query
        if(role === 'EO') throw { msg: 'Unauthorized!', status: 401 }
        
        let tickets;
        tickets = await prisma.transaction.findMany({
            where: {
                userId: id,
            },
            include: {
                details: {
                    include: {
                        tickets: {
                            include: {
                                events: true
                            }
                        }
                    }
                }
            }
        })
        
        if(status) {
            tickets = await prisma.transaction.findMany({
                where: {
                    userId: id,
                    status: status as any
                },
                include: {
                    details: {
                        include: {
                            tickets: {
                                include: {
                                    events: true
                                }
                            }
                        }
                    }
                }
            })
        }
        res.status(200).json({
            error: false,
            message: 'Get transactions user success',
            data: tickets
        })
    } catch (error) {
        next(error)
    }
}