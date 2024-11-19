'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useMutation } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import Link from 'next/link'
import { loginValidationSchema } from '@/features/auth/schemas/loginValidationSchema'
import toast from 'react-hot-toast'
import authStore from '@/zustand/authStore'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { MdHome } from "react-icons/md";
import useLoginHook from '@/features/auth/hooks/useLoginHook'

export default function EventOrganizerAuthPage() {
    const {
        mutateLogin,
        isPendingMutateLogin
    } = useLoginHook('EO', '/auth')

  return (
    <main className='bg-white gap-2 flex justify-center items-center'>
        <section className='flex flex-col gap-3 px-8 sm:px-16 md:px-24 py-5 w-full md:w-[70%]'>
            <h1 className='text-3xl flex flex-col gap-2 font-bold text-center'>Log in <span>Event Organizer</span></h1>
            <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
                mutateLogin(values)
            }}
            >
                {
                    ({setFieldValue}) => (
                    <Form className='flex flex-col gap-2 mt-5' method='post'>
                        <Input name='email' type="email" placeholder="Email" onChange={(e) => setFieldValue('email', e.target.value)}/>
                        <ErrorMessage name='email' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='password' type="password" placeholder="Password" onChange={(e) => setFieldValue('password', e.target.value)}/>
                        <ErrorMessage name='password' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        {
                            isPendingMutateLogin ? (
                                <button className='p-3 mt-2 bg-gray-400 text-white font-bold text-sm rounded-md' disabled>Log in</button>
                            ) : (
                                <button className='p-3 mt-2 bg-black hover:bg-gray-700 hover:text-yellow-200 transition-[0.5s] text-yellow-400 font-bold text-sm rounded-md' type='submit'>Log in</button>
                            )
                        }    
                    </Form>
                    )
                }
            </Formik>
            <section className='flex justify-between'>
                <article className='text-[12px] mt-[-8px]'>
                    Don't have account? Please <Link href='/auth/register'><span className='text-blue-600 hover:text-blue-800 font-bold'>Sign up</span></Link>
                </article>
                <article className='text-[12px] mt-[-8px]'>
                    <Link href='/auth/forgot-password'><span className='text-blue-600 hover:underline transition-[0.5s] hover:font-blue-800 hover:font-bold text-right'>Forgot password</span></Link>
                </article>
            </section>
        </section>
    </main>
  )
}
