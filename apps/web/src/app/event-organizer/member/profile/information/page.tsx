'use client'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Input } from '@/components/ui/input'
import { useMutation, useQuery } from "@tanstack/react-query"
import instance from "@/util/axiosInstance"
import { updateProfileEOValidationSchema } from "@/features/event-organizer/member/profile/information/updateProfileEOValidationSchema"
import toast from "react-hot-toast"
import Image from "next/image"

const EOMemberProfileInformationPage = () => {
  const [imagePreview, setImagePreview] = useState('')

  const [ dataValues, setDataValues ] = useState<any>({})
  const { data: dataProfile } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: async() => {
      let res = await instance.get('/user')
      return res.data.data
    }
  })

  const { mutate: mutateUpdateEO, isPending: isPendingUpdateEO } = useMutation({
    mutationFn: async(fd: FormData) => {
      const res = await instance.patch('/user', fd)
      return res
    },
    onSuccess: (res) => {
      toast.success('Update profile success')
    },
    onError: (err) => {
      toast.error('Update profile failed!')
    }
  })

  if(dataProfile === undefined) {
    return(
      <main className='flex flex-col gap-1 h-screen w-full items-center justify-center'>
        <span className="loading loading-bars loading-lg"></span>
      </main>
    )
  }

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
        User Information
      </h1>
      <Formik
      initialValues={{
        file: [] as File[],
        email: dataProfile?.email || '',
        pic: dataProfile?.pic || '',
        phoneNumber: dataProfile?.phoneNumber || '',
        address: dataProfile?.address || '',
      }}
      validationSchema={updateProfileEOValidationSchema}
      onSubmit={(values) => {
        console.log(values)
        const fd = new FormData()
        fd.append('email', values.email)
        fd.append('pic', values.pic)
        fd.append('address', values.address)
        fd.append('phoneNumber', values.phoneNumber)
        fd.append('images', values.file[0])
        mutateUpdateEO(fd)
      }}
      >
          {
            ({setFieldValue}) => (
            <Form>
            <section id='user-information' className='flex flex-col gap-10 text-[15px] xl:px-12 px-4'>
              <section className='flex flex-col items-center gap-3 xl:px-10 px-2'>
                <figure className='flex items-center justify-center overflow-hidden h-[200px] w-full rounded-2xl bg-gray-200 border border-yellow-400'>
                  {
                    imagePreview.length > 0 ? (
                      <Image 
                      src={imagePreview}
                      alt='profile_image_preview'
                      width={1000}
                      height={1000}
                      className='object-cover w-full h-full'
                      />
                    ) : (
                      <h1 className='text-5xl font-bold text-gray-300'>Preview Image</h1>
                    )
                  }

                </figure>
                <Input name='file' type='file'
                onChange={
                  (e: any) => {
                    setFieldValue('file', Array.from(e.currentTarget.files || []))
                    if(e.currentTarget.files && e.currentTarget.files[0])
                      setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                  }/>
                <ErrorMessage name='file' component={'div'} className="text-red-600 text-xs text-left"/>
              </section>
              <section  className='flex flex-col gap-10'>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Company Email<span className="text-red-600 ml-2">*</span></h1>
                  <Field name='email' as={Input} className='py-7' type="email" disabled/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Person in Charge<span className="text-red-600 ml-2">*</span></h1>
                  <Field name='pic' as={Input} className='py-7' type="text"/>
                  <ErrorMessage name='pic' component={'div'} className="text-red-600 text-xs"/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Company Phone Number<span className="text-red-600 ml-2">*</span></h1>
                  <Field name='phoneNumber' as={Input} className='py-7' type="text"/>
                  <ErrorMessage name='phoneNumber' component={'div'} className="text-red-600 text-xs"/>
                </section> 
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Address<span className="text-red-600 ml-2">*</span></h1>
                  <Field name='address' as={Input} className='py-7' type="text"/>
                  <ErrorMessage name='address' component={'div'} className="text-red-600 text-xs"/>
                </section>
              </section>
              <button onClick={() => console.log('aaaaaaaaaaa')} type="submit" className="btn bg-blue-600 hover:bg-blue-400 text-white">Update Changes</button>
            </section>
            </Form>
            )
          }
      </Formik>
    </main>
  )
}

export default EOMemberProfileInformationPage