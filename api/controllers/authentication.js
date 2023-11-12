const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bcryptSalt = bcrypt.genSaltSync(10);
const jwt_key = process.env.JWT_KEY || '123456789abcdefg'
const redisClient = require("../db/redis");

/* POST /user/register */
const postUserRegister = async (req, res) => {

    const { name, email, password } = req.body;
    console.log(req.body)

    if (!name || !email || !password) {
        res.status(400).json({
            error: true,
            message: "Request body incomplete"
        })
        return;
    }

    try {

        UserModel.findOne({
            email
        }).then(
            (user) => {
                if (user) {
                    return res.status(400).json({ email: "A user has already registered with this email" })
                } else {
                    const newUser = new UserModel({
                        name,
                        email,
                        password: bcrypt.hashSync(password, bcryptSalt),
                    })
                    newUser.save()
                    console.log('user created')

                    return res.status(200).json({ msg: newUser });
                }
            }
        )


    } catch (e) {
        res.status(422).json(e);
    }
}


/* POST /user/login */
const postUserLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: true,
            message: "Request body incomplete"
        })
        return;
    }


    try {

        UserModel.findOne({
            email
        }).then((user) => {
            if (!user) {
                res.status(401).json({
                    error: true,
                    message: "Incorrect email or password"
                })
                return
            }

            const match= bcrypt.compareSync(password, user.password);

            if(!match){
                res.status(401).json({
                    error: true,
                    message: "Incorrect email or password"
                })
                return
            }
            
            console.log("login user:" + user)

            jwt.sign(
                { email: email, id: user._id },
                jwt_key,
                {},
                (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(user);
                }
            )
        })
    }catch(e){
        console.log(e);
        res.status(404).json(e)
    }

}


/* POST /user/logout */
const postUserLogout = async (req, res) => {
    res.cookie('token','').json(true);
}

/* GET /user/profile */
const getUserProfile = async (req,res)=>{
    const {token} =req.cookies;
    if(token){
        jwt.verify(
            token,
            jwt_key,
            {},
            async (err,user)=>{
            if(err) throw err;
            console.log(user.id)
            console.log('profile :'+user)
            const {name,email,id} = await UserModel.findById(user.id);
            res.json({name,email,id});
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    postUserLogin,
    postUserRegister,
    postUserLogout,
    getUserProfile
}

