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
import { Input } from '@/components/ui/input'
import { useQuery } from "@tanstack/react-query"
import instance from "@/util/axiosInstance"

const MemberProfileInformationPage = () => {
  const [date, setDate] = useState<Date>()

  const [ dataValues, setDataValues ] = useState<any>({})
  const { data: dataProfile } = useQuery({
    queryKey: ['getProfileData'],
    queryFn: async() => {
      let res = await instance.get('/user')
      console.log(res.data.data)
      setDataValues(res.data.data)
      setDate(res.data.data.birthDate)
      return res.data.data
    }
  })
  return (
    <main className='flex flex-col gap-10'>
      <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
        User Information
      </h1>
      <Formik
      // initialValues={{

      // }}
      // onSubmit={}
      >
          {
            ({setFieldValue}) => (
              
            <Form>
            <section id='user-information' className='flex flex-col gap-10 text-[15px] px-12'>
              <section className='flex items-center gap-12 px-10'>
                <figure className='h-[200px] w-full rounded-2xl bg-blue-600'></figure>
              </section>
              <section  className='flex flex-col gap-10'>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Person in Charge<span className="text-red-600 ml-2">*</span></h1>
                  <Input className='py-7' type="text" value={dataProfile?.username}/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Company Email<span className="text-red-600 ml-2">*</span></h1>
                  <Input className='py-7' type="email" value={dataProfile?.email} disabled/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Company Phone Number<span className="text-red-600 ml-2">*</span></h1>
                  <Input className='py-7' type="text" value={dataProfile?.phoneNumber}/>
                </section>
                <section className='flex flex-col gap-1'>
                  <h1 className='text-gray-600 font-semibold'>Address<span className="text-red-600 ml-2">*</span></h1>
                  <Input className='py-7' type="text" value={dataProfile?.address}/>
                </section>
              </section>
              <button className="btn bg-blue-600 hover:bg-blue-400 text-white">Update Changes</button>
            </section>
            </Form>
            )
          }
      </Formik>
    </main>
  )
}

export default MemberProfileInformationPage