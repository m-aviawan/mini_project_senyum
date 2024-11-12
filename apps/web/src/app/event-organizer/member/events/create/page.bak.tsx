'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { IoMdClose } from "react-icons/io";


const EventCreatePage = () => {

  const [tagsArr, setTagsArr] = useState([])

  const deleteTag = (value) => {
    const indexToDelete = tagsArr.findIndex(value)
  }

  return (
    <main className='flex flex-col gap-10'>
      <section className='flex flex-col gap-5 rounded-2xl overflow-hidden'>
        <section className='bg-blue-600 h-[50%] w-full'>
        </section>
        <Input type="text" placeholder="Event Name" />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Edit Event Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Event profile</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="types" className="text-right">
                  Types
                </Label>
                <Select>
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select a event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Types</SelectLabel>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="OFFLINE">Offline</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="topics" className="text-right">
                  Topics
                </Label>
                <Select>
                  <SelectTrigger className="w-full col-span-3">
                    <SelectValue placeholder="Select a event topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Topics</SelectLabel>
                      <SelectItem value="apple">Conference</SelectItem>
                      <SelectItem value="banana">Playgrounds</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="tags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="tags"
                  defaultValue="@peduarte"
                  className="col-span-2"
                />
                <Button className='bg-yellow-400 text-black hover:bg-yellow-200 hover:text-gray-700'>Add Tag</Button>
              </div>
              <div className="grid grid-cols-5 items-center gap-2">
                <div className='bg-gray-200 text-gray-700 rounded-md border border-gray-300 text-xs font-semibold px-2 py-1 flex justify-center items-center gap-2'>
                  XL7
                  <IoMdClose className='h-3 w-3'/>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <section className='flex justify-between'>
          <article>
            <h1>Provided by</h1>
            <p>Avi</p>
          </article>
          <section className='flex flex-col gap-2'>
            <h1>Date & Time</h1>
          </section>
        </section>
      </section>
    </main>
  )
}

export default EventCreatePage
