'use client'

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { MdLogout } from "react-icons/md";
import { useRouter } from 'next/navigation';

interface IAlertDialogLogOutProps {
    setLogOut: () => void
}

const AlertDialogLogOut = ({setLogOut}: IAlertDialogLogOutProps) => {
  const router = useRouter()

  return (
    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button className="bg-red-600 text-white hover:bg-red-400">Sign out</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className='flex items-center gap-2'>Sign out <MdLogout className='h-5 w-5'/></AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure? You won't be able to get notifications in the future
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                          onClick={() => {
                            setLogOut()
                            }}>Sure</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
  )
}

export default AlertDialogLogOut
