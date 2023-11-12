const express = require('express')

const {
    postUserLogin,
    postUserRegister,
    getUserProfile,
    postUserLogout
}=require('../controllers/authentication')

const router = express.Router();


router.post('/register',postUserRegister)
router.post('/login',postUserLogin)
router.post('/logout',postUserLogout)
router.get('/profile',getUserProfile)

module.exports=router;