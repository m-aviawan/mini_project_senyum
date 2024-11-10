import React from 'react'
import { CalendarIcon, LocationMarkerIcon, ClockIcon } from '@heroicons/react/outline';

const buatEvent = () => {
  return (
    <div className='bg-white w-full h-full'>
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4 border border-gray-300">
      <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500">
            <p>Unggah gambar/poster/banner</p>
            <p className="text-xs">Direkomendasikan 724 x 340px dan tidak lebih dari 2Mb</p>
          </div>
          <div className="text-4xl text-gray-400 mt-2">+</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2">
          <label className="text-gray-700 font-semibold">Nama Event</label>
          <input
            type="text"
            placeholder="Nama Event"
            className="text-black w-full mt-1 p-2 border-b-2 border-gray-3 focus:outline-none focus:border-blue-500 bg-transparent"
          />
        </div>

        <div className="mb-2">
          <label className="text-gray-700 font-semibold">Pilih Kategori</label>
          <select className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-transparent">
            <option value="">Pilih Kategori</option>
            {/* Add other options here */}
          </select>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <LocationMarkerIcon className="h-6 w-6 text-gray-400" />
            </div>
            <span className="text-gray-700">Hafiz Raditia</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-gray-400" />
            <button className="text-blue-600 font-semibold focus:outline-none">Pilih Tanggal</button>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-gray-400" />
            <button className="text-blue-600 font-semibold focus:outline-none">Pilih Waktu</button>
          </div>
          <div className="flex items-center space-x-2">
            <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
            <button className="text-blue-600 font-semibold focus:outline-none">Pilih Lokasi</button>
          </div>
        </div>
      </div>
    </div>

      
    </div>
  )
}

export default buatEvent



