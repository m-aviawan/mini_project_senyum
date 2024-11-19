'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { useQuery } from '@tanstack/react-query'
import instance from '@/util/axiosInstance'
import { data } from 'cypress/types/jquery'
import Link from 'next/link'
import authStore from '@/zustand/authStore'
import toast from 'react-hot-toast'

export default function Home() {
  const isVerified = authStore(state => state.isVerified)
  const { data: dataEvents, isPending: isPendingEvents, isError: isErrorEvents } = useQuery({
    queryKey: ['getEvents'],
    queryFn: async() => {
      let res = await instance.get('/event')
      return res.data.data

    }
  })
  
  const result = authStore(state => state.res)
  if(isPendingEvents) {
    return (
      <main className='flex flex-col gap-12 overflow-hidden'>
        <h1 className='skeleton w-28 font-bold h-5 text-left'></h1>
        <section className='overflow-hidden'>
          <section className='flex w-fit'>
            <figure className=' w-screen h-[300px] skeleton'>        
            </figure>
            <div className='skeleton w-screen h-[200px]'></div>
            <div className='skeleton w-screen h-[200px]'></div>
          </section>
        </section>
          <h1 className='w-28 h-5 skeleton font-bold text-center'></h1>
          <section className='flex justify-evenly flex-wrap gap-1 '>
            <div  className='flex items-center justify-center text-center text-sm font-bold'>
              <p className='w-28 h-5 skeleton drop-shadow-md'></p>
            </div>
          </section>
          <section className="flex flex-col gap-5 overflow-x-scroll">
            <h1 className="w-28 h-5 skeleton text-lg font-semibold"></h1>
            <section className="flex gap-3 w-fit">
                    <section className="hover:-translate-y-3 transition-[1s] flex flex-col items-start bg-white rounded-2xl overflow-hidden shadow-lg w-[250px]">
                      <figure className="h-[150px] skeleton w-full">
                      </figure>
                      <section className="flex flex-col p-5 text-sm gap-2 w-full">
                        <article className="flex flex-col gap-2">
                          <h1 className="font-bold w-20 h-5 skeleton"></h1>
                          <p className="text-gray-600 w-20 h-5 skeleton">
                          </p>
                          <p className="text-gray-600 w-20 h-5 skeleton"></p>
                          <p className="text-gray-600 w-20 h-5 skeleton"></p>
                          <p className="font-bold w-20 h-5 skeleton">
                          </p>
                        </article>
                        <section className="flex gap-3 items-center justify-end pt-3 w-full">
                          <h1 className='w-12 h-5 skeleton'></h1>
                          <figure className="rounded-full h-10 w-10 skeleton overflow-hidden">
                              
                          </figure>
                        </section>
                      </section>
                    </section>
            </section>
          </section>
    </main>
    )
  }

  if(dataEvents?.events?.length <= 0) {
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
        <section className='overflow-x-auto'>
          <section className='flex w-fit'>
            {
              dataEvents?.events?.map((item: any, index: number) => {
                return (
                  <figure key={index}  className='bg-white w-screen h-[300px]'>
                    <Image
                    src={item.images[0].url}
                    width={1000}
                    height={1000}
                    alt=''
                    className='object-cover w-full h-full'
                    />
                  </figure>
                )
              })
            }
            <div className='bg-yellow-300 w-screen h-[200px]'></div>
            <div className='bg-blue-300 w-screen h-[200px]'></div>
          </section>
        </section>
          <h1 className='text-3xl font-bold text-center'>Categories</h1>
          <section className='flex justify-evenly flex-wrap gap-1 border border-yellow-400'>
            {
              dataEvents?.eventsByCategories?.map((item: any, index: number) => {
                return(
                <div key={index} className=' hover:underline p-3 hover:cursor-pointer flex items-center justify-center text-center text-sm font-bold'>
                  <p className='text-black drop-shadow-md'>{item?.name}</p>
                </div>
                )
              })
            }
          </section>
      {dataEvents?.eventsByCategories?.map((item: any) => {
        
        return (
          <section className="flex flex-col gap-5 overflow-x-scroll">
            <h1 className="text-lg font-semibold">{item?.name}</h1>
            <section className="flex gap-3 w-fit">
              {item?.events?.map((itm: any) => {
            const startDate = new Date(itm.startDate).toDateString().split(' ');
            const [dayStart, monthStart, dateStart, yearStart] = startDate;
            const fixedStartDate = `${dateStart} ${monthStart} ${yearStart}`;
            const endDate = new Date(itm.endDate).toDateString().split(' ');
            const [dayEnd, monthEnd, dateEnd, yearEnd] = endDate;
            const fixedEndDate = `${dateEnd} ${monthEnd} ${yearEnd}`;
                return (
                  <Link href={isVerified ? `/events/${btoa(itm.id)}` : '/'} onClick={() => !isVerified && toast.error('Please complete registration with verify email!')}>
                    <section className="hover:-translate-y-3 transition-[1s] flex flex-col items-start bg-white rounded-2xl overflow-hidden shadow-lg w-[250px]">
                      <figure className="h-[150px] bg-gray-300 w-full">
                        <Image 
                        src={itm.images[0].url}
                        width={300}
                        height={300}
                        alt=''
                        className='object-cover w-full h-full'
                        />
                      </figure>
                      <section className="flex flex-col p-5 text-sm gap-2 w-full">
                        <article className="flex flex-col gap-2">
                          <h1 className="font-bold">{itm?.name.toString().length <= 20 ? itm?.name : itm?.name.slice(0,20) + '...'}</h1>
                          <p className="text-gray-600">
                            {fixedEndDate === fixedStartDate
                              ? fixedStartDate
                              : `${fixedStartDate} - ${fixedEndDate}`}
                          </p>
                          <p className="text-gray-600">{itm?.locationName.toString().length <= 20 ? itm?.locationName : itm?.locationName.slice(0,20) + '...'}</p>
                          <p className="text-gray-600">{itm?.location === undefined || itm?.location === '' ? 'Online' : itm?.location.toString().length <= 20 ? itm?.location : itm?.location.slice(0,20) + '...'}</p>
                          <p className="font-bold">
                            {itm.isPaid ? 'Paid' : 'Free'}
                          </p>
                        </article>
                        <section className="flex gap-3 items-center border-t justify-end border-t-gray-300 pt-3 w-full">
                          <h1>{itm.eventOrganizer.companyName}</h1>
                          <figure className="rounded-full h-10 w-10 bg-gray-200 overflow-hidden">
                              {
                                itm.eventOrganizer.profilePictureUrl && (
                                  <Image 
                                  src={itm.eventOrganizer.profilePictureUrl}
                                  width={100}
                                  height={100}
                                  alt=''
                                  />
                                )
                              }
                          </figure>
                        </section>
                      </section>
                    </section>
                  </Link>
                );
              })}
            </section>
          </section>
        );
      })}
    </main>
  )
}
