'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useQuery } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import { data } from 'cypress/types/jquery'
import Link from 'next/link'
import authStore from '@/zustand/authStore'

export default function Home() {
  const { data: dataEvents, isPending: isPendingEvents, isError: isErrorEvents } = useQuery({
    queryKey: ['getEvents'],
    queryFn: async() => {
      let res = await instance.get('/event')
      return res.data.data
    }
  })
  
  const result = authStore(state => state.res)
  console.log(result)
  if(isPendingEvents) {
    return (
      <main className='fixed top-0 flex flex-col gap-1 h-screen w-full items-center justify-center'>
        <span className="loading loading-bars loading-lg"></span>
      </main>
    )
  }
  if(isErrorEvents) {
    return (
      <main>
        <section className='fixed top-0 gap-1 flex flex-col justify-center items-center h-screen w-full'>
          <h1 className='text-3xl font-bold'>Getting data failed!</h1>
          <p className='text-base font-light'>Please refresh page</p>
        </section>
      </main>
    )
  }
  if(dataEvents?.length <= 0) {
    return (
      <main>
        <section className='fixed top-0 gap-1 flex flex-col justify-center items-center h-screen w-full'>
          <h1 className='text-3xl font-bold'>Event not found!</h1>
          <p className='text-base font-light'>You can create your own events and invite others to join your event</p>
        </section>
      </main>
    )
  }

  return (
    <main className='flex flex-col gap-12 overflow-hidden'>
      {/*
          "id": "cm385nhjr000510fzhxm8733y",
          "name": "Rock Concert",
          "type": "OFFLINE",
          "locationName": "Stadium A",
          "location": "123 Stadium St, City, USA",
          "url": null,
          "description": null,
          "startDate": "2024-12-01T11:00:00.000Z",
          "endDate": "2024-12-01T15:00:00.000Z",
          "isPaid": false,
          "capacity": 1000,
          "categoryId": 1,
      */}
      <section className='bg-yellow-400 h-[300px] flex flex-col justify-center gap-5 px-10'>
        <h1 className='text-black font-bold text-3xl text-left'>Top 3 Events</h1>
        <section className='flex gap-10 w-full'>
          <div className='bg-white rounded-md h-[150px] w-full'></div>
          <div className='bg-white rounded-md h-[150px] w-full'></div>
          <div className='bg-white rounded-md h-[150px] w-full'></div>
        </section>
      </section>
      <section className='flex flex-col gap-5'>
        <h1 className='text-lg font-semibold'>Event Playground</h1>
        <section className='flex gap-3 w-fit'>
        {
          dataEvents!.map((item: any) => {
            const startDate = new Date(item.startDate).toDateString().split(' ')
            const [ dayStart, monthStart, dateStart, yearStart ] = startDate
            const fixedStartDate = `${dateStart} ${monthStart} ${yearStart}`
            const endDate = new Date(item.endDate).toDateString().split(' ')
            const [ dayEnd, monthEnd, dateEnd, yearEnd ] = endDate
            const fixedEndDate = `${dateEnd} ${monthEnd} ${yearEnd}`

            return(
            <Link href={`/events/${btoa(item.id)}`}>
              <section className='hover:translate-y-5 transition-[1s] flex flex-col items-start bg-white rounded-2xl overflow-hidden drop-shadow-lg w-[250px]'>
                <div className='h-[150px] bg-orange-400 w-full'>

                </div>
                <section className='flex flex-col p-5 text-sm gap-2 w-full'>
                  <article className='flex flex-col gap-2'>
                    <h1 className='font-bold'>{item?.name}</h1>
                    <p className='text-gray-600'>{fixedEndDate === fixedStartDate ? fixedStartDate : `${fixedStartDate} - ${fixedEndDate}`}</p>
                    <p className='text-gray-600'>{item.locationName}</p>
                    <p className='text-gray-600'>{item.location}</p>
                    <p className='font-bold'>{item.isPaid ? 'Paid' : 'Free'}</p>
                  </article>
                  <section className='flex gap-3 items-center border-t justify-end border-t-gray-300 pt-3 w-full'>
                    <h1>{item.eventOrganizer.companyName}</h1>
                    <div className='rounded-full h-10 w-10 bg-red-500'></div>
                  </section>
                </section>
              </section>
            </Link>
            )
          })
        }
        </section>
      </section>
      <section className='flex flex-col gap-5'>
        <h1 className='text-lg font-semibold'>Event Playground</h1>
        <section className='flex gap-2 w-fit'>
        {
          dataEvents!.map((item: any) => {
            const startDate = new Date(item.startDate).toDateString().split(' ')
            const [ dayStart, monthStart, dateStart, yearStart ] = startDate
            const fixedStartDate = `${dateStart} ${monthStart} ${yearStart}`
            const endDate = new Date(item.endDate).toDateString().split(' ')
            const [ dayEnd, monthEnd, dateEnd, yearEnd ] = endDate
            const fixedEndDate = `${dateEnd} ${monthEnd} ${yearEnd}`

            return(
            <section className='flex flex-col items-start bg-white rounded-2xl overflow-hidden drop-shadow-lg w-[250px]'>
              <div className='h-[150px] bg-orange-400 w-full'>

              </div>
              <section className='flex flex-col p-5 text-sm gap-2 w-full'>
                <article className='flex flex-col gap-2'>
                  <h1 className='font-bold'>{item?.name}</h1>
                  <p className='text-gray-600'>{fixedEndDate === fixedStartDate ? fixedStartDate : `${fixedStartDate} - ${fixedEndDate}`}</p>
                  <p className='text-gray-600'>{item.locationName}</p>
                  <p className='text-gray-600'>{item.location}</p>
                  <p className='font-bold'>{item.isPaid ? 'Paid' : 'Free'}</p>
                </article>
                <section className='flex gap-3 items-center border-t justify-end border-t-gray-300 pt-3 w-full'>
                  <h1>{item.eventOrganizer.companyName}</h1>
                  <div className='rounded-full h-10 w-10 bg-red-500'></div>
                </section>
              </section>
            </section>
            )
          })
        }
        </section>
      </section>
      <section className='flex flex-col gap-5'>
        <h1 className='text-lg font-semibold'>Event Playground</h1>
        <section className='flex gap-2 w-fit'>
        {
          dataEvents!.map((item: any) => {
            const startDate = new Date(item.startDate).toDateString().split(' ')
            const [ dayStart, monthStart, dateStart, yearStart ] = startDate
            const fixedStartDate = `${dateStart} ${monthStart} ${yearStart}`
            const endDate = new Date(item.endDate).toDateString().split(' ')
            const [ dayEnd, monthEnd, dateEnd, yearEnd ] = endDate
            const fixedEndDate = `${dateEnd} ${monthEnd} ${yearEnd}`

            return(
            <section className='flex flex-col items-start bg-white rounded-2xl overflow-hidden drop-shadow-lg w-[250px]'>
              <div className='h-[150px] bg-orange-400 w-full'>

              </div>
              <section className='flex flex-col p-5 text-sm gap-2 w-full'>
                <article className='flex flex-col gap-2'>
                  <h1 className='font-bold'>{item?.name}</h1>
                  <p className='text-gray-600'>{fixedEndDate === fixedStartDate ? fixedStartDate : `${fixedStartDate} - ${fixedEndDate}`}</p>
                  <p className='text-gray-600'>{item.locationName}</p>
                  <p className='text-gray-600'>{item.location}</p>
                  <p className='font-bold'>{item.isPaid ? 'Paid' : 'Free'}</p>
                </article>
                <section className='flex gap-3 items-center border-t justify-end border-t-gray-300 pt-3 w-full'>
                  <h1>{item.eventOrganizer.companyName}</h1>
                  <div className='rounded-full h-10 w-10 bg-red-500'></div>
                </section>
              </section>
            </section>
            )
          })
        }
        </section>
      </section>
      <section className='flex flex-col gap-5'>
        <h1 className='text-lg font-semibold'>Event Playground</h1>
        <section className='flex gap-2 w-fit'>
        {
          dataEvents!.map((item: any) => {
            const startDate = new Date(item.startDate).toDateString().split(' ')
            const [ dayStart, monthStart, dateStart, yearStart ] = startDate
            const fixedStartDate = `${dateStart} ${monthStart} ${yearStart}`
            const endDate = new Date(item.endDate).toDateString().split(' ')
            const [ dayEnd, monthEnd, dateEnd, yearEnd ] = endDate
            const fixedEndDate = `${dateEnd} ${monthEnd} ${yearEnd}`

            return(
            <section className='flex flex-col items-start bg-white rounded-2xl overflow-hidden drop-shadow-lg w-[250px]'>
              <div className='h-[150px] bg-orange-400 w-full'>

              </div>
              <section className='flex flex-col p-5 text-sm gap-2 w-full'>
                <article className='flex flex-col gap-2'>
                  <h1 className='font-bold'>{item?.name}</h1>
                  <p className='text-gray-600'>{fixedEndDate === fixedStartDate ? fixedStartDate : `${fixedStartDate} - ${fixedEndDate}`}</p>
                  <p className='text-gray-600'>{item.locationName}</p>
                  <p className='text-gray-600'>{item.location}</p>
                  <p className='font-bold'>{item.isPaid ? 'Paid' : 'Free'}</p>
                </article>
                <section className='flex gap-3 items-center border-t justify-end border-t-gray-300 pt-3 w-full'>
                  <h1>{item.eventOrganizer.companyName}</h1>
                  <div className='rounded-full h-10 w-10 bg-red-500'></div>
                </section>
              </section>
            </section>
            )
          })
        }
        </section>
      </section>
      
      
      <section className='flex gap-5'>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
      </section>
      <section className='flex gap-5'>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
      </section>
      <section className='flex gap-5'>
        <div className='bg-teal-700 rounded-xl h-[120px] w-[120px] p-3 flex items-end justify-center text-center text-sm font-bold'>
          <p className='text-white drop-shadow-md'>Wahana</p>
        </div>
        <div className='bg-teal-700 rounded-xl h-[120px] w-[120px] p-3 flex items-end justify-center text-center text-sm font-bold'>
          <p className='text-white drop-shadow-md'>Akomodasi</p>
        </div>
        <div className='bg-teal-700 rounded-xl h-[120px] w-[120px] p-3 flex items-end justify-center text-center text-sm font-bold'>
          <p className='text-white drop-shadow-md'>Taman Bermain</p>
        </div>
      </section>
    </main>
  )
}
