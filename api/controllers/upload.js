const multer = require('multer')
const imageDownloader= require("image-downloader")
const path_module = require('path');
const fs = require('fs');

const postUploadPhotosByLink = async (req, res)=>{
    const {link} = req.body;
    console.log({link})
    const newName=Date.now()+'_upload.jpg';
    try{
        await imageDownloader.image({
            url:link,
            dest:path_module.resolve('./')+'/uploads/'+newName,
        });
        res.json(newName);
    
    }catch(e){
        console.log(e)
        res.json('failed to upload')
    }
}

const postUpload = async (req,res)=>{
    // console.log({req})
    const uploadedFiles=[];
    // console.log(req.files)

    console.log({"length":req.files.length})
    
    for (let i =0;i<req.files.length;i++){
        const {filename}=req.files[i];
        const {path,originalname,mimetype} = req.files[i];
        const parts = originalname.split('.');
        const ext=parts[parts.length-1]
        const newPath = path +'.'+ext;
        console.log({path,originalname,mimetype,parts,newPath,ext})

        fs.renameSync(path,newPath);
        uploadedFiles.push(path_module.basename(newPath))
        
    }
    // console.log(uploadedFiles)
    res.json(uploadedFiles);

}

const uploadPhotosMiddleware=(req, res, next)=>{
    const upload = multer({ dest: 'uploads' }).array('photos', 100);
    upload(req,res,function(err){
        if(err instanceof multer.MulterError){
            console.log(err)
        }else if(err){
            console.log(err)
        }
        next()
    })
}


module.exports={
    postUploadPhotosByLink,
    postUpload,
    uploadPhotosMiddleware
}