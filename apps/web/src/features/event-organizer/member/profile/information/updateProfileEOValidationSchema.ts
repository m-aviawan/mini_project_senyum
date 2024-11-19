import * as Yup from 'yup'

export const updateProfileEOValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email address invalid!'),
    pic: Yup.string().required('Field must be filled!'),
    phoneNumber: Yup.string().required('Field must be filled!'),
    address: Yup.string().required('Field must be filled!'),
    file: Yup.array().of(
        Yup.mixed<File>().test('fileSize', 'Maximum 2MB file size allowed!', file => {
            const limitFileSize = 2000000
            return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format must be png, jpg, or jpeg', file => {
            const fileFormatAccepted = ['jpg', 'jpeg', 'png']
            return file && fileFormatAccepted.includes(file.type.split('/')[1])
        })
    ) 
})