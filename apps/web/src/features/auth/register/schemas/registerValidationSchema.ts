import * as Yup from 'yup'

export const registerValidationSchema = Yup.object().shape({
    username: Yup.string().required('Username must be filled!'),
    email: Yup.string().email('Please enter a valid email address!').required('Email address must be filled!'),
    password: Yup.string().required('Password must be filled!'),
})