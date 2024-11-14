import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username must be filled!').max(100, 'Maximum 100 characters allowed!'),
    email: Yup.string().email('Email address invalid!').required('Email address must be filled!'),
    password: Yup.string().required('Password must be filled!').min(8, 'Minimum 8 characters required!'),
})