import React from 'react'

const DiscoverPage = () => {
  return (
    <main className='flex flex-col gap-12 pl-72'>
      <aside className='overflow-auto fixed p-6 left-0 w-[280px] top-[124px] bg-white border-r border-r-gray-300 h-full'>
        <nav className='flex flex-col pb-28 gap-6'>
          <section className='flex justify-between pl-4 text-[15px] font-medium'>
            <p>Event Online</p>
            <input type="checkbox" className="toggle bg-black scale-[0.65]" defaultChecked />
          </section>
          <div className="collapse collapse-arrow rounded-none border-b border-b-gray-300">
            <input type="checkbox" name="my-accordion-2" defaultChecked/>
            <div className="collapse-title font-medium text-[15px]">Location</div>
            <div className="collapse-content text-sm text-gray-700">
              <ul className='flex flex-col'>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Jakarta</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Tangerang</li>
              </ul>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none">
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title font-medium text-[15px]">Event Type</div>
            <div className="collapse-content text-sm text-gray-700">
              <ul className='flex flex-col'>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Summer</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Winter</li>
              </ul>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none border-b border-b-gray-300">
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title font-medium text-[15px]">Topic</div>
            <div className="collapse-content text-sm text-gray-700">
              <ul className='flex flex-col'>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Education</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Playground</li>
              </ul>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none">
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title font-medium text-[15px]">Date Time</div>
            <div className="collapse-content text-sm text-gray-700">
              <ul className='flex flex-col'>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Today</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Tomorrow</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Weekend</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">This Week</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Next Week</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">This Month</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Next Month</li>
              </ul>
            </div>
          </div>
          <div className="collapse collapse-arrow rounded-none">
            <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title font-medium text-[15px]">Price</div>
            <div className="collapse-content text-sm text-gray-700">
              <ul className='flex flex-col'>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Free</li>
                <li className="hover:shadow-lg hover:border hover:border-gray-100 rounded-md px-5 py-3 cursor-pointer">Paid</li>
              </ul>
            </div>
          </div>
        </nav>
      </aside>
      <section className='grid grid-cols-4 gap-2'>
        <section className='flex flex-col items-start bg-white rounded-xl overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-9 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-xl overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-9 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-xl overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-9 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-xl overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-9 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-xl overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-9 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-xl overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-9 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
    
      </section>
      
    </main>

  )
}

export default DiscoverPage
