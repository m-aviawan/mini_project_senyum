'use client'

import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"


const MemberProfileLegalInformationPage = () => {
  return (
    <main className='flex flex-col gap-10'>
        <h1 className='border-b-2 border-b-gray-300 w-full py-1 text-[18px] font-semibold text-gray-600'>
            Legal Information
        </h1>
        <Formik>
            <Form className='flex flex-col gap-7'>
                <section className='text-[15px] gap-5 flex flex-col'>
                    <div className="collapse collapse-arrow bg-white rounded-md drop-shadow-md border border-gray-200">
                        <input type="radio" name="my-accordion-1" defaultChecked />
                        <div className="collapse-title font-semibold text-gray-600 border-b border-b-gray-200 box-border">Individual</div>
                        <div className="collapse-content">
                            <section className='grid grid-cols-2 gap-5 pt-5 text-gray-800'>
                                <section id='id-card' className='flex flex-col gap-5'>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="id-card-picture">Identity Card Picture<span className='text-red-600 ml-2'>*</span></Label>
                                        <Input id="id-card-picture" type="file" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="id-card-num">Identity Card Number<span className='text-red-600 ml-2'>*</span></Label>
                                        <Input type="text" id="id-card-name" placeholder="Identity Card Number (only number)" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="id-card-name">Name (Based on Identity Card)<span className='text-red-600 ml-2'>*</span></Label>
                                        <Input type="text" id="id-card-name" placeholder="Name" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="id-card-address">Address (Based on Identity Card)<span className='text-red-600 ml-2'>*</span></Label>
                                        <Input type="text" id="id-card-address" placeholder="Address" />
                                    </div>
                                </section>
                                <section id='taxpayer-id-num' className='flex flex-col gap-5'>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num-picture">Taxpayer Identification Number Picture</Label>
                                        <Input id="taxpayer-id-num-picture" type="file" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num">Taxpayer Identification Number</Label>
                                        <Input type="text" id="taxpayer-id-num" placeholder="Taxpayer Identification Number (only number)" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num-name">Name (Based on Taxpayer Identification)</Label>
                                        <Input type="text" id="taxpayer-id-num-name" placeholder="Name" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num-address">Address (Based on Taxpayer Identification)</Label>
                                        <Input type="text" id="taxpayer-id-num-address" placeholder="Address" />
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-white rounded-md drop-shadow-md border border-gray-200">
                        <input type="radio" name="my-accordion-1" />
                        <div className="collapse-title font-semibold text-gray-600 border-b border-b-gray-200 box-border">Incorporated Companies</div>
                        <div className="collapse-content">
                            <section className='grid grid-cols-2 gap-5 pt-5 text-gray-800'>                            
                                <section id='taxpayer-id-num' className='flex flex-col gap-5'>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num-picture">Taxpayer Identification Number Picture</Label>
                                        <Input id="taxpayer-id-num-picture" type="file" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num">Taxpayer Identification Number</Label>
                                        <Input type="text" id="taxpayer-id-num" placeholder="Taxpayer Identification Number (only number)" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num-name">Name (Based on Taxpayer Identification)</Label>
                                        <Input type="text" id="taxpayer-id-num-name" placeholder="Name" />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label className="ml-3" htmlFor="taxpayer-id-num-address">Address (Based on Taxpayer Identification)</Label>
                                        <Input type="text" id="taxpayer-id-num-address" placeholder="Address" />
                                    </div>
                                </section>
                            </section>
                        </div>
                    </div>
                </section>
                <section className='flex flex-col gap-6 text-xs text-gray-600'>
                    <article className='text-justify'>
                    Please pay attention to the compatibility between the identity on the Identity Card and Taxpayer Indentification Number. 
                    In the event that there is a discrepancy between the Identity Card and the Taxpayer Indentification Number, 
                    a tax invoice will be issued according to the identity on the Taxpayer Indentification Number. 
                    In the event that the Taxpayer Indentification Number document is not uploaded, you are considered to have no Taxpayer Indentification Number.
                    </article>
                    <section className='pb-3 border-b border-b-gray-300'>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="agreement" />
                            <label
                                htmlFor="agreement"
                                className="pl-3 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-justify"
                            >
                                I hereby declare truthfully that all the information conveyed in all these appendices is true. 
                                If it is found and/or proven to be an error/fraud/forgery of the information 
                                that I conveyed PT. Senyum is exempt from any consequences of the use of such data/documents.
                            </label>
                        </div>
                    </section>
                    <p>
                    Documents that have been uploaded can only be changed by contacting our team. <span className='mx-1 hover:cursor-pointer text-orange-500 hover:text-orange-300'>Contact us.</span>
                    </p>
                    <button className="btn bg-blue-600 hover:bg-blue-400 text-white">Send Document</button>
                </section>
            </Form>
        </Formik>
    </main>
  )
}

export default MemberProfileLegalInformationPage
