import * as Yup from 'yup'

export const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email address invalid!').required('Email must be filled!')
})