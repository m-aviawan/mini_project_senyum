import * as Yup from 'yup'

export const updateProfileUserValidationSchema = Yup.object().shape({
    username: Yup.string().required('Field must be filled!'),
    phoneNumber: Yup.string().required('Field must be filled!'),
    address: Yup.string().required('Field must be filled!'),
    birthDate: Yup.string().required('Field must be filled!'),
    gender: Yup.string().required('Field must be filled!'),
    file: Yup.array().of(
        Yup.mixed<File>().test('fileSize', 'Maximum 2MB file size allowed!', file => {
            const limitFileSize = 2000000
            return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format must be png, jpg, or jpeg', file => {
            const fileFormatAccepted = ['jpg', 'jpeg', 'png']
            return file && fileFormatAccepted.includes(file.type.split('/')[1])
        })
    ).min(1, 'Image must included!') 
})