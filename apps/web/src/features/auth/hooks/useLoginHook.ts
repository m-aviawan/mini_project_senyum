'use client'

import { AxiosError } from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import useLoginApi from '../api/useLoginApi'

const useLoginHook = () => {
  const onSuccess = (res: any) => {
    toast.success('Login success!')
  }

  const onError = (err: AxiosError) => {
    toast.error('Login failed!')
  }

  const {
    mutateLogin
  } = useLoginApi( onSuccess, onError )
  
    return {
        mutateLogin
    }
}

export default useLoginHook
