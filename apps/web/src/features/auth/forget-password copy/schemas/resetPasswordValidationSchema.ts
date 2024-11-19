import * as Yup from 'yup'

export const resetPasswordValidationSchema = Yup.object().shape({
    password: Yup.string().required('Field must be filled!').min(8, 'Minimum 8 characters required!'),
    confirmPassword: Yup.string().required('Field must be filled!').min(8, 'Minimum 8 characters required!').oneOf([Yup.ref('password'), '' ], 'Confirm password invalid!'),
})