import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email address invalid!').required('Email address must be filled!'),
    password: Yup.string().required('Password must be filled!').min(8, 'Minimum 8 characters required!'),
})