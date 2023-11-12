import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import BooklingInfo from "../components/BooklingInfo";
import PlaceGallery from "../components/PlaceGallery";

export default function BookingPage(){
    const {id} = useParams();
    const [booking,setBooking] = useState(null);
  
    useEffect(()=>{
      if (id){
        axios.get('/booking/bookings').then((response)=>{
          const foundBooking=response.data.find(({_id})=>_id===id);
          if(foundBooking){
            setBooking(foundBooking);
          }
        })
      }

    },[id]);
    
    if(!booking){
        return "";
    }
    return (
        <div className="my-8 text-left mx-80">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-4 block">{booking.place.address}</AddressLink>
            <div className="">
                <div className="bg-gray-200 rounded-xl p-1 my-6">
                    <h2 className="font-semibold text-xl m-4 ml-2">Your booking information:</h2>
                    <BooklingInfo booking={booking} className={""}></BooklingInfo>
                </div>

                <PlaceGallery place={booking.place}></PlaceGallery>
            </div>
        </div>
    )
}