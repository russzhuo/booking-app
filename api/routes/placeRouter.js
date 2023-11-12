const express = require('express')
const multer = require('multer')
const {
    // postUploadPhotosByLink,
    // postUpload,
    getUserPlaces,
    postPlace,
    getPlaces,
    getPlacesById,
    putPlace

} = require('../controllers/place')

const router = express.Router();

router.post('/places',postPlace)
router.get('/places',getPlaces)
router.get('/user-places',getUserPlaces)
router.get('/places/:id',getPlacesById)
router.put('/places',putPlace)


module.exports = router;

