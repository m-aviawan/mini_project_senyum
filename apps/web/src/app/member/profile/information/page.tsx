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
import { Formik, Form, Field } from 'formik'
import toast from "react-hot-toast"
import { Input } from '@/components/ui/input'
import { useMutation, useQuery } from "@tanstack/react-query"
import instance from "@/util/axiosInstance"
import { updateProfileUserValidationSchema } from "@/features/member/profile/information/updateProfileUserValidationSchema"

const MemberProfileInformationPage = () => {
  
  const [ dataValues, setDataValues ] = useState<any>({})
  const { data: dataProfile } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: async() => {
      let res = await instance.get('/user')
      const birthDate = res?.data?.data?.birthDate
      setDate(new Date(birthDate))
      return res.data.data
    }
  })
  
  const [date, setDate] = useState<Date>()
  interface IValues {
    username: string,
    address: string,
    birthDate: string,
    phoneNumber: string,
    gender: string
  }

  const { mutate: mutateUpdateUser, isPending: isPendingUpdateUser } = useMutation({
    mutationFn: async(values: IValues) => {
      return await instance.patch('/user', {
        username: values?.username,
        address: values?.address,
        birthDate: values?.birthDate,
        phoneNumber: values?.phoneNumber,
        gender: values?.gender,
      })
    },
    onSuccess: (res) => {
      toast.success('Update profile success')
    },
    onError: (err) => {
      toast.error('Update profile failed!')
    },
  })

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
        User Information
      </h1>
      <Formik
      initialValues={{
        email: dataProfile?.email || '',
        username: dataProfile?.username || '',
        phoneNumber: dataProfile?.phoneNumber || '',
        address: dataProfile?.address || '',
        birthDate: dataProfile?.birthDate.split('T')[0] || '',
        gender: dataProfile?.gender || ''
      }}
      validationSchema={updateProfileUserValidationSchema}
      onSubmit={(values) => {
        mutateUpdateUser(values)
      }}
      >
          {
            ({setFieldValue}) => (
            <Form>
            <section id='user-information' className='flex flex-col gap-10 text-[15px] px-12'>
              <article className='flex flex-col gap-1'>
                <h1 className='text-gray-600 font-semibold'>Profile Picture</h1>
                <p className='text-gray-500'>Your avatar and cover photo are the first images you'll see on your profile account.</p>
              </article>
              <section className='flex items-center gap-12'>
                <figure className='h-[120px] w-[120px] rounded-full bg-blue-600'></figure>
                <article className='flex flex-col gap-1'>
                  <h1 className='text-gray-600'>Avatar</h1>
                  <p className='text-gray-500'>Use a high-resolution square image of up to 2MB</p>
                </article>
              </section>
              <section  className='grid grid-cols-2 gap-10'>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Email</h1>
                  <Input defaultValue={dataProfile?.email} name='email' type="email" disabled/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Name<span className="text-red-600 ml-2">*</span></h1>
                  <Input defaultValue={dataProfile?.username} type="text" name='username' onChange={(e) => setFieldValue('username', e.target.value)}/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Phone Number<span className="text-red-600 ml-2">*</span></h1>
                  <Input defaultValue={dataProfile?.phoneNumber} type="text" name='phoneNumber' onChange={(e) => setFieldValue('phoneNumber', e.target.value)}/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Address</h1>
                  <Input defaultValue={dataProfile?.address} type="text" name='address' onChange={(e) => setFieldValue('address', e.target.value)}/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Birth Date</h1>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                        >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                    </PopoverContent>
                  </Popover>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Gender</h1>
                  <select defaultValue={dataProfile?.gender} name='gender' className="select select-bordered w-full" onChange={(e) => setFieldValue('gender', e.target.value)}>
                    <option disabled selected={!dataProfile?.gender}>Select a gender</option>
                    <option value='MALE'>Male</option>
                    <option value='FEMALE'>Female</option>
                  </select>
                </section>
              </section>
              <Button type='submit' className="btn bg-blue-600 hover:bg-blue-400 text-white">Update Changes</Button>
            </section>
            </Form>
            )
          }
      </Formik>
    </main>
  )
}

export default MemberProfileInformationPage