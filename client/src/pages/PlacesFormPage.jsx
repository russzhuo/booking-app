import AccountNav from "../components/AccountNav";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
import Image from "../components/Image";

export default function PlacesFormPage() {
    const { id } = useParams();
    
    const params=useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        console.log({params});

        if(!id){
            return;
        }

        axios.get('/places/places/'+id).then(response=>{
            const {data}=response;
            setTitle(data.title);
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description);
            setPerks(data.perks)
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut);
            setMaxGuests(data.setMaxGuests);
            setPrice(data.price);
        })
    },[id])

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4 text-left">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm text-left">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    
    const savePlace = async (ev) => {
        ev.preventDefault();
        const placeData={
            title,address,addedPhotos,
            description,perks,extraInfo,
            checkIn,checkOut,maxGuests,
            price
        };
        console.log({id})

        if(id){
            await axios.put('/places/places',{id,...placeData}).then((response)=>console.log(response.data));
            setRedirect(true);
        }else{
            await axios.post('/places/places',placeData).then((response)=>console.log(response.data));
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}></Navigate>
    }

    return (
        <div className="mx-72">
            <AccountNav />
            <form onSubmit={savePlace} >
                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: My lovely apt" />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />
                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos}></PhotosUploader>
                {preInput('Description', 'description of the place')}
                <textarea rows='5' cols='7' className='border resize-none rounded-xl w-full px-3 py-1' value={description} onChange={ev => setDescription(ev.target.value)} />
                {preInput('What this place offers', 'select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks}></Perks>
                {preInput('Extra info', 'house rules, etc')}
                <textarea rows='3' cols='7' className='border resize-none rounded-xl w-full px-3 py-1' value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                {preInput('Check in & out times', 'add check in and out times, remember to have some tiem window for cleaning the room between guests')}
                <div className="grid sm:grid-cols-3 text-left gap-2 border">
                    <div className="mt-2 -mb-1">
                        <h3>Check in time</h3>
                        <input type="text" placeholder="14:00" value={checkIn} onChange={ev=>setCheckIn(ev.target.value)}></input>
                    </div>

                    <div className="mt-2 -mb-1">
                        <h3>Check out time</h3>
                        <input type="text" placeholder="10:00" value={checkOut} onChange={ev=>setCheckOut(ev.target.value)}></input>
                    </div>

                    <div className="mt-2 -mb-1">
                        <h3>Max number of guests</h3>
                        <input type="text" placeholder="6, etc" value={maxGuests} onChange={ev=>setMaxGuests(ev.target.value)}></input>

                    </div>

                    <div className="mt-2 -mb-1">
                        <h3>Price</h3>
                        <input type="text" placeholder="250, etc" value={price} onChange={ev=>setPrice(ev.target.value)}></input>
                    </div>

                </div>
                <button className="primary my-4 py-4">Save</button>
            </form>
        </div>

    )
}   