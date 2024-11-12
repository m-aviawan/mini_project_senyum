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

const TestPage = () => {

  const [date, setDate] = useState<Date>()
  return (
    <main className='flex flex-col gap-10'>
      <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
        User Information
      </h1>
      <Formik>
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
                <Input type="email" value='mfauzi@gmail.com' disabled/>
              </section>
              <section className='flex flex-col gap-1'>
                <h1 className='text-gray-600 font-semibold'>Name<span className="text-red-600 ml-2">*</span></h1>
                <Input type="text" value='Muhamad Fauzi Aviawan'/>
              </section>
              <section className='flex flex-col gap-1'>
                <h1 className='text-gray-600 font-semibold'>Phone Number<span className="text-red-600 ml-2">*</span></h1>
                <Input type="text" value='081272037023'/>
              </section>
              <section className='flex flex-col gap-1'>
                <h1 className='text-gray-600 font-semibold'>Address</h1>
                <Input type="text" value='Tangerang, Banten'/>
              </section>
              <section className='flex flex-col gap-1'>
                <h1 className='text-gray-600 font-semibold'>Birth Date<span className="text-red-600 ml-2">*</span></h1>
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
                <h1 className='text-gray-600 font-semibold'>Gender<span className="text-red-600 ml-2">*</span></h1>
                  <RadioGroup defaultValue="MALE" className="grid grid-cols-2 mt-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MALE" id="MALE" />
                      <Label htmlFor="MALE">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="FEMALE" id="FEMALE" />
                      <Label htmlFor="FEMALE">Female</Label>
                    </div>
                  </RadioGroup>
              </section>
            </section>
            <button className="btn bg-blue-600 hover:bg-blue-400 text-white">Update Changes</button>
          </section>
        </Form>
      </Formik>
    </main>
  )
}

export default TestPage