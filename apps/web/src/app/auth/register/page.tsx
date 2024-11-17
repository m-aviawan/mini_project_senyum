'use client'

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useMutation, useQuery } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import Link from 'next/link'
import { MdOutlineEmail } from "react-icons/md";
import { IoKey } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { registerValidationSchema } from '@/features/auth/register/schemas/registerValidationSchema'
import { IoMdPricetag } from "react-icons/io";
import toast from 'react-hot-toast'
import authStore from '@/zustand/authStore'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { MdHome } from "react-icons/md";
import supabase from '@/supabase'
import { auth } from '@/firebase'
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'

export default function RegisterPage() {
    const provider = new GoogleAuthProvider()
    const setAuth = authStore(state => state.setAuth)
    const setKeepAuth = authStore(state => state.setKeepAuth)
    const router = useRouter()
    interface IValues {
        username: string,   
        email: string,
        password: string,
        referralCode?: string,
    }
    const { mutate: mutateReqOAuth } = useMutation({
        mutationFn: async(email: string) => {
            const res = await instance.post('/auth/o-auth', {
                email
            })
            return res
        }, onSuccess: (res) => {
            setAuth({
                isGoogleRegistered: res?.data?.data?.isGoogleRegistered,
                isVerified: res?.data?.data?.isVerified,
                role: res?.data?.data?.role,
                token: res?.data?.data?.token,
                username: res?.data?.data?.username,
                profilePictureUrl: res?.data?.data?.profilePictureUrl,
            })
            toast.success('Authentication with Google success')
            setTimeout(() => {
                router.push('/')
            }, 1500)
        }, onError: () => {
            toast.error('Authentication with Google failed!')
        }
    })

    const { mutate: mutateOAuth } = useMutation({
        mutationFn: async() => {
            const firebase = await signInWithPopup(auth, provider)
            return firebase
        },
        onSuccess: async(res) => {
            mutateReqOAuth( res?.user?.email as string )
        },
        onError: (err) => {
            toast.error('Authentication with Google failed!')
        }
    })

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
            setAuth({ 
                role: res.data?.data?.role,
                username: res.data?.data?.username,
                token: res.data?.data?.token,
                isVerified: res.data?.data?.isVerified,
                isGoogleRegistered: res.data?.data?.isGoogleRegistered,
            })
            toast.success('Create account success! Check email to verify')
            setTimeout(() => {
                router.push('/')
            }, 1500)
        }, 
        onError: (err: any) => {
            toast.error('Register failed!')
        }
    })

  return (
    <main className='bg-white gap-2 h-screen flex justify-center items-center'>
        <section className='flex flex-col gap-3 px-8 sm:px-16 md:px-24 py-5 w-full md:w-[70%]'>
            <h1 className='text-black hover:text-gray-700 text-5xl font-bold text-center'>Create account</h1>
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
                {
                    ({setFieldValue}) => (
                    <Form className='flex flex-col gap-2 mt-5'>
                        <Input name='username' type="text" placeholder="Username *" onChange={(e) => setFieldValue('username', e.target.value)}/>
                        <ErrorMessage name='username' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='email' type="email" placeholder="Email *" onChange={(e) => setFieldValue('email', e.target.value)}/>
                        <ErrorMessage name='email' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='password' type="password" placeholder="Password *" onChange={(e) => setFieldValue('password', e.target.value)}/>
                        <ErrorMessage name='password' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='referralCode' type="text" placeholder="Referral Code" onChange={(e) => setFieldValue('referralCode', e.target.value)}/>
                        <button className='p-3 mt-2 bg-yellow-400 hover:bg-yellow-200 hover:text-gray-600 transition-[0.5s] text-black font-bold text-sm rounded-md' disabled={isPendingMutateRegister} type='submit'>Register</button>
                    </Form>
                    )
                }
            </Formik>
            <article className='text-[12px] mt-[-8px]'>
                Have account? Please <Link href='/auth'><span className='text-blue-600 hover:text-blue-800 font-bold'>Sign in</span></Link>
            </article>
            <div className='flex items-center justify-center my-5'>
                <div className='h-[0.5px] bg-gray-300 w-full'></div>
                <div className='border border-gray-300 rounded-badge text-sm px-7 py-1 text-gray-600'>or</div>
                <div className='h-[0.5px] bg-gray-300 w-full'></div>
            </div>
            <section className='flex flex-col gap-1'>
                <button onClick={() => mutateOAuth()} className='p-3 hover:bg-gray-300 transition-[0.5s] rounded-md border border-gray-300 w-full text-sm flex items-center justify-center font-bold gap-3'><FcGoogle size={20}/>Sign up with Google</button>
            </section>
        </section>
    </main>
  )
}
