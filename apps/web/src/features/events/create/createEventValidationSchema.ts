import * as Yup from 'yup'

export const createEventValidationSchema = Yup.object().shape({
    file: Yup.array().of(
        Yup.mixed<File>().required('Minimum 1 file included!')
        .test('fileSize', 'Maximum 2MB file size allowed!', file => {
            const limitFileSize = 2000000
            return file && file.size <= limitFileSize
        })
        .test('fileFormat', 'File format not allowed!', file => {
            const fileFormatAccepted = ['jpg', 'jpeg', 'png', 'webp']
            return file && fileFormatAccepted.includes(file.type.split('/')[1])
        })
    ).min(1, 'Minimum 1 file included!').max(7, 'Maximum 7 file allowed!'),
    name: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    isPaid: Yup.string().required('Field must be filled!'),
    categoryId: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    type: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    url: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(185, 'Maximum 185 character allowed!'),
    locationName: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    location: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    startDate: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    endDate: Yup.string().required('Field must be filled!').min(1, 'Minimum 1 character required!').max(180, 'Maximum 180 character allowed!'),
    capacity: Yup.string().required('Field must be filled!'),
})