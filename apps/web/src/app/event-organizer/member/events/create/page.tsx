'use client'

import React, { useState } from 'react'
import { FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Formik, Form, ErrorMessage } from 'formik';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMutation } from '@tanstack/react-query';
import instance from '@/util/axiosInstance';
import { createEventValidationSchema } from '@/features/events/create/createEventValidationSchema';

const CreateEventPage = ({className}: React.HTMLAttributes<HTMLDivElement>) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      })
    const [ eventType, setEventType ] = useState<string>('')

    const { mutate: mutateCreateEvent, isPending: isPendingCreateEvent } = useMutation({
        mutationFn: async() => {
            await instance.post('/event')
        }
    })
    // model Event {
    //     id           String    @id @default(cuid())
    //     name         String
    //     type         EventType
    //     locationName String
    //     location     String
    //     url          String?
    //     description  String?
    //     startDate    DateTime
    //     endDate      DateTime
    //     isPaid       Boolean   @default(false)
    //     capacity     Int
  return (
    <main className='w-full h-full'>
    <Formik
    initialValues={{
        file: [] as File[],
        name: '',
        isPaid: '',
        categoryId: '',
        description: '',
        type: '',
        url: '',
        locationName: '',
        location: '',
        startDate: '',
        endDate: '',
        capacity: ''
    }}
    validationSchema={createEventValidationSchema}
    onSubmit={(values) => {
        const fd = new FormData()
        fd.append('name', values.name) 
        fd.append('isPaid', values.isPaid)
        fd.append('categoryId', values.categoryId)
        fd.append('type', values.type)
        fd.append('url', values.url)
        fd.append('locationName', values.locationName)
        fd.append('location', values.location)
        fd.append('startDate', date?.from?.toISOString() as string)
        fd.append('endDate', date?.to?.toISOString() as string)
        fd.append('capacity', values.capacity.toString())
        fd.append('description', values.description)
        values?.file?.forEach(item => {
            fd.append('images', item)
        })
    }}
    >
            {
            ({setFieldValue}) => (
            <Form>
                <section className="max-w-4xl mx-auto rounded-2xl border border-gray-200 p-10 flex flex-col gap-10">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                    <div className="text-gray-500">
                        <p>Upload picture/poster/banner</p>
                        <p className="text-xs">Recomended resolution is 724 x 340px and file size maximum is 2MB</p>
                    </div>
                    <div className="text-4xl text-gray-400 mt-2">+</div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="name">Name</Label>
                        <Input type="text" id="name" placeholder="Name" onChange={(e) => setFieldValue('name', e.target.value)} />
                    </section>
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="capacity">Capacity</Label>
                        <Input type="number" id="capacity" placeholder="Capacity" onChange={(e) => setFieldValue('capacity', e.target.value)}/>
                    </section>
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="isPaid">Paid or Not</Label>
                        <select name='isPaid' className="select select-bordered w-full" onChange={(e) => setFieldValue('isPaid', e.target.value)}>
                            <option disabled selected>Select one</option>
                            <option value='PAID'>Paid</option>
                            <option value='FREE'>Free</option>
                        </select>
                    </section>
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="category">Category</Label>
                        <select className="select select-bordered w-full" onChange={(e) => setFieldValue('categoryId', e.target.value)}>
                            <option disabled selected>Select a category</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                    </section>
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="taxpayer-id-num-name">Event Type</Label>
                        <select 
                        name='type' 
                        className="select select-bordered w-full" 
                        onChange={(e) => {
                            setFieldValue('type', e.target.value)
                            setEventType(e.target.value)
                            }}>
                            <option disabled selected>Select a type</option>
                            <option value='ONLINE'>Online</option>
                            <option value='OFFLINE'>Offline</option>
                        </select>
                    </section>
                    {
                        eventType === 'ONLINE' && (
                        <section className="flex flex-col w-full items-start gap-2">
                            <Label className="ml-3" htmlFor="url">URL</Label>
                            <Input type="text" id="url" placeholder="URL" onChange={(e) => setFieldValue('url', e.target.value)}/>
                        </section>
                        )
                    }
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="locationName">Place</Label>
                        <Input type="text" id="locationName" placeholder="Place" onChange={(e) => setFieldValue('locationName', e.target.value)} />
                    </section>
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="date">Date</Label>
                        <div className={cn("grid gap-2 w-full ", className)}>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    id="date"
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {date?.from ? (
                                    date.to ? (
                                        <>
                                        {format(date.from, "LLL dd, y")} -{" "}
                                        {format(date.to, "LLL dd, y")}
                                        </>
                                    ) : (
                                        format(date.from, "LLL dd, y")
                                    )
                                    ) : (
                                    <span>Pick a date</span>
                                    )}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    initialFocus
                                    mode="range"
                                    defaultMonth={date?.from}
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </section>
                    
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="location">Address</Label>
                        <Textarea  placeholder="Type your address here..." id='location' onChange={(e) => setFieldValue('location', e.target.value)}/>
                    </section>
                    <section className="flex flex-col w-full items-start gap-2">
                        <Label className="ml-3" htmlFor="description">Description</Label>
                        <Textarea  placeholder="Type your description here..." id='description' onChange={(e) => setFieldValue('description', e.target.value)}/>
                    </section>
                </div>
                <Button className='w-full bg-yellow-400 transition-[0.5s] text-black hover:bg-yellow-200 hover:text-gray-700'>Create New Event</Button>
                </section>
            </Form>
                )
            }
    </Formik>
    </main>
  )
}

export default CreateEventPage