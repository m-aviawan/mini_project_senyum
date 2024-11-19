import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

const storage = multer.memoryStorage()

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const extensionAccepted = ['png', 'jpg', 'jpeg']
    const splittedOriginalName = file.originalname.split('.')
    if(!extensionAccepted.includes(splittedOriginalName[splittedOriginalName.length - 1])) {
        return callback(new Error('File extension not allowed!'))
    }

    return callback(null, true)
}

export const uploadMulter = multer({storage, fileFilter, limits: { fieldSize: 2000000 }})