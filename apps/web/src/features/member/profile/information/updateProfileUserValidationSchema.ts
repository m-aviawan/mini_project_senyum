import * as Yup from 'yup'

export const updateProfileUserValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email address invalid!'),
    username: Yup.string().required('Field must be filled!'),
    phoneNumber: Yup.string(),
    address: Yup.string(),
    birthDate: Yup.string(),
    gender: Yup.string()
})