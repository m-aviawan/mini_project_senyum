import React from 'react'

const EventPage = () => {
  return (
    <main>
        <section className='grid grid-cols-3 gap-10'>
            <figure className="event-image col-[1/3] bg-blue-300 rounded-lg h-[300px]"></figure>
            <section className="event-details col-[3/4] bg-white flex flex-col justify-between rounded-xl shadow-lg p-6">
                <section className='flex flex-col gap-1'>
                    <h1 className='mb-6 text-lg font-bold'>Jakarta Doodle Vest</h1>
                    <p>01 - 03 Nov 2024</p>
                    <p>10:00 - 17:00</p>
                    <p>Pacific Century Place Floor 35, Jakarta</p>
                </section>
                <section className='flex gap-3 items-center border-dashed border-t border-t-gray-300 pt-3 w-full'>
                    <div className='rounded-full h-10 w-10 bg-blue-500'></div>
                    <hgroup className='flex flex-col gap-1 text-sm'>
                    <h1>Provided by</h1>
                    <h1 className='font-bold'>Wahana Impian Jaya Ancol</h1>
                    </hgroup>
                </section>
            </section>
            
            <section>
               
            </section>

        </section>
        <section className='grid grid-cols-3 gap-10'>
                <section id='book-tickets' className='col-[3/4]'>
                    
                </section>
                <section id='tickets' className='col-[1/3] flex flex-col gap-3'>
                    <section className='ticket bg-blue-200 border border-blue-600 flex flex-col gap-5 p-5 rounded-lg'>
                        <h1 className='text-xl font-bold'>Day 1 Opening Ceremony</h1>
                        <p className='text-gray-600'>Monday, 17 Nov 2024 07:00 - 12:00</p>
                        <p>Ticket sale ended at Saturday, 15 Nov 2024 10:00</p>
                        <section className='p-3 border-t border-dashed border-t-blue-600 flex justify-between'>
                            <h1 className='font-bold'>Rp50.000</h1>
                            <div className='flex gap-3 items-center'>
                                <div className='rounded-full border border-blue-600 hover:bg-blue-600 transition-[0.5s] cursor-pointer hover:text-white h-7 w-7 flex items-center justify-center'>+</div>
                                <p>1</p>
                                <div className='rounded-full border border-blue-600 hover:bg-blue-600 transition-[0.5s] cursor-pointer hover:text-white h-7 w-7 flex items-center justify-center'>-</div>
                            </div>
                        </section>
                    </section>
                    <section className='ticket bg-blue-200 border border-blue-600 flex flex-col gap-5 p-5 rounded-lg'>
                        <h1 className='text-xl font-bold'>Day 1 Opening Ceremony</h1>
                        <p className='text-gray-600'>Monday, 17 Nov 2024 07:00 - 12:00</p>
                        <p>Ticket sale ended at Saturday, 15 Nov 2024 10:00</p>
                        <section className='p-3 border-t border-dashed border-t-blue-600 flex justify-between'>
                            <h1 className='font-bold'>Rp50.000</h1>
                            <div className='flex gap-3 items-center'>
                                <div className='rounded-full border border-blue-600 hover:bg-blue-600 transition-[0.5s] cursor-pointer hover:text-white h-7 w-7 flex items-center justify-center'>+</div>
                                <p>1</p>
                                <div className='rounded-full border border-blue-600 hover:bg-blue-600 transition-[0.5s] cursor-pointer hover:text-white h-7 w-7 flex items-center justify-center'>-</div>
                            </div>
                        </section>
                    </section>
                    <section className='ticket bg-blue-200 border border-blue-600 flex flex-col gap-5 p-5 rounded-lg'>
                        <h1 className='text-xl font-bold'>Day 1 Opening Ceremony</h1>
                        <p className='text-gray-600'>Monday, 17 Nov 2024 07:00 - 12:00</p>
                        <p>Ticket sale ended at Saturday, 15 Nov 2024 10:00</p>
                        <section className='p-3 border-t border-dashed border-t-blue-600 flex justify-between'>
                            <h1 className='font-bold'>Rp50.000</h1>
                            <div className='flex gap-3 items-center'>
                                <div className='rounded-full border border-blue-600 hover:bg-blue-600 transition-[0.5s] cursor-pointer hover:text-white h-7 w-7 flex items-center justify-center'>+</div>
                                <p>1</p>
                                <div className='rounded-full border border-blue-600 hover:bg-blue-600 transition-[0.5s] cursor-pointer hover:text-white h-7 w-7 flex items-center justify-center'>-</div>
                            </div>
                        </section>
                    </section>
                </section>
            </section>
    </main>
  )
}

export default EventPage
