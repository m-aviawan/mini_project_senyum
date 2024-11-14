import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback) => {
        callback(null, 'src/public/images')
    },
    filename: (req: Request, file: Express.Multer.File, callback) => {
        const splittedOriginalName = file.originalname.split('.')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        callback(null, file.fieldname + '-' + uniqueSuffix + '.' + splittedOriginalName[splittedOriginalName.length - 1])
    },
})

const fileFilter = (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
    const extensionAccepted = ['png', 'jpg', 'jpeg']
    const splittedOriginalName = file.originalname.split('.')
    if(!extensionAccepted.includes(splittedOriginalName[splittedOriginalName.length - 1])) {
        return callback(new Error('File extension not allowed!'))
    }

    return callback(null, true)
}

export const uploadMulter = multer({storage, fileFilter, limits: { fieldSize: 2000000 }})

