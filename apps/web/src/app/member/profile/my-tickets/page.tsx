'use client'
import instance from '@/util/axiosInstance'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function MyTicketsPage() {
    const [ ticketList, setTicketList ] = useState([])
    const router = useRouter()
    const { data: dataTicketList } = useQuery({
        queryKey: ['getTicketList'],
        queryFn: async() => {
            const res = await instance.get('/user/tickets')
            console.log(res.data.data)
            return res.data.data
        }
    })
    const filtering = (filteredBy: string) => {
        if(filteredBy === 'PAID') {
            setTicketList(dataTicketList?.paidTickets)
        } else if(filteredBy === 'WAITING_FOR_PAYMENT') {
            setTicketList(dataTicketList?.pendingPaymentTickets)
        }
        if(filteredBy === 'CANCELLED') {
            setTicketList(dataTicketList?.cancelledTickets)
        }
    }

  return (
    <main className='flex flex-col gap-10'>
      <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
        My Tickets
      </h1>
      <section>
            <select onChange={(e) => filtering(e.target.value)} className="select select-bordered w-full">
                <option disabled selected>Filtered by Status</option>
                <option value="PAID">Paid</option>
                <option value="WAITING_FOR_PAYMENT">Waiting</option>
                <option value="CANCELLED">Cancelled</option>
            </select>
      </section>
      <section>
      <div className="overflow-x-auto">
        
        {/* 
        cancelledTickets[0].details[0].tickets.events.name
        cancelledTickets[0].details[0].tickets.name
        cancelledTickets[0].details[0].qty
        cancelledTickets[0].totalPrice
        cancelledTickets[0].status */}
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th></th>
                <th>Events</th>
                <th>Tickets</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Payment Status</th>
            </tr>
            </thead>
            <tbody>
                {
                    ticketList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                {/* <th>{item?.details[0]?.tickets?.events?.name}</th> */}
                                <th>Tickets</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Payment Status</th>
                            </tr>
                        )
                    })
                }
            <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Tax Accountant</td>
                <td>Red</td>
            </tr>
            </tbody>
        </table>
        </div>
      </section>
    </main>
  )
}

