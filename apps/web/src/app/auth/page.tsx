'use client'

import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import Link from 'next/link'
import { loginValidationSchema } from '@/features/auth/schemas/loginValidationSchema'
import { FcGoogle } from "react-icons/fc";
import authStore from '@/zustand/authStore'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import useLoginHook from '@/features/auth/hooks/useLoginHook'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import { auth } from '@/firebase'
import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
import instance from '@/util/axiosInstance'

export default function AuthPage() {
    const provider = new GoogleAuthProvider()
    const setAuth = authStore((state) => state.setAuth)
    const router = useRouter()

    const {
        mutateLogin,
        isPendingMutateLogin
    } = useLoginHook('CUSTOMER', '/auth')

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
  return (
    <main className='bg-white gap-2 h-screen flex justify-center items-center'>
        <section className='flex flex-col gap-3 px-8 sm:px-16 md:px-24 py-5 w-full md:w-[70%]'>
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
                                <button className='p-3 mt-2 bg-yellow-400 hover:bg-yellow-200 hover:text-gray-600 transition-[0.5s] text-black font-bold text-sm rounded-md' type='submit'>Log in</button>
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
                    <Link href='/auth/forgot-password'><span className='text-red-600 hover:underline transition-[0.5s] hover:font-bold'>Forgot password</span></Link>
                </article>
            </section>
            <div className='flex items-center justify-center my-5'>
                <div className='h-[0.5px] bg-gray-300 w-full'></div>
                <div className='border border-gray-300 rounded-badge text-sm px-7 py-1 text-gray-600'>or</div>
                <div className='h-[0.5px] bg-gray-300 w-full'></div>
            </div>
            <section className='flex flex-col gap-1'>
                <button onClick={() => {mutateOAuth()}} className='p-3 hover:bg-gray-300 transition-[0.5s] rounded-md border border-gray-300 w-full text-sm flex items-center justify-center font-bold gap-3'><FcGoogle size={20}/>Sign in with Google</button>
            </section>
        </section>
    </main>
  )
}
