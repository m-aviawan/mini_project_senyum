'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useMutation } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import Link from 'next/link'
import { loginValidationSchema } from '@/features/auth/schemas/loginValidationSchema'
import { MdOutlineEmail } from "react-icons/md";
import { IoKey } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";


export default function AuthPage() {
    interface IValues {
        email: string,
        password: string,
    }

    const { mutate: mutateLogin, isPending: isPendingMutateLogin } = useMutation({
        mutationFn: async(values: IValues) => {
            return await instance.post('/auth', {
                email: values?.email,
                password: values?.password,
            })
        },
        onSuccess: (res) => {
            console.log(res)
        }, 
        onError: (err) => {
            console.log(err)
        }
    })

  return (
    <main className='grid grid-cols-2 bg-white gap-2 h-screen'>
        <section className='bg-yellow-400'>

        </section>
        <section className='flex flex-col gap-3 px-24 py-5'>
            <h1 className='text-5xl font-bold text-center'>Log in</h1>
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
                <Form className='flex flex-col gap-2 mt-5'>
                    <label className="input input-bordered flex flex-col items-start p-2 h-fit">
                        <p className='text-sm flex items-center text-gray-300'>Email<span className='text-red-500'>*</span> <MdOutlineEmail size={15} className='text-gray-300 ml-2'/></p>
                        <section className='flex justify-between items-center w-full'>
                            <Field name="email" type="email"/>
                        </section>
                    </label>
                    <ErrorMessage name='email' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                    <label className="input input-bordered flex flex-col items-start p-2 h-fit">
                        <p className='text-sm flex items-center text-gray-300'>Password<span className='text-red-500'>*</span> <IoKey size={15} className='text-gray-300 ml-2'/></p>
                        <section className='flex justify-between items-center w-full'>
                            <Field name="password" type="password"/>
                        </section>
                    </label>
                    <ErrorMessage name='password' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                    <button className='p-3 mt-2 bg-yellow-400 hover:bg-yellow-200 hover:text-gray-600 transition-[0.5s] text-black font-bold text-sm rounded-md' disabled={isPendingMutateLogin} type='submit'>Log in</button>
                </Form>
            </Formik>
            <article className='text-[12px] mt-[-8px]'>
                Don't have account? Please <Link href='/auth/register'><span className='text-blue-600 hover:text-blue-800 font-bold'>Sign up</span></Link>
            </article>
            <div className='flex items-center justify-center my-5'>
                <div className='h-[0.5px] bg-gray-300 w-full'></div>
                <div className='border border-gray-300 rounded-badge text-sm px-7 py-1 text-gray-600'>or</div>
                <div className='h-[0.5px] bg-gray-300 w-full'></div>
            </div>
            <section className='flex flex-col gap-1'>
                <button className='p-3 hover:bg-gray-300 transition-[0.5s] rounded-md border border-gray-300 w-full text-sm flex items-center justify-center font-bold gap-3'><FcGoogle size={20}/>Sign in with Google</button>
                <button className='p-3 hover:bg-gray-300 transition-[0.5s] rounded-md border border-gray-300 w-full text-sm flex items-center justify-center font-bold gap-3'><FaFacebook size={20} className='text-blue-600'/>Sign in with Facebook</button>
            </section>
        </section>
    </main>
  )
}
