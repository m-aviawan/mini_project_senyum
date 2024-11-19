'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Formik, Form, ErrorMessage } from 'formik'
import { useMutation } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { resetPasswordValidationSchema } from '@/features/auth/forget-password copy/schemas/resetPasswordValidationSchema'

const ResetPasswordPage = ({params}: any) => {
    interface IValuesMutateResetPassword {
        password: string,
        confirmPassword: string,
    }

    const { token, countResetPass } = params

    const router = useRouter()

    const { mutate: mutateForgotPassword } = useMutation({
    mutationFn: async(values: IValuesMutateResetPassword) => {
        await instance.patch(`/auth/reset-password/${token}`, {
            password: values?.password,
            countResetPass
        })
    },
    onSuccess: (res) => {
        setTimeout(() => {
            router.push('/auth')
            toast.success('Reset password success')
        }, 500)
    },
    onError: (err) => {
        toast.error('Reset password failed!')
        console.log(err)
    }
    })

  return (
    <main className='flex flex-col gap-10 justify-center items-center p-8'>
        <hgroup className='flex flex-col gap-2 items-center'>
            <h1 className='text-3xl font-bold'>Reset Password</h1>
            <p className='text-lg font-light'>Enter your new password and keep your new password for sign in.</p>
        </hgroup>
        <Formik
        initialValues={{
            password: '',
            confirmPassword: ''
        }}
        validationSchema={resetPasswordValidationSchema}
        onSubmit={(values) => {
            mutateForgotPassword(values)
        }}
        >
            {
                ({setFieldValue}) => (
                    <Form className='w-full flex justify-center'>
                         <div className="flex flex-col items-center gap-2 justify-center w-[70%]">
                            <div className="flex flex-col items-start w-full gap-1.5 justify-center">
                                <Input name='password' type="password" id="password" placeholder="Password" onChange={(e) => setFieldValue('password', e?.target?.value)}/>
                                <ErrorMessage component={'div'} name='password' className='pl-2 text-xs text-red-600'/>
                            </div>
                            <div className="flex flex-col items-start w-full gap-1.5 justify-center">
                                <Input type="password" id="confirmPassword" placeholder="Confirm Password" onChange={(e) => setFieldValue('confirmPassword', e?.target?.value)}/>
                                <ErrorMessage component={'div'} name='confirmPassword' className='pl-2 text-xs text-red-600'/>
                            </div>
                            <Button className='w-full' type='submit' >Reset Password</Button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </main>
  )
}

export default ResetPasswordPage
