
const BookingModel = require('../models/Booking')
const jwt = require('jsonwebtoken')
const jwt_key = process.env.JWT_KEY || '123456789abcdefg'
const redisClient = require("../db/redis");

/* POST /booking/booking */
const postBooking = async(req,res)=>{

    try {
        const { place, user, checkIn,checkOut,guests,price } = req.body;

        const bookingDoc=await BookingModel.create({
            place, user, checkIn,checkOut,guests,price
        });
    
        //clear redis cache (user bookings)
        const key = `get_bookings_${userData.id}`
        await redisClient.remove(key)
        
        res.json(bookingDoc)
    
    } catch (error) {
        console.log(error)
    }
}

/* GET /booking/bookings */
const getBookings = async (req,res)=>{
    const {token} =req.cookies;
    if(token){
        jwt.verify(
            token,
            jwt_key,
            {},
            async (err,userData)=>{
            if(err) throw err;

            const key = `get_bookings_${userData.id}`

            let bookingDocs;
            
            try {
                if(await redisClient.exists(key)){
                    bookingDocs = JSON.parse(await redisClient.get(key)) ;
                
                    console.log("The requested data exists in redis cache")
                }else{
                    bookingDocs = await BookingModel.find({user:userData.id}).populate('place');
                    redisClient.set(key,bookingDocs,1800)
                }    
                // console.log(bookingDocs)
                res.json(bookingDocs);
            } catch (error) {
                console.log(error)
            }

        })
    }else{
        res.json(null)
    }

}
module.exports={
    postBooking,
    getBookings
}