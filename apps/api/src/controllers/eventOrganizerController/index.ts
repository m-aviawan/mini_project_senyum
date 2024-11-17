import { Request, Response, NextFunction } from "express";
import prisma from "@/connection/prisma";
import { deleteImages } from "@/utils/deleteImages";

export const updateProfileEO = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, email, pic, phoneNumber, address } = req.body
        const uploadedImages: any = req.files

        let createImage;
        if(!Array.isArray(req?.files) && !req?.files?.images?.length) {
            throw { msg: 'File not found!' }
        } else {
            createImage = {
                imageUrl: uploadedImages!.images[0].filename,
                directory: uploadedImages!.images[0].destination,
            }
        }

        const updatedEO = await prisma.eventOrganizer.update({
            where: {
                id, email
            },
            data: {
                pic,
                phoneNumber,
                address,
                profilePictureUrl: createImage.imageUrl,
            }
        })

        res.status(200).json({
            error: false,
            message: 'Update event organizer profile success',
            data: {
                pic,
                phoneNumber,
                address,
                profilePictureUrl: createImage.imageUrl,
                profilePictureDirectory: createImage.directory
            }
        })
    } catch (error) {
        deleteImages({ uploadedImages: req.files })
        next(error)
    }
}