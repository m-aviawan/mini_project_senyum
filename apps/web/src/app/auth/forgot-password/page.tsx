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
import { emailValidationSchema } from '@/features/auth/forget-password/schemas/emailValidationSchema'
import { AxiosError } from 'axios'

const ForgotPasswordPage = () => {
    interface IValuesMutateForgotPassword {
        email: string
    }

    const router = useRouter()
    
    const { mutate: mutateForgotPassword, isPending: isPendingForgotPassword } = useMutation({
    mutationFn: async(values: IValuesMutateForgotPassword) => {
        return await instance.post('/auth/forgot-password', {
            email: values?.email
        })
    },
    onSuccess: (res) => {
        setTimeout(() => {
            router.push('/auth')
            toast.success('Send email success')
        }, 500)
    },
    onError: (err: any) => {
        toast.error(err?.response?.data?.message)
    }
    })

  return (
    <main className='flex flex-col gap-10 justify-center items-center p-8'>
        <hgroup className='flex flex-col gap-2 items-center'>
            <h1 className='text-3xl text-center lg:text-4xl xl:text-5xl font-bold'>Forgot Password?</h1>
            <p className='md:text-md text-center text-lg font-light'>Enter your email address and we'll send you a link to create a new password.</p>
        </hgroup>
        <Formik
        initialValues={{
            email: ''
        }}
        validationSchema={emailValidationSchema}
        onSubmit={(values) => {
            mutateForgotPassword(values)
        }}
        >
            {
                ({setFieldValue}) => (
                    <Form className='w-full flex justify-center'>
                         <div className="flex flex-col items-center gap-2 justify-center w-full md:w-[70%]">
                            <div className="flex flex-col items-start w-full gap-1.5 justify-center">
                            <Input name='email' type="email" id="email" placeholder="Email" onChange={(e) => setFieldValue('email', e?.target?.value)}/>
                            <ErrorMessage component={'div'} name='email' className='pl-2 text-xs text-red-600'/>
                            </div>
                            <Button type='submit' className='w-full' disabled={isPendingForgotPassword}>Send an email</Button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </main>
  )
}

export default ForgotPasswordPage
