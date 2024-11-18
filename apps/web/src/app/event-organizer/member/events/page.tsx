'use client'

import instance from "@/util/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"
import { useDebouncedCallback } from "use-debounce"

export default function MemberEventsPage() {
    const router = useRouter()
    const [ eventList, setEventList ] = useState<any[]>([])
    const {data: dataEventList, isPending: isPendingEventList} = useQuery({
        queryKey: ['getEventList'],
        queryFn: async() => {
            const res = await instance.get('/dashboard')
            const tempEventList = res.data.data.events.events.map((item: any, index: number) => {
                let totalTransaction = 0
                let totalAttendee = 0
                item?.tickets?.forEach((ticket: any) => {
                    ticket?.transaction_details?.forEach((txDtl: any) => {
                        totalAttendee += txDtl?.qty
                        totalTransaction += txDtl?.transactions?.totalPrice
                    })
                })
                return {
                    name: item?.name,
                    type: item?.type,
                    totalAttendee,
                    totalTransaction,
                    createdAt: item?.createdAt,
                    location: item?.location,
                    isPaid: item?.isPaid ? 'Paid' : 'Free'
                }
            })
            setEventList(tempEventList)
            return res.data.data.events
        }
    })
    
    useMutation({
        mutationFn: async() => {
            
        }
    })

    if(isPendingEventList) {
        return (
          <main className='fixed top-0 left-0 flex flex-col gap-1 h-screen w-full items-center justify-center'>
            <span className="loading loading-bars loading-lg"></span>
          </main>
        )
      }
    
    const sorting = (sortBy: string) => {
        let tempEventList = eventList
        if(sortBy === 'nameAsc') {
            setEventList(tempEventList)
            router.refresh()
        } else if(sortBy === 'nameDesc') {
            tempEventList = tempEventList?.reverse()
            setEventList(tempEventList)
            router.refresh()
        } else if(sortBy === 'revenueLowestToHighest') {
            tempEventList = tempEventList?.sort((a, b) => a.totalTransaction - b.totalTransaction)
            setEventList(tempEventList)
            router.refresh()
        } else if(sortBy === 'revenueHighestToLowest') {
            tempEventList = tempEventList?.sort((a, b) => b.totalTransaction - a.totalTransaction)
            setEventList(tempEventList)
            router.refresh()
        } else if(sortBy === 'attendeeLowestToHighest') {
            tempEventList = tempEventList?.sort((a, b) => a.totalAttendee - b.totalAttendee)
            setEventList(tempEventList)
            router.refresh()
        } else if(sortBy === 'attendeeHighestToLowest') {
            tempEventList = tempEventList?.sort((a, b) => b.totalAttendee - a.totalAttendee)
            setEventList(tempEventList)
            router.refresh()
        }
        
    }
    // const {mutate: mutateSearch} = useMutation({
    //     mutationKey: [dataEventList],
    //     mutationFn: async(values: string) => {
    //         const res = await instance.get(`/dashboard?search=${values}`)
    //         const tempEventList = res.data.data.events.events.map((item: any, index: number) => {
    //             let totalTransaction = 0
    //             let totalAttendee = 0
    //             item?.tickets?.forEach((ticket: any) => {
    //                 ticket?.transaction_details?.forEach((txDtl: any) => {
    //                     totalAttendee += txDtl?.qty
    //                     totalTransaction += txDtl?.transactions?.totalPrice
    //                 })
    //             })
    //             return {
    //                 name: item?.name,
    //                 type: item?.type,
    //                 totalAttendee,
    //                 totalTransaction,
    //                 createdAt: item?.createdAt,
    //                 location: item?.location,
    //                 isPaid: item?.isPaid ? 'Paid' : 'Free'
    //             }
    //         })
    //         setEventList(tempEventList)
    //         return res
    //     }
    //   })
    
    //   const debounce = useDebouncedCallback((values: string) => {
    //     if(values.length < 3) {
    //         router.push(`/discover?search=${values}`)
    //         // mutateSearch(values)
    //     }
    //   }, 1000)
    
    

    return (
        <main className='flex flex-col gap-5'>
            <section className="flex flex-col gap-2">
            {/* <Input type='text' placeholder="Search event..." className="py-3" /> */}
            {/* <Input type='text' placeholder="Search event..." onChange={e => debounce(e.target.value)}/> */}
            <select onChange={(e) => sorting(e.target.value)} className="select select-bordered w-full">
                <option disabled selected>Sort by</option>
                <option value="revenueLowestToHighest">Revenue - Lowest to Highest</option>
                <option value="revenueHighestToLowest">Revenue - Highest to Lowest</option>
                <option value="attendeeLowestToHighest">Attendee - Lowest to Highest</option>
                <option value="attendeeHighestToLowest">Attendee - Highest to Lowest</option>
            </select>
            {/* <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort By" className="text-left"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className='px-7' onClick={() => sorting('nameAsc')} value="nameAsc">Name - Ascending</SelectItem>
                    <SelectItem className='px-7' onClick={() => sorting('nameDesc')} value="nameDesc">Name - Descending</SelectItem>
                    <SelectItem className='px-7' onClick={() => sorting('revenueLowestToHighest')} value="revenueLowestToHighest">Revenue - Lowest to Highest</SelectItem>
                    <SelectItem className='px-7' onClick={() => sorting('revenueHighestToLowest')} value="revenueHighestToLowest">Revenue - Highest to Lowest</SelectItem>
                    <SelectItem className='px-7' onClick={() => sorting('attendeeLowestToHighest')} value="attendeeLowestToHighest">Attendee - Lowest to Highest</SelectItem>
                    <SelectItem className='px-7' onClick={() => sorting('attendeeHighestToLowest')} value="attendeeHighestToLowest">Attendee - Highest to Lowest</SelectItem>
                </SelectContent>
            </Select> */}
            </section>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Attendee</th>
                        <th>Revenue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* row 1 */}
                    {
                        eventList?.map((item: any, index: number) => {
                            return (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{item?.name}</td>
                                    <td>{item?.location}</td>
                                    <td>{item?.isPaid}</td>
                                    <td>{item?.totalAttendee}</td>
                                    <td>Rp{item?.totalTransaction.toLocaleString('id-ID')}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </main>
    )
}