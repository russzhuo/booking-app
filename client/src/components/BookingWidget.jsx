import { useContext, useEffect, useRef, useState } from 'react';
import './BookingWidget.css';
import { UserContext } from '../UserContext';
import axios from 'axios';
export default function BookingWidget({place}){
    
    const [checkIn,setCheckIn] = useState("");
    const [checkOut,setCheckOut] = useState("");
    const [guests,setGuests] = useState(0);    
    const [name,setName] = useState("");
    const [phone,setPhone]=useState("");
    const {user} = useContext(UserContext);


    let cleaningFee=0;
    let airbnbServiceFee= 0;
    let placeCharge= 0;
    let total= 0.0;
    let numbOfNights=0;

    if (checkIn && checkOut){
        console.log(place.price)
        numbOfNights=calcDateDiffInDays(checkIn,checkOut);
        placeCharge=place.price*numbOfNights;
        cleaningFee=placeCharge*0.12
        airbnbServiceFee=placeCharge*0.05
        total=placeCharge+cleaningFee+airbnbServiceFee
    }

    function calcDateDiffInDays(checkIn,checkOut) {
        const a = new Date(checkIn);
        const b = new Date(checkOut);

        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // Discard the time and time-zone information.
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }
      
    useEffect(()=>{
        if (checkIn==="" || checkOut==="" || guests===0){
            return;
        }

    },[])

    const handleBookingSubmit= async(ev)=>{

        ev.preventDefault();
        console.log(user)
        const booking={place:place._id,user:user._id || user.id,checkIn,checkOut,guests,price:total};


        try {
          await axios.post('/booking/booking',booking);
          alert('Your booking has been placed!');
        } catch (e) {
          console.log(e)
          alert('Failed to process this booking.');
        }
    
    }
    
    return(
        <div className="booking-widget-wrapper">
            <h2 className='price text-lg font-semibold'>Price: ${place.price}/per night</h2>
            
            <form className="booking-form-container">
                <div className='booking-form-dates'>
                    <div className='check-in text-left'>
                        <label className='text-sm'>Check in:</label>
                        <input type="date" onChange={(ev)=>setCheckIn(ev.target.value)}></input>
                    </div>

                    <div className='check-out text-left'>
                        <label className='text-sm'>Check out:</label>
                        <input type="date" onChange={(ev)=>setCheckOut(ev.target.value)}></input>
                    </div>

                </div>
                
                <div className="guests text-left">
                    <label className='text-sm'>number of guests:</label>
                            <input type="text" onChange={(ev)=>setGuests(ev.target.value)}></input>
                </div>


            </form>

            <div className="booking-btn">
                <button className='primary' onClick={(ev)=>handleBookingSubmit(ev)}>Book this place</button>
            </div>

            <h2 className='text-medium mb-2'>You won't be charged yet</h2>

            <div className='grid grid-cols-2 pb-5 border-b-2'>
                <div className='text-left underline'>
                    <h3 className='text-medium my-1'>{`$${place.price} HKD x ${numbOfNights} nights`}</h3>
                    <h3 className='text-medium my-1'>Cleaning fee</h3>
                    <h3 className='text-medium my-1'>Airbnb service fee</h3>                    
                </div>

                <div className='text-right'>
                    <h3 className='text-medium my-1'>{`$${placeCharge.toFixed(2)} HKD`}</h3>
                    <h3 className='text-medium my-1'>{`$${cleaningFee.toFixed(2)} HKD`}</h3>
                    <h3 className='text-medium my-1'>{`$${airbnbServiceFee.toFixed(2)} HKD`}</h3>
                </div>
            </div>

            <div className='flex mt-3 justify-between'>
                <h2 className="font-bold">Total before taxes</h2> 
                <h2 className="font-bold">{`$${total.toFixed(2)} HKD`}</h2>
            </div>
            

        </div>
    )
}