'use client'

import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DatePicker from "react-datepicker";
import { useQuery } from "@tanstack/react-query";
import instance from "@/util/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // const data
  const router = useRouter()
  const [startDate, setStartDate] = useState(new Date());
  const [topThreeEvents, setTopThreeEvents] = useState<any[]>([])
  const [ totalRevenue, setTotalRevenue ] = useState(0)
  const [ dataRevenue, setDataRevenue ] = useState([])
  // const dataRevenue = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  const { data: dataDashboard, isPending: isPendingDashboard, isSuccess: isSuccessDashboard } = useQuery({
    queryKey: ['getDashboardData'],
    queryFn: async() => {
      const res = await instance.get('/dashboard')
      let tempTotalRevenue = 0
      const dataEvents: any[] = res.data.data.events.events?.map((item: any, index: number) => {
        let totalTransaction = 0
        item?.tickets?.forEach((ticket: any) => {
          ticket?.transaction_details?.forEach((txDtl: any) => {
            totalTransaction += txDtl?.transactions?.totalPrice
            })
        })
            tempTotalRevenue += totalTransaction
            return {
            name: item?.name,
            revenue: totalTransaction
          }
        })
      const dataTopThreeEvents = dataEvents.sort((a,b) => b.revenue - a.revenue).slice(0,3)
      setTopThreeEvents(dataTopThreeEvents)
      setTotalRevenue(tempTotalRevenue)
      console.log(res.data.data)
      return res.data.data
    }
  })

  return (
    <main className='flex flex-col xl:grid grid-cols-2 gap-5'>
      <section className="col-[1/3] w-full">
      <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
      className="w-full p-2 border border-gray-300"
      />
      </section>
      <section className='gap-10 flex flex-col justify-between p-5 shadow-lg w-full bg-white h-[200px]'>
        <article>
          <h1 className='text-3xl font-semibold'>Rp{totalRevenue.toLocaleString('id-ID')},-.</h1>
          <h1 className='text-lg font-light'>Total Revenue</h1>
        </article>
        <div className="flex justify-between items-center">
          <Tabs defaultValue="month" className="w-[250px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className='text-xs' value="week">This Week</TabsTrigger>
              <TabsTrigger className='text-xs' value="month">This Month</TabsTrigger>
              <TabsTrigger className='text-xs' value="year">This Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>
      <section className='gap-10 flex flex-col justify-between p-5 shadow-lg w-full bg-white h-[200px]'>
        <article>
          {/* <h1 className='text-3xl font-semibold'>{dataDashboard?.getEventsCount}</h1> */}
          <h1 className='text-3xl font-semibold'>{dataDashboard?.events?.events?.length ? dataDashboard?.events?.event?.length : '-'}</h1>
          <h1 className='text-lg font-light'>Events Created</h1>
        </article>
        <div className="flex justify-between items-center">
          <Tabs defaultValue="month" className="w-[250px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className='text-xs' value="week">This Week</TabsTrigger>
              <TabsTrigger className='text-xs' value="month">This Month</TabsTrigger>
              <TabsTrigger className='text-xs' value="year">This Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>
      <section className="col-span-2 p-5 shadow-lg w-full bg-white ">
        <ResponsiveContainer width={"100%"} height={300}>
          <LineChart data={dataRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </section>
      <section className="flex flex-col gap-5 p-5 shadow-lg w-full bg-white">
        <h1 className='font-bold' >Top 3 Event's Revenue</h1>
        <article className='flex flex-col gap-3 font-light text-sm'>
          
          {
            topThreeEvents?.map((item: any, index: number) => {
                  return (
                    <div key={index} className='flex justify-between gap-1'>      
                      <p>{index + 1}. {item?.name}</p>
                      <p className="font-bold">Rp{item?.revenue.toLocaleString('id-ID')},-.</p>
                    </div>
                        )
              })
          }
        </article>
      </section>
    </main>
  );
}

/*
transactions statictic (month to month) (money) card
top 3 event categories by transac (per year) => pie chart
top 5 event by transac ( per year ) => bar chart
new user EO (per week) card
new user CUSTOMER (per week) card
gradient tertinggi transac event kategori card
most price range transac chart => melihat sebaran
*/