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
import toast from 'react-hot-toast'
import authStore from '@/zustand/authStore'
import axios from 'axios'
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import { MdHome } from "react-icons/md";
import supabase from '@/supabase'

export default function AuthPage() {
    interface IValues {
        email: string,
        password: string,
    }

    const setAuth = authStore((state) => state.setAuth)
    const router = useRouter()

    const signInWithGoogle = async() => {
       const { data , error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            queryParams: {
                access_type: "offline",
                prompt: 'consent'
            }
        }
       })
       
       if(error) toast.error('Sign in with Google failed!')
    }



    const { mutate: mutateLogin, isPending: isPendingMutateLogin  } = useMutation({
        mutationFn: async(values: IValues) => {
            let res = await instance.post('/auth', {
                email: values!.email,
                password: values!.password,
                role: 'CUSTOMER'
            })
            res = res.data
            return res
        },
        onSuccess: (res: any) => {
            setAuth({ 
                role: res.data?.role,
                username: res.data?.username,
                token: res.data?.token,
                isVerified: res.data?.isVerified,
                isGoogleRegistered: res.data?.isGoogleRegistered,
            })
            toast.success(res.message)
            setTimeout(() => {
                router.push('/')
            }, 2000)
        },
        onError: (err:any) => {
            toast.error(err?.response?.data?.message)
        }
    })

  return (
    <main className='bg-white gap-2 h-screen flex justify-center items-center'>
        <section className='flex flex-col gap-3 px-24 py-5 w-[70%]'>
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
                        <button className='p-3 mt-2 bg-yellow-400 hover:bg-yellow-200 hover:text-gray-600 transition-[0.5s] text-black font-bold text-sm rounded-md' disabled={isPendingMutateLogin} type='submit'>Log in</button>
                    </Form>
                    )
                }
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
                <button onClick={signInWithGoogle} className='p-3 hover:bg-gray-300 transition-[0.5s] rounded-md border border-gray-300 w-full text-sm flex items-center justify-center font-bold gap-3'><FcGoogle size={20}/>Sign in with Google</button>
            </section>
        </section>
    </main>
  )
}
