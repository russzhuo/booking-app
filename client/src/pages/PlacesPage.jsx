import { Link, Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import { useEffect, useState } from "react";
import PlaceImg from "../components/PlaceImg";

import { register } from 'swiper/element/bundle';

register();
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';



export default function PlacesPage() {
  const [places,setPlaces]=useState([])

  useEffect(()=>{
    axios.get('/places/user-places').then(({data})=>{
      console.log(data)
      setPlaces(data)
    });
  },[])

  
  return (
    <div className="mx-72">
      <AccountNav></AccountNav>
      <Link className="inline-flex bg-primary text-white gap-1.5 py-2 px-6 rounded-full" to={'/account/places/new'}>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add new place
      </Link>

      <div className="m-4">
        {places.length>0 && places.map((place,index)=>(
          <Link to={'/account/places/'+place._id} className="p-4 mt-4 grid grid-cols-[1fr_4fr] cursor-pointer gap-8 bg-gray-200 rounded-2xl">
            <div className=" flex items-center justify-center">
              <div className="flex items-center justify-center  shrink-0 w-40 h-32  overflow-hidden">
                <PlaceImg place={place} index={index}>

                </PlaceImg>
              </div>

            </div>
            <div className="">
              <h2 className="text-xl text-left">{place.title}</h2>
              <p className="text-sm mt-2 text-start">{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
}