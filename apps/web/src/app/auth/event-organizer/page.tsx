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

export default function EventOrganizerAuthPage() {
    interface IValues {
        email: string,
        password: string,
    }

    const setAuth = authStore((state) => state.setAuth)
    const token = authStore((state) => state.token)
    const router = useRouter()

    const { mutate: mutateLoginEO, isPending: isPendingMutateLoginEO  } = useMutation({
        mutationFn: async(values: IValues) => {
            let res = await instance.post('/auth', {
                email: values!.email,
                password: values!.password,
                role: 'EO'
            })
            res = res.data
            return res
        },
        onSuccess: (res: any) => {
            setAuth({ 
                role: res.data.role,
                username: res.data.username,
                token: res.data.token,
                isVerified: res.data.isVerified,
                isGoogleRegistered: res.data.isGoogleRegistered,
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
            <h1 className='text-5xl font-bold text-center'>Log in <span className='mx-1 text-lg font-normal'>as</span> Event Organizer</h1>
            <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => {
                mutateLoginEO(values)
            }}
            >
                {
                    ({setFieldValue}) => (
                    <Form className='flex flex-col gap-2 mt-5' method='post'>
                        <Input name='email' type="email" placeholder="Email" onChange={(e) => setFieldValue('email', e.target.value)}/>
                        <ErrorMessage name='email' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <Input name='password' type="password" placeholder="Password" onChange={(e) => setFieldValue('password', e.target.value)}/>
                        <ErrorMessage name='password' component={'div'} className='text-red-600 text-[10px] ml-2 mt-[-6px]'/>
                        <button className='p-3 mt-2 text-yellow-400 font-bold bg-black hover:bg-gray-700 hover:text-yellow-200 transition-[0.5s]font-bold text-sm rounded-md' disabled={isPendingMutateLoginEO} type='submit'>Log in</button>
                    </Form>
                    )
                }
            </Formik>
            <article className='text-[12px] mt-[-8px]'>
                Don't have account? Please <Link href='/auth/event-organizer/register'><span className='text-blue-600 hover:text-blue-800 font-bold'>Sign up</span></Link>
            </article>
        </section>
    </main>
  )
}
