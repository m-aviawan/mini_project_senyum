import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className='flex flex-col gap-12'>
      <section className='grid grid-cols-4 gap-12'>

        <section className='flex flex-col items-start bg-white rounded-md overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-10 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-md overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-10 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-md overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-10 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
        <section className='flex flex-col items-start bg-white rounded-md overflow-hidden drop-shadow-lg'>
          <div className='h-[200px] bg-orange-400 w-full'>

          </div>
          <section className='flex flex-col p-3 text-sm gap-2 w-full'>
            <article className='flex flex-col gap-2'>
              <h1>Dufan</h1>
              <p className='text-gray-600'>08 Oct 2024 - 20 Dec 2024</p>
              <p className='font-bold'>Rp75.000</p>
            </article>
            <section className='flex gap-3 items-center border-t border-t-gray-300 pt-3 w-full'>
              <div className='rounded-full h-10 w-10 bg-red-500'></div>
              <h1>Wahana Impian Jaya Ancol</h1>
            </section>
          </section>
        </section>
      </section>
      <section className='bg-purple-600 h-[300px] rounded-md flex items-center justify-center gap-12 px-10'>
        <div className='bg-white rounded-md h-[150px] w-full'></div>
        <div className='bg-white rounded-md h-[150px] w-full'></div>
        <div className='bg-white rounded-md h-[150px] w-full'></div>
      </section>
      <section className='flex gap-5'>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
        <div className='bg-blue-900 rounded-2xl h-[400px] w-[280px] drop-shadow-lg'></div>
      </section>
      <section className='flex gap-5'>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
        <div className='bg-green-700 rounded-full h-[100px] w-[100px]'></div>
      </section>
      <section className='flex gap-5'>
        <div className='bg-teal-700 rounded-xl h-[120px] w-[120px] p-3 flex items-end justify-center text-center text-sm font-bold'>
          <p className='text-white drop-shadow-md'>Wahana</p>
        </div>
        <div className='bg-teal-700 rounded-xl h-[120px] w-[120px] p-3 flex items-end justify-center text-center text-sm font-bold'>
          <p className='text-white drop-shadow-md'>Akomodasi</p>
        </div>
        <div className='bg-teal-700 rounded-xl h-[120px] w-[120px] p-3 flex items-end justify-center text-center text-sm font-bold'>
          <p className='text-white drop-shadow-md'>Taman Bermain</p>
        </div>
      </section>
    </main>
  )
}
