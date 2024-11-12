import * as Yup from 'yup'

export const reviewValidationSchema = Yup.object().shape({
    comments: Yup.string(),
    feedback: Yup.string(),
    rating: Yup.number().min(1, 'Minimum rating is 1').max(10, 'Maximum rating is 10').required('Field must be filled!')
})