'use client'

import React from 'react'
import { useMutation } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import { IResponseUseMutation, IValuesLoginUser } from '../types'
import authStore from '@/zustand/authStore'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


const useLoginApi = ({onSuccess, onError} : IResponseUseMutation, role: string, endPoint: string) => {
    const router = useRouter()
    const setAuth = authStore(state => state.setAuth)
    const { mutate: mutateLogin, isPending: isPendingMutateLogin  } = useMutation({
        mutationFn: async(values: IValuesLoginUser) => {
            let res = await instance.post(endPoint, {
                email: values!.email,
                password: values!.password,
                role
            })
            res = res.data
            return res
        },
        onSuccess,
        onError
    })
    return {
        mutateLogin,
        isPendingMutateLogin
  }
}

export default useLoginApi
