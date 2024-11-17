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

export default function DashboardPage() {
  // const data
  const [startDate, setStartDate] = useState(new Date());
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <main className='grid grid-cols-2 gap-5'>
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
          <h1 className='text-3xl font-semibold'>400.000.000</h1>
          <h1 className='text-lg font-light'>Total Revenue</h1>
        </article>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className='text-lg font-light text-green-500'>10.56%</p>
            <FaCaretUp className="text-green-500"/>
          </div>
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
          <h1 className='text-3xl font-semibold'>3</h1>
          <h1 className='text-lg font-light'>Events Created</h1>
        </article>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className='text-lg font-light text-green-500'>10.56%</p>
            <FaCaretUp className="text-green-500"/>
          </div>
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
          <h1 className='text-3xl font-semibold'>1232</h1>
          <h1 className='text-lg font-light'>Customer's Transactions</h1>
        </article>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className='text-lg font-light text-green-500'>10.56%</p>
            <FaCaretUp className="text-green-500"/>
          </div>
          <Tabs defaultValue="month" className="w-[150px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className='text-xs' value="week">Week</TabsTrigger>
              <TabsTrigger className='text-xs' value="month">Month</TabsTrigger>
              <TabsTrigger className='text-xs' value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>
      <section className='gap-10 flex flex-col justify-between p-5 shadow-lg w-full bg-white h-[200px]'>
        <article>
          <h1 className='text-3xl font-semibold'>Rp7.000.000.000,-.</h1>
          <h1 className='text-lg font-light'>Transactions</h1>
        </article>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <p className='text-lg font-light text-green-500'>5.76%</p>
            <FaCaretUp className="text-green-500"/>
          </div>
          <Tabs defaultValue="week" className="w-[150px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger className='text-xs' value="week">Week</TabsTrigger>
              <TabsTrigger className='text-xs' value="month">Month</TabsTrigger>
              <TabsTrigger className='text-xs' value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>
      <section className="col-span-2 p-5 shadow-lg w-full bg-white ">
        <ResponsiveContainer width={"100%"} height={300}>
          <LineChart data={data}>
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
        <h1 className='font-bold' >3 Latest Created Events with Revenue</h1>
        <article className='flex flex-col gap-3 pl-5 font-light text-sm'>
          <div className='flex justify-between'>
            <p>1. aaa</p>
            <p className="font-bold">Rp50.000.000,-</p>
          </div>
          <div className='flex justify-between'>
            <p>1. aaa</p>
            <p className="font-bold">Rp50.000.000,-</p>
          </div>
          <div className='flex justify-between'>
            <p>1. aaa</p>
            <p className="font-bold">Rp50.000.000,-</p>
          </div>
        </article>
      </section>
      <section className="flex flex-col gap-5 p-5 shadow-lg w-full bg-white">
        <h1 className='font-bold' >Top 3 Event's Revenue</h1>
        <article className='flex flex-col gap-3 pl-5 font-light text-sm'>
          <div className='flex justify-between'>
            <p>1. aaa</p>
            <p className="font-bold">Rp3.000.000.000,-</p>
          </div>
          <div className='flex justify-between'>
            <p>1. aaa</p>
            <p className="font-bold">Rp500.000.000,-</p>
          </div>
          <div className='flex justify-between'>
            <p>1. aaa</p>
            <p className="font-bold">Rp450.000.000,-</p>
          </div>
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