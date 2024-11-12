'use client'

import React from 'react'
import { useMutation } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import { IValuesLoginUser } from '../types'
import authStore from '@/zustand/authStore'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const useLoginApi = (onSuccess: any, onError: any) => {
    const router = useRouter()
    const setAuth = authStore(state => state.setAuth)
    const { mutate: mutateLogin, isPending: isPendingMutateLogin  } = useMutation({
        mutationFn: async(values: IValuesLoginUser) => {
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
    return {
        mutateLogin
  }
}

export default useLoginApi
