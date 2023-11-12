import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceGallery from "../components/PlaceGallery";
import BookingWidget from "../components/BookingWidget";
// import BookingWidget from "../BookingWidget";
// import PlaceGallery from "../PlaceGallery";
// import AddressLink from "../AddressLink";
import Perks from "../components/Perks";
import AddressLink from "../components/AddressLink";
export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    console.log(id)
    if (!id) {
      return;
    }
    axios.get(`/places/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return '';

  return (
    <div className="mt-4  mx-56 px-8 pt-8">
      <h1 className="text-4xl font-semibold text-left mx-2">{place.title}</h1>
      <AddressLink className="my-4">{place.address}</AddressLink>
      <PlaceGallery place={place}></PlaceGallery>
      <div className="mt-8 mb-8 grid gap-10 grid-cols-1 md:grid-cols-[2fr_1fr] ">

        <div className="text-left flex flex-col gap-2">

          <div className="my-4 py-8 ">
            <h2 className="font-semibold text-2xl my-4">Description</h2>
            {place.description}
          </div>

          <div className="pb-14 border-b-2">
            <h2 className="font-semibold">Check-in: <span className="font-normal">{place.checkIn} pm</span></h2>
            <h2 className="font-semibold">Check-out: <span className="font-normal">{place.checkOut} am</span></h2>
            <h2 className="font-semibold">Max number of guests: <span className="font-normal">{place.maxGuests}</span></h2>
          </div>

          <div>
            <div className="py-14 border-b-2">
              <h2 className="font-semibold text-2xl">Extra info</h2>
              <div className="mb-4 mt-2  leading-5">{place.extraInfo}</div>
            </div>
          </div>

          <div className="py-14 border-b-2">
            <h2 className="font-semibold text-2xl pb-6">Perks</h2>
            <Perks selected={place.perks} disabled={true}></Perks>
          </div>

        </div>

        <div className="min-h-screen">
          <BookingWidget place={place}></BookingWidget>
        </div>

      </div>

    </div>
  );
}
