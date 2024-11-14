'use client'

import { AxiosError } from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import useLoginApi from '../api/useLoginApi'
import authStore from '@/zustand/authStore'
import { useRouter } from 'next/navigation'

const useLoginHook = (role: string, endPoint: string) => {
  const router = useRouter()
  const setAuth = authStore(state => state.setAuth)

  const onSuccess = (res: any) => {
    setAuth({ 
      role: res.data?.role,
      username: res.data?.username,
      token: res.data?.token,
      isVerified: res.data?.isVerified,
      isGoogleRegistered: res.data?.isGoogleRegistered,
    })
    setTimeout(() => {
      router.push('/')
      toast.success(res.message)
    }, 500)
    }

  const onError = (err: any) => {
    toast.error(err?.response?.data?.message)
  }

  const {
    mutateLogin,
    isPendingMutateLogin
  } = useLoginApi({onSuccess, onError}, role, endPoint)
  
    return {
        mutateLogin,
        isPendingMutateLogin
    }
}

export default useLoginHook
