import { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../components/Image";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './IndexPage.css';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';



export default function IndexPage() {

    const [places,setPlaces] = useState([]);
    const [isHovered,setIsHovered]=useState(-1);

    useEffect(()=>{
        axios.get('/places/places').then(({data})=>{
            console.log(data)
            setPlaces(data);
            
        })
        
    },[]);

    
    return (
        <div className="mt-4 gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
{/* onMouseEnter={()=>setIsHovered(index)} onMouseLeave={()=>setIsHovered(-1)} */}
            {
                places.length>0 && places.map((place,index)=>(
                    <Link key={index} to={'/places/'+place._id} className="index-link"  >
                        <Swiper
                            style={{
                                "--swiper-navigation-size": "15px",
                                }}
                            cssMode={true}
                            pagination={true}
                            // mousewheel={true}
                            // keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            // navigation={isHovered===index? true : false}
                            navigation={true}
                        >

                            {place.photos.map(photo=>
                                <SwiperSlide className=""> 
                                    {/* <button disabled="true" className="absolute right-4 bottom-28">test</button>                             
                                    <button disabled="true" className="absolute left-4 bottom-28">test</button>                              */}

                                    <Image className="rounded-2xl object-cover aspect-square" src={photo}></Image>
                                </SwiperSlide>
                            )}
                        </Swiper>

                        {/* <Image className="mb-3 rounded-2xl object-cover aspect-square" src={place.photos?.[0]}></Image> */}
                        {/* h1 h2 h3 h4 change*/}
                        <h2 className="text-left text-sm- font-bold">{place.title}</h2>
                        <h3 className="text-left text-sm text-gray-500">{place.address}</h3>
                        <h3 className="mt-1 text-left text-sm font-bold">${place.price} HKD/night</h3>
                    </Link>
                ))
            }
        
        </div>

    )
}   