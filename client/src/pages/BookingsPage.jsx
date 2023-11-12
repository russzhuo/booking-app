
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import { differenceInBusinessDays } from "date-fns";
import BooklingInfo from "../components/BooklingInfo";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get('/booking/bookings').then(({ data }) => {
      setBookings(data);
      console.log({bookings})
    });
  }, []);

  return (
    <div className="mx-96">
      <AccountNav></AccountNav>
      <div className="flex flex-col   overflow-hidden">
        {bookings?.length > 0 && bookings.map(booking =>
          // {console.log(booking)}

          <Link to={`/account/bookings/${booking._id}`} className="flex bg-gray-200 rounded-2xl mb-8">
            <div className="w-48">
              <PlaceImg place={booking.place} className="m-4"></PlaceImg>
            </div>

            <div className="text-left py-2 px-6 m-4 ">
              <div className="font-bold text-xl -mt-4 pb-2 border-b-2 border-slate-600">{booking.place.title}</div>
              <BooklingInfo booking={booking} className="mb-2 mt-4"></BooklingInfo>
              {/* <div className="text-lg pt-2">
                from<span className="underline font-semibold"> {new Date(booking.checkIn).toDateString()} </span> to <span className="underline font-semibold">{new Date(booking.checkOut).toDateString()} </span>
              </div> */}


            </div>


          </Link>
        )}
      </div>
    </div>
  )
}