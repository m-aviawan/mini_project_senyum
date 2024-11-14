'use client'

import instance from '@/util/axiosInstance'
import { useMutation, useQuery } from '@tanstack/react-query'
import { indexOf } from 'cypress/types/lodash'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Formik, Form, ErrorMessage } from 'formik'
import Autoplay from "embla-carousel-autoplay"
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { reviewValidationSchema } from '@/features/events/schemas/reviewValidationSchema'
import toast from 'react-hot-toast'

const EventPage = ({params}: any) => {

let eventId: string = params.eventId
eventId = eventId.replace(/%3D/g, "=")
eventId = atob(eventId)

const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

const router = useRouter()
const { mutate: mutateCreateReview, isPending: isPendingCreateReview } = useMutation({
    mutationFn: async(values: any) => {
        await instance.post(`/review`, {
            comments: values?.comments,
            rating: values?.rating,
            feedback: values?.feedback,
            eventId,
        })
        toast.success('Create review success')
        router.refresh()
    },
    onSuccess: (res) => {
    },
    onError: (err) => {
        toast.error('Create review failed!')
    },
})

const { 
    data: dataEventDetails, 
    isPending: isPendingEventDetails, 
    isError: isErrorEventDetails } = useQuery({
    queryKey: ['getEventDetails'],
    queryFn: async() => {
        let res = await instance.get(`/event/${eventId}`)
        return res.data.data
    }
})

const {
    data: dataReviewByEvent,
    isPending: isPendingReviewByEvent,
    isError: isErrorReviewByEvent
} = useQuery({
    queryKey: ['getReviewByEvent'],
    queryFn: async() => {
        let res = await instance.get(`/review/${eventId}`)
        return res.data.data
    }
})

const eventDetailsTickets = dataEventDetails?.eventDetail?.tickets

const startDate = new Date(dataEventDetails?.eventDetail.startDate).toDateString().split(' ')
const [ dayStart, monthStart, dateStart, yearStart ] = startDate
const fixedStartDate = `${dateStart} ${monthStart} ${yearStart}`
const endDate = new Date(dataEventDetails?.eventDetail.endDate).toDateString().split(' ')
const [ dayEnd, monthEnd, dateEnd, yearEnd ] = endDate
const fixedEndDate = `${dateEnd} ${monthEnd} ${yearEnd}`

const [ addToCart, setAddToCart ] = useState<any>([])
const [ grandTotal, setGrandTotal ] = useState<number>(0)

const quantityOperator = (id: string, name: string, price: number, operator: string) => {
    let tempAddToCart = [...addToCart]
    let tempGrandTotal = 0
    let isTicketAdded = false
    for(let i = 0; i < tempAddToCart.length; i++ ) {
        if(tempAddToCart[i].id === id) {
            const currQty = tempAddToCart[i].qty
            if(operator === "PLUS") {
                tempAddToCart[i].qty = currQty + 1
                tempAddToCart[i].totalPrice = tempAddToCart[i].qty * tempAddToCart[i].price
            } else if (operator === "MINUS") {
                if(tempAddToCart[i].qty <= 1) {
                    tempAddToCart.splice(i, 1)
                } else {
                    tempAddToCart[i].qty = currQty - 1
                    tempAddToCart[i].totalPrice = tempAddToCart[i].qty * tempAddToCart[i].price
                    
                }
            }
            isTicketAdded = true
            setAddToCart(tempAddToCart)
            break
        }
    }
    if(operator === "PLUS" && isTicketAdded === false) {
        tempAddToCart = [...addToCart, { id, name, price, qty: 1, totalPrice: 1 * price }]
        setAddToCart(tempAddToCart)
    }
    tempAddToCart.forEach(item => {
        tempGrandTotal += item.totalPrice
    })
    setGrandTotal(tempGrandTotal)
}


    const heroSlider= [
        {
          title: 'Satisfaction',
          description: 'We seek customer satisfaction through product development that has eco-friendly materials and innovative design.',
          img: 'https://www.locknlock.com/idn/image/product/2023/03/29/102274892ttmz.jpg'
        },
        {
          title: 'Better Life',
          description: 'We aim for differentiated challenges and change and we endeavor to improve the life value of customers.',
          img: 'https://www.locknlock.com/idn/image/common/innovation/labs/open-innovation.jpg'
        },
        {
          title: 'Sharing',
          description: 'We realize business of sharing that the environment and humans can coexist in harmony and contribute to society.',
          img: 'https://www.locknlock.com/idn/image/common/innovation/design-center/design-business.jpg'
        }
    ]
    
    const [currSlide, setCurrSlide] = useState(0)
    const prev = () => {
        setCurrSlide(currSlide == 0 ? heroSlider.length - 1 : currSlide - 1)
    }
    
    const next = () => {
        setCurrSlide(currSlide == heroSlider.length - 1 ? 0 : currSlide + 1)
    }

if(isPendingEventDetails || isPendingReviewByEvent) {
    return (
      <main className='fixed top-0 flex flex-col gap-1 h-screen w-full items-center justify-center'>
        <span className="loading loading-bars loading-lg"></span>
      </main>
    )
  }
//   if(isErrorEventDetails || isErrorReviewByEvent) {
//     return (
//       <main>
//         <section className='fixed top-0 gap-1 flex flex-col justify-center items-center h-screen w-full'>
//           <h1 className='text-3xl font-bold'>Getting data failed!</h1>
//           <p className='text-base font-light'>Please refresh page</p>
//         </section>
//       </main>
//     )
//   }


  return (
    <main className='flex flex-col gap-10'>
        <section className='grid grid-cols-3 gap-10'>
            <section className='col-[1/4] h-full flex justify-center'>
        <section id='hero-section-carousel' className='w-full h-[300px] overflow-hidden relative'>
          <div className='flex transition-transform ease-out duration-500 w-fit' style={{transform: `translateX(-${currSlide/heroSlider.length * 100}%)`}}>
              {
                heroSlider.map((item, index) => {
                  return(
                    <section key={index} id={`carousel-${index + 1}`} className="relative rounded-none max-h-[100vh] w-screen my-bg-lin-1">
                      <figure className='absolute bottom-0 w-full h-full -z-10'>
                        <Image
                          loading='lazy'
                          src={item.img}
                          width={1300}
                          height={1300}
                          alt={`pict-${index + 1}`} 
                          className="object-cover h-[300px] w-full"
                        />
                      </figure>
                    </section>
                  )
                })
              }
          </div>
          <div id='carousel-buttons' className='absolute inset-0 flex items-center justify-between z-20'>
              <IoMdArrowDropleft onClick={prev} className='hover:cursor-pointer w-8 hover:opacity-60 transition-[0.5s] text-opacity-0 bg-white opacity-35 h-full'/>
              <IoMdArrowDropright onClick={next} className='hover:cursor-pointer w-8 hover:opacity-60 transition-[0.5s] text-opacity-0 bg-white opacity-35 h-full'/>
          </div>
        </section>
            </section>
            {/* <section className="event-details col-[3/4] bg-white flex flex-col justify-between rounded-xl shadow-lg p-6">
                <section className='flex flex-col gap-1'>
                    <h1 className='mb-6 text-lg font-bold'>{dataEventDetails?.eventDetail?.name}</h1>
                    <p>{fixedStartDate === fixedEndDate ? fixedStartDate : `${fixedStartDate} - ${fixedEndDate}`}</p>
                    <p>{dataEventDetails?.eventDetail?.locationName}</p>
                    <em>{dataEventDetails?.eventDetail?.location}</em>
                </section>
                <section className='flex gap-3 items-center border-dashed border-t border-t-gray-300 pt-3 w-full'>
                    <div className='rounded-full h-10 w-10 bg-blue-500'></div>
                    <hgroup className='flex flex-col gap-1 text-sm'>
                    <h1>Provided by</h1>
                    <h1 className='font-bold'>{dataEventDetails?.eventOrganizer?.companyName}</h1>
                    </hgroup>
                </section>
            </section> */}
        </section>
        <section>
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <Card>
                    <CardHeader>
                        <CardTitle>Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <section className="event-details col-[3/4] bg-white flex flex-col gap-2 justify-between">
                            <section className='flex flex-col gap-1'>
                                <h1 className='mb-6 text-lg font-bold'>{dataEventDetails?.eventDetail?.name}</h1>
                                <p><span>Date: </span>{fixedStartDate === fixedEndDate ? fixedStartDate : `${fixedStartDate} - ${fixedEndDate}`}</p>
                                <p><span>Location: </span>{dataEventDetails?.eventDetail?.locationName}</p>
                                <em><span>Address: </span>{dataEventDetails?.eventDetail?.location}</em>
                            </section>
                            <section className='flex gap-3 items-center border-dashed border-t border-t-gray-300 pt-3 w-full'>
                                <div className='rounded-full h-10 w-10 bg-gray-200 border border-gray-300'></div>
                                <hgroup className='flex flex-col gap-1 text-sm'>
                                <h1>Provided by</h1>
                                <h1 className='font-bold'>{dataEventDetails?.eventOrganizer?.companyName}</h1>
                                </hgroup>
                            </section>
                        </section>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="description">
                    <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        {
                            dataEventDetails?.eventDetail?.description ? (
                                dataEventDetails?.eventDetail?.description 
                            ) : ( 
                                <p className='font-bold'>No description</p>
                            )
                        }
                    </CardContent>
                    </Card>
                </TabsContent>
                </Tabs>
        </section>
        <section className='grid grid-cols-3 gap-10'>
            <section id='tickets' className='col-[1/3] flex flex-col gap-10'>
            <h1 className='text-3xl font-bold flex items-center gap-2'>Tickets <IoTicketSharp className='text-yellow-400'/></h1>
               {
                eventDetailsTickets.map((item: any, index: number) => {
                    const qtyIndex = addToCart.indexOf(addToCart[`${item.id}`])

                    return (
                        <section key={index} className='ticket text-sm rounded-2xl bg-white drop-shadow-lg flex flex-col gap-4 p-5'>
                            <h1 className='text-xl font-bold'>{item?.name}</h1>
                            <p className='text-gray-600'>Monday, 17 Nov 2024 07:00 - 12:00</p>
                            <p>Ticket sale ended at {new Date(item.endDate).toUTCString().split(' ').slice(0, 4).join(' ')}</p>
                            <section className='pl-5 pt-2 border-t-2 border-dashed border-t-gray-200 flex justify-between'>
                                <h1 className='font-semibold text-lg'>Rp{item.price.toLocaleString("id-ID")}</h1>
                                <div className='flex gap-3 items-center'>
                                    <div className='text-lg border border-gray-200 rounded-lg hover:bg-black transition-[0.5s] cursor-pointer hover:text-white h-7 w-10 flex items-center justify-center' onClick={() => quantityOperator(item.id, item.name, item.price, 'PLUS')}>+</div>
                                    
                                    <div className='text-lg border border-gray-200 rounded-lg hover:bg-black transition-[0.5s] cursor-pointer hover:text-white h-7 w-10 flex items-center justify-center' onClick={() => quantityOperator(item.id, item.name, item.price, "MINUS")}>-</div>
                                </div>
                            </section>
                        </section>
                    )
                })
            }
                </section>
                <section id='book-tickets' className='col-[3/4] flex flex-col gap-2'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Ticket</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* row 1 */}
                        {
                            addToCart.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.qty}</td>
                                        <td>Rp{item.totalPrice.toLocaleString('id-ID')}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            addToCart.length > 0 && (
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Rp{ grandTotal.toLocaleString('id-ID') }</td>
                            </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                {
                    addToCart.length > 0 && (
                        <button className='bg-black text-yellow-400 px-5 py-2 font-bold rounded-lg w-full hover:bg-gray-700 hover:text-yellow-200' >Checkout</button>
                    )
                }
                </section>
        </section>
        <section className='flex flex-col gap-10'>
            <h1 className='text-3xl font-bold flex items-center gap-2'>Ratings and Reviews <MdOutlineStar className='text-yellow-400'/></h1>
            <section className='flex flex-col gap-10 drop-shadow-lg border border-gray-100 py-5 px-10 rounded-xl bg-white'>
                {
                    dataReviewByEvent?.map((item: any, index: number) => {
                        return (
                        <div key={index} className='text-sm flex flex-col gap-5'>
                            <div className='flex items-end justify-between'>
                                <h1 className='font-bold flex items-center gap-2 px-2 rounded-t-lg py-1 border border-gray-400'>{item?.users?.username} <span className='font-light flex'>{
                                    Array.from({length: item.rating}).map((item, index) => {
                                        return (
                                            <MdOutlineStar key={index} className='h-4 w-4 text-yellow-400'/>
                                        )
                                    })
                                    }</span></h1>
                                <div className='w-full h-[1px] bg-gray-400'></div>
                            </div>
                            <p className='border-l border-b rounded-bl-lg px-2 py-1 border-gray-200'><span className='font-bold'>Comment: </span>{item.comments ? item.comments : '-'}</p>
                            <p className='border-l border-b rounded-bl-lg px-2 py-1 border-gray-200'><span className='font-bold'>Feedback: </span>{item.feedback ? item.feedback : '-'}</p>
                            <p className='text-xs w-max flex rounded-t-lg px-2 py-1 border border-gray-400'>{new Date(item.updatedAt).toUTCString().split(' ').slice(0, 4).join(' ')}</p>
                        </div>
                        )
                    })
                }
            </section>
            <Formik
            initialValues={{
                comments: '',
                feedback: '',
                rating: 0
            }}
            validationSchema={reviewValidationSchema}
            onSubmit={(values) => {
                mutateCreateReview(values)
            }}
            >
                {
                    ({setFieldValue}) => (
                    <Form className='flex flex-col gap-5'>
                        <div className='grid w-[30%] gap-3'>
                            <Label htmlFor="rating">Rating</Label>
                            <Input type="number" name='rating' placeholder='1-10' onChange={(e) => setFieldValue('rating', e.target.value)}/>
                            <ErrorMessage name='rating' component={'div'} className='text-red-600 text-xs mt-[-3px]'/>
                        </div>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="message">Comment</Label>
                            <Textarea name='comments' placeholder="Type your comment here..." id="comment" onChange={(e) => setFieldValue('comments', e.target.value)}/>
                        </div>
                        <div className="grid w-full gap-2">
                            <Label htmlFor="message">Feedback</Label>
                            <Textarea name='feedback' placeholder="Type your feedback here..." id="feedback" onChange={(e) => setFieldValue('feedback', e.target.value)}/>
                        </div>
                        <Button disabled={isPendingCreateReview} type='submit' className='w-full text-yellow-400'>Create Comments</Button>
                    </Form>
                    )
                }
            </Formik>
        </section>

    </main>
  )
}

export default EventPage
