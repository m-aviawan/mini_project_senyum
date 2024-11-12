import fs from 'fs'

export const deleteImages = ({uploadedImages}: any) => {
    uploadedImages?.images.forEach((item: any) => {
        return fs.rmSync(`${item.destination}/${item.filename}`)
    })   
}