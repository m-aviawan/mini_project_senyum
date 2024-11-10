'use client'

import { FaRegCalendarAlt } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { IoSearchCircle } from "react-icons/io5";

const Header = () => {
  const pathName = usePathname()
  if( pathName === '/auth' || pathName === '/auth/register') {
    return (
      <></>
    )
  } else {
    return (
          <nav className="grid grid-cols-5 grid-rows-2 gap-1 bg-yellow-400 p-3">
            <figure className="col-span-1 text-3xl font-bold flex justify-center items-end">
              Senyum
            </figure>
            <section className="col-span-2 w-[80%]">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search..." />
              <IoSearchCircle color="black" size={30}/>
            </label>
            </section>
            <section className="col-span-2 flex gap-5 justify-center items-center">
              <div className="flex gap-1 items-center text-sm font-bold">
                <FaRegCalendarAlt />
                <p>Create event</p>
              </div>
              <div className="flex gap-1 items-center text-sm font-bold">
                <FaEarthAmericas />
                <p>Explore</p>
              </div>
              <section className="flex gap-2 items-center justify-center">
                <button className="py-2 px-4 font-semibold rounded-md hover:scale-90 bg-white text-black">Sign up</button>
                <button className="py-2 px-4 font-semibold rounded-md hover:scale-90 bg-black text-yellow-400">Log in</button>
              </section>
            </section>
            <section className="col-[2/4] flex justify-start gap-3 items-end text-sm font-semibold">
              <p>#Let's go</p>
              <p>#Say no more</p>
              <p>#Aye</p>
              <p>#Ticket-Go</p>
              <p>#Up to Date</p>
            </section>
          </nav>
    )
  }

};

export default Header
