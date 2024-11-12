import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address!').required('Email address must be filled!'),
    password: Yup.string().required('Password must be filled!'),
})