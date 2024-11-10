'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useMutation } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import Link from 'next/link'
import { MdOutlineEmail } from "react-icons/md";
import { IoKey } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { registerValidationSchema } from '@/features/auth/register/schemas/registerValidationSchema'
import { IoMdPricetag } from "react-icons/io";

export default function RegisterPage() {
    interface IValues {
        username: string,
        email: string,
        password: string,
        referralCode?: string,
    }

    const { mutate: mutateRegister, isPending: isPendingMutateRegister } = useMutation({
        mutationFn: async(values: IValues) => {
            return await instance.post('/auth/register', {
                username: values?.username,
                email: values?.email,
                password: values?.password,
                refferalCode: values?.referralCode,
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
            <h1 className='text-5xl font-bold text-center'>Create account</h1>
            <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                refferalCode: ''
            }}
            validationSchema={registerValidationSchema}
            onSubmit={(values) => {
                mutateRegister(values)
            }}
            >
                <Form className='flex flex-col gap-2 mt-5'>
                    <label className="input input-bordered flex flex-col items-start p-2 h-fit">
                        <p className='text-sm flex items-center text-gray-300'>Username<span className='text-red-500'>*</span> <IoMdPerson size={15} className='text-gray-300 ml-2'/></p>
                        <section className='flex justify-between items-center w-full'>
                            <Field name="username" type="text"/>
                        </section>
                    </label>
                    <ErrorMessage name='username' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
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
                    <label className="input input-bordered flex flex-col items-start p-2 h-fit">
                        <p className='text-sm flex gap-2 items-center text-gray-300'>Referral Code <IoMdPricetag size={15} className='text-gray-300'/></p>
                        <section className='flex justify-between items-center w-full'>
                            <Field name="referralCode" type="text"/>
                        </section>
                    </label>
                    <button className='p-3 mt-2 bg-yellow-400 hover:bg-yellow-200 hover:text-gray-600 transition-[0.5s] text-black font-bold text-sm rounded-md' disabled={isPendingMutateRegister} type='submit'>Register</button>
                </Form>
            </Formik>
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
