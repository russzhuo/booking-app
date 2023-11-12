import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Modal from "react-modal";
import './Header.css';


export default function Header() {

  const { user } = useContext(UserContext);
  const [profileMenuIsOpen,setProfileMenuIsOpen]=useState(false);

  if(user){
    console.log(user.name)
  }

  return (
    <header className='px-4 py-2 flex justify-between pb-6 border-b-2'>
      <Link to ={'/'} className="flex items-center gap-1 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -rotate-90">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
        <span className='font-bold text-xl'>Home-sharing</span>
      </Link>

      <div className='flex gap-1.5 border border-gray-300 rounded-full py-2 px-4 mx-4 shadow-md shadow-gray-300'>
        <div>Anywhere</div>
        <div className='border-l border-gray-300'></div>
        <div>Any week</div>
        <div className='border-l border-gray-300'></div>
        <div>Add guests</div>


        <button className='bg-primary text-white p-1 rounded-full '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>

      </div>
      
      {/* <button className="hover:shadow hover:scale-105 bg-zinc-50 flex items-center gap-1.5 border border-gray-300 rounded-full py-2 px-4"
              onClick={()=>setProfileMenuIsOpen(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <div className='bg-gray-500  text-white ml-1 border border-gray-500 overflow-hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        {user && (
          <div>
            {user.name}
          </div>
        )}

      </button> */}
{/* 
      <div className="absolute border shadow rounded-xl bg-zinc-50 right-16 top-20 w-56 h-auto text-left flex flex-col gap-2 font-semibold text-base py-4 px-1">
          <div className="hover:bg-gray-100 hover:rounded-2xl py-1 px-6">login</div>
          <div className="hover:bg-gray-100 hover:rounded-2xl py-1 px-6">Sign up</div>
          <div className="border my-1"></div>
          <div className="hover:bg-gray-100 hover:rounded-2xl py-1 px-6 ">Help center</div>
          <div className="hover:bg-gray-100 hover:rounded-2xl py-1 px-6">Feedback</div>

      </div> */}

      <Link to={user ? '/account' : '/login'} 
      className='hover:shadow hover:scale-105 flex items-center gap-1.5 border border-gray-300 rounded-full py-2 px-4'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>

        <div className='bg-gray-500  text-white ml-1 border border-gray-500 overflow-hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 relative">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        {user && (
          <div>
            {user.name}
          </div>
        )
        }
      </Link>
    </header>

  )
}