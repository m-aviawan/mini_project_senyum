'use client'

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import toast from "react-hot-toast"
import { Input } from '@/components/ui/input'
import Image from "next/image"
import { useMutation, useQuery } from "@tanstack/react-query"
import instance from "@/util/axiosInstance"
import { updateProfileUserValidationSchema } from "@/features/member/profile/information/updateProfileUserValidationSchema"
import authStore from "@/zustand/authStore"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation"
import { setTime } from "react-datepicker/dist/date_utils"

const MemberProfileInformationPage = () => {
  const token = authStore(state => state.token)
  const router= useRouter()
  const imageUrl: string = authStore(state => state.profilePictureUrl)
  const [ dataValues, setDataValues ] = useState<any>({})
  const [ imagePreview, setImagePreview ] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const { data: dataProfile, isError, error } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: async() => {
      let res = await instance.get('/user')
      const birthDate = res?.data?.data?.birthDate
      setStartDate(new Date(birthDate))
      return res.data.data
    }
  })
  
  

  interface IValues {
    username: string,
    address: string,
    birthDate: string,
    phoneNumber: string,
    gender: string
  }

  const { mutate: mutateUpdateUser, isPending: isPendingUpdateUser } = useMutation({
    mutationFn: async(fd: FormData) => {
      const res = await instance.patch('/user', fd)
      return res
    },
    onSuccess: (res) => {
      location.reload()
      setTimeout(() => {
        toast.success('Update profile success')
      }, 1000)
    },
    onError: (err) => {
      toast.error('Update profile failed!')
    },
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
        username: dataProfile?.username || '',
        phoneNumber: dataProfile?.phoneNumber || '',
        address: dataProfile?.address || '',
        birthDate: dataProfile?.birthDate?.split('T')[0] || '',
        gender: dataProfile?.gender || ''
      }}
      validationSchema={updateProfileUserValidationSchema}
      onSubmit={(values) => {
        const fd = new FormData()
        fd.append('birthDate', startDate.toISOString())
        fd.append('username', values?.username)
        fd.append('phoneNumber', values?.email)
        fd.append('address', values?.address)
        fd.append('gender', values?.gender)
        fd.append('images', values?.file[0])
        mutateUpdateUser(fd)
      }}
      >
          {
            ({setFieldValue}) => (
            <Form>
            <section id='user-information' className='flex flex-col gap-10 text-[15px] px-4 md:px-12'>
              <article className='flex flex-col gap-1'>
                <h1 className='text-gray-600 font-semibold'>Profile Picture</h1>
                <p className='text-gray-500'>Your avatar and cover photo are the first images you'll see on your profile account.</p>
              </article>
              <section className='flex flex-col md:flex-row items-center gap-12'>
                <figure className='flex items-center justify-center h-[120px] w-[120px] rounded-full bg-gray-200 border border-yellow-400 overflow-hidden'>
                {
                    imagePreview.length > 0 ? (
                      <Image 
                      src={imagePreview}
                      alt='profile_image_preview'
                      width={300}
                      height={300}
                      className='object-cover w-full h-full'
                      />
                    ) : (
                      <h1 className='text-md font-bold text-gray-300'>Preview Image</h1>
                    )
                  }
                </figure>
                <article className='flex flex-col gap-1'>
                  <h1 className='text-gray-600'>Avatar</h1>
                  <p className='text-gray-500'>Use a high-resolution image up to 2MB</p>
                  <ErrorMessage component={'div'} name='file' className="text-red-600 text-xs"/>
                </article>
              </section>
              <section>
              <Input name='file' type='file'
                onChange={
                  (e: any) => {
                    setFieldValue('file', Array.from(e.currentTarget.files || []))
                    if(e.currentTarget.files && e.currentTarget.files[0])
                      setImagePreview(URL.createObjectURL(e.target.files[0]))
                  }
                  }/>
              </section>
              <section  className='flex flex-col lg:grid grid-cols-2 gap-10'>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Email</h1>
                  <Field as={Input} name='email' type="email" disabled/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Name<span className="text-red-600 ml-2">*</span></h1>
                  <Field as={Input} type="text" name='username' />
                  <ErrorMessage component={'div'} name='username' className="text-red-600 text-xs"/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Phone Number<span className="text-red-600 ml-2">*</span></h1>
                  <Field as={Input} type="text" name='phoneNumber' />
                  <ErrorMessage component={'div'} name='phoneNumber' className="text-red-600 text-xs"/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Address<span className="text-red-600 ml-2">*</span></h1>
                  <Field as={Input} type="text" name='address' />
                  <ErrorMessage component={'div'} name='address' className="text-red-600 text-xs"/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Birth Date<span className="text-red-600 ml-2">*</span></h1>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date as Date)}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className="w-full px-2 py-3 rounded-lg border border-gray-300"
                  />
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Gender<span className="text-red-600 ml-2">*</span></h1>
                  <select name='gender' className="select select-bordered w-full" onChange={(e) => setFieldValue('gender', e.target.value)}>
                    <option disabled selected={!dataProfile?.gender}>Select a gender</option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                  </select>
                  <ErrorMessage component={'div'} name='gender' className="text-red-600 text-xs"/>
                </section>
              </section>
              <Button type='submit' disabled={isPendingUpdateUser} className="btn bg-blue-600 hover:bg-blue-400 text-white">Update Changes</Button>
            </section>
            </Form>
            )
          }
      </Formik>
    </main>
  )
}

export default MemberProfileInformationPage