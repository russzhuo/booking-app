const express = require('express');
const cors = require("cors");
const app = express();
const User = require('./models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const authRouter=require('./routes/authenticationRouter.js')
const placeRouter=require('./routes/placeRouter.js')
const bookingRouter=require('./routes/bookingRouter.js')
const uploadRouter=require('./routes/uploadRouter.js')

const path=require('path')
require('dotenv').config()


app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}));


app.use(express.static(path.join(__dirname,'uploads')));

app.get('/', function (req, res, next) {
    res.render('index page');
})

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

  
app.use("/user",authRouter)
app.use("/places",placeRouter)
app.use("/booking",bookingRouter)
app.use("/upload",uploadRouter)

module.exports=app;