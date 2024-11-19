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
import { IoMdPricetag } from "react-icons/io";
import toast from 'react-hot-toast'
import authStore from '@/zustand/authStore'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { MdHome } from "react-icons/md";
import { registerEOValidationSchema } from '@/features/auth/event-organizer/register/schemas/registerEOValidationSchema'

export default function EventOrganizerRegisterPage() {
    const setAuth = authStore(state => state.setAuth)
    const router = useRouter()

    interface IValues {
        companyName: string,
        email: string,
        password: string,
        address: string,
        phoneNumber: string,
        pic: string,
    }

    const { mutate: mutateRegisterEO, isPending: isPendingMutateRegisterEO } = useMutation({
        mutationFn: async(values: IValues) => {
            return await instance.post('/auth/register/event-organizer', {
                companyName: values?.companyName,
                email: values?.email,
                password: values?.password,
                address: values?.address,
                phoneNumber: values?.phoneNumber,
                pic: values?.pic,
            })
        },
        onSuccess: (res: any) => {
            setAuth({ 
                role: res?.data?.data?.role,
                username: res?.data?.data?.companyName,
                token: res?.data?.data?.token,
                isVerified: res?.data?.data?.isVerified,
                isGoogleRegistered: res?.data?.data?.isGoogleRegistered,
                profilePictureUrl: res?.data?.data?.profilePictureUrl,
            })
            toast.success('Create account success! Check email to verify')
            setTimeout(() => {
                router.push('/')
            }, 2000)
        },
        onError: (err:any) => {
            toast.error(err?.response?.data?.message)
        }
    })

  return (
    <main className='bg-white gap-2 h-fit flex justify-center items-center'>
        <section className='flex flex-col gap-3 px-8 sm:px-16 md:px-24 py-5 w-full md:w-[70%]'>
            <h1 className='text-3xl flex flex-col gap-2 font-bold text-center'>Create Account <span>Event Organizer</span></h1>
            <Formik
            initialValues={{
                companyName: '',
                email: '',
                password: '',
                phoneNumber: '',
                pic: '',
                address: ''
            }}
            validationSchema={registerEOValidationSchema}
            onSubmit={(values) => {
                mutateRegisterEO(values)
            }}
            >
                {
                    ({setFieldValue}) => (
                    <Form className='flex flex-col gap-2 mt-5'>
                        <Input name='companyName' type="text" placeholder="Company Name" onChange={(e) => setFieldValue('companyName', e.target.value)}/>
                        <ErrorMessage name='companyName' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='pic' type="text" placeholder="Person in Charge" onChange={(e) => setFieldValue('pic', e.target.value)}/>
                        <ErrorMessage name='pic' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='email' type="email" placeholder="Email" onChange={(e) => setFieldValue('email', e.target.value)}/>
                        <ErrorMessage name='email' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='password' type="password" placeholder="Password" onChange={(e) => setFieldValue('password', e.target.value)}/>
                        <ErrorMessage name='password' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='phoneNumber' type="text" placeholder="Phone Number" onChange={(e) => setFieldValue('phoneNumber', e.target.value)}/>
                        <ErrorMessage name='phoneNumber' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='address' type="text" placeholder="Address" onChange={(e) => setFieldValue('address', e.target.value)}/>
                        <ErrorMessage name='address' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <button className='p-3 mt-2 text-yellow-400 font-bold bg-black hover:bg-gray-700 hover:text-yellow-200 transition-[0.5s]font-bold text-sm rounded-md' type='submit'>Register</button>
                    </Form>
                    )
                }
            </Formik>
            <article className='text-[12px] mt-[-8px]'>
                Have account? Please <Link href='/auth/event-organizer'><span className='text-blue-600 hover:text-blue-800 font-bold'>Sign in</span></Link>
            </article>
        </section>
    </main>
  )
}
