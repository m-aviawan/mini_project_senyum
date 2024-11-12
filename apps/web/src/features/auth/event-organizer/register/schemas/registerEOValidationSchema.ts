import * as Yup from 'yup'

export const registerEOValidationSchema = Yup.object().shape({
    companyName: Yup.string().required('Field must be filled!').max(100, 'Maximum 100 character allowed!'),
    pic: Yup.string().required('Field must be filled!').max(100, 'Maximum 100 character allowed!'),
    address: Yup.string().required('Field must be filled!').max(190, 'Maximum 190 character allowed!'),
    phoneNumber: Yup.string().required('Field must be filled!').max(20, 'Maximum 20 character allowed!'),
    email: Yup.string().email('Please enter a valid email address!').required('Field must be filled!'),
    password: Yup.string().required('Field must be filled!').min(8, 'Minimum 8 character required!').max(100, 'Maximum 100 character allowed!'),
})