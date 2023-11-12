import './PlaceGallery.css';
import Image from './Image';
import { useState } from "react";
import Modal from 'react-modal';

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const galleryModal = document.getElementById("galleryModal")
    const customStyles = {

        // content: {
        //   transform: 'translate(-50%, -50%)',

        // '@keyframes move':{
        //     '0%': { opacity: '0' }, 
        //     '100%': { opacity: '1' },
        // }

        // },
    };

    function openModal() {
        setIsOpen(true);
        galleryModal.classList.add('show')
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (

            <div className="placegallery">
                <Modal id="galleryModal"
                isOpen={modalIsOpen}
                contentLabel="Show All Photos Modal"
                style={customStyles}
                className='modal'
            >
                <div className=''>
                        <div className='sticky top-0 pt-4'>
                            <button onClick={() => setIsOpen(false)} className='rounded-3xl p-2 bg-transparent hover:bg-gray-400 ml-6'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>

                        </div>

                    <div className='inline-grid gap-4 pb-3 '>
                            {place?.photos?.length > 0 && place.photos.map(photo => (
                                <div className='mx-96'>
                                    <Image className="w-full h-full hover:brightness-90" src={photo} alt=""></Image>
                                </div>
                            ))}
                    </div>


                </div>
            </Modal>

                <div className='placegallery-item0'>
                    <Image className="w-full h-full rounded-l-3xl"
                        onClick={() => setIsOpen(true)}
                        src={place.photos[0]}></Image>
                </div>
                <div className='placegallery-item1'>
                    <Image className="w-full h-full"
                        onClick={() => setIsOpen(true)}
                        src={place.photos[1]}></Image>
                </div>
                <div className='placegallery-item2'>
                    <Image className="w-full h-full rounded-tr-3xl"
                        onClick={() => setIsOpen(true)}

                        src={place.photos[2]}></Image>
                </div>

                <div className='placegallery-item3'>
                    <Image className="w-full h-full"
                        onClick={() => setIsOpen(true)}

                        src={place.photos[3]}></Image>
                </div>

                <div className='placegallery-item4'>
                    <Image className="w-full h-full rounded-br-3xl"
                        onClick={() => setIsOpen(true)}

                        src={place.photos[4]}></Image>
                </div>

                {/* {place.photos?.map((photo,i)=>{

                <Image className={"placegallry-item"+i} src={photo}></Image>

            })} */}
                {/* <Image className="placegallery-item0 object-cover" src={place.photos[0]}></Image> */}
            </div>
    )
}