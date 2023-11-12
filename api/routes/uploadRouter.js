const express = require('express')

const router = express.Router();

const {
    postUploadPhotosByLink,
    postUpload,
    uploadPhotosMiddleware
}=require('../controllers/upload')

router.post('/upload-photo-by-link', postUploadPhotosByLink);
router.post('/upload-photo',uploadPhotosMiddleware,postUpload);


module.exports = router;
