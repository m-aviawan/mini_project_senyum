'use client'
import React from "react"
import { useQuery } from "@tanstack/react-query"
import instance from "@/util/axiosInstance"
import authStore from "@/zustand/authStore"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function VerifyRegisterPage ({ params }: any) {
    const setLogOut = authStore(state => state.setLogOut)
    const router = useRouter()
    const { isSuccess: isSuccessVerifyRegister, isError: isErrorVerifyRegister } = useQuery({
        queryKey: ['verifyRegister'],
        queryFn: async() => {
            const res = await instance.patch(`/auth/${params.token}`)
            setLogOut()
            return res.data.data
        }
    })

    if(isSuccessVerifyRegister) {
        toast.success('Verify Register Success! Please login')
        setTimeout(() => {
            router.push('/auth')
        }, 1500)
    } else if( isErrorVerifyRegister ) {
        router.push('/')
        setTimeout(() => {
            toast.error('Verify Register Failed!')
        }, 1000)
    }

    return (
        <main className='fixed top-0 flex flex-col gap-1 h-screen w-full items-center justify-center'>
            <span className="loading loading-bars loading-lg"></span>
        </main>
    )
}