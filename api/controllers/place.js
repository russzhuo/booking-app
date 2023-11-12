const PlaceModel = require('../models/Place')
const jwt = require('jsonwebtoken');
const { urlencoded } = require("express");
const jwt_key = process.env.JWT_KEY || '123456789abcdefg'
const redisClient = require("../db/redis");

// const postUploadPhotosByLink = async (req, res)=>{
//     const {link} = req.body;
//     console.log({link})
//     const newName=Date.now()+'_upload.jpg';
//     try{
//         await imageDownloader.image({
//             url:link,
//             dest:path_module.resolve('./')+'/uploads/'+newName,
//         });
//         res.json(newName);
    
//     }catch(e){
//         console.log(e)
//         res.json('failed to upload')
//     }
// }

// const postUpload = async (req,res)=>{
//     // console.log({req})
//     const uploadedFiles=[];
//     // console.log(req.files)

//     console.log({"length":req.files.length})
    
//     for (let i =0;i<req.files.length;i++){
//         const {filename}=req.files[i];
//         const {path,originalname,mimetype} = req.files[i];
//         const parts = originalname.split('.');
//         const ext=parts[parts.length-1]
//         const newPath = path +'.'+ext;
//         console.log({path,originalname,mimetype,parts,newPath,ext})

//         fs.renameSync(path,newPath);
//         uploadedFiles.push(path_module.basename(newPath))
        
//     }
//     // console.log(uploadedFiles)
//     res.json(uploadedFiles);

// }

const getPlacesById = async (req,res)=>{
    try {
        const {id}=req.params;
        const placeDoc=await PlaceModel.findById(id)
        console.log(placeDoc)
        res.json(placeDoc);    
    } catch (error) {
        console.log(err);
        res.json(err)
    }
}

const getPlaces=async (req,res)=>{
    try {
        const places= await PlaceModel.find({},
            //select only specific fields
            {_id:1,photos:1,price:1,address:1,title:1})
        res.json(places);

    } catch (error) {
        console.log(err);
        res.json(err)
    }

}

const getUserPlaces=async(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,jwt_key,{},async(err,userData)=>{
        if (err) throw err;
        
        const {id}=userData;

        const key = `get_user_places_${id}`

        let placeDoc;

        try {
            if(await redisClient.exists(key)){
                placeDoc = JSON.parse(await redisClient.get(key));
                
                console.log("The requested data exists in redis cache")
                
            }else{
                placeDoc=await PlaceModel.find({owner:id});
                redisClient.set(key,placeDoc,1800)
            }
    
        } catch (error) {
            console.log(error)
        }

        // console.log(placeDoc)
        res.json(placeDoc);
    })
}

const postPlace=async (req,res)=>{
    const {token}=req.cookies;
    const {
        title, address,addedPhotos,
        description,price,perks,
        extraInfo,checkIn,checkOut,maxGuests
    }=req.body;

    jwt.verify(token,jwt_key,{},async (err,userData)=>{
        if (err) {
            res.json('authentication failed')
            throw err;
        };

        
        try {
            const placeDoc=await PlaceModel.create({
                owner:userData.id,price,
                title,address,photos:addedPhotos,description,
                perks,extraInfo,checkIn,checkOut,maxGuests,
            });

            //clear redis cache (user places)
            const key = `get_user_places_${userData.id}`
            await redisClient.remove(key)

            res.json(placeDoc)

        } catch (error) {
            console.log(error)
        }
        
    })
}

const putPlace=async(req,res)=>{
    const {token} = req.cookies;
    const {
      id, title,address,addedPhotos,description,
      perks,extraInfo,checkIn,checkOut,maxGuests,price,
    } = req.body;
    
    jwt.verify(token, jwt_key, {}, async (err, userData) => {
        if (err) {
            res.json('authentication failed')
            throw err;
        };

        const placeDoc = await PlaceModel.findById(id);

        if (userData.id === placeDoc.owner.toString()) {
            try{
                placeDoc.set({
                    title,address,photos:addedPhotos,description,
                    perks,extraInfo,checkIn,checkOut,maxGuests,price,
                  });
                  await placeDoc.save();

                //clear redis cache (user places)
                  const key = `get_user_places_${userData.id}`
                  await redisClient.remove(key)
                  
                  res.json('place information updated');
            }catch(e){
                res.json('failed to update place information')
            }
        }
      });
    
}

module.exports={
    // postUploadPhotosByLink,
    // postUpload,
    getUserPlaces,
    postPlace,
    getPlaces,
    getPlacesById,
    putPlace
}