const express = require('express')
const router  = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { raw } = require('express')
const jwt = require("jsonwebtoken");
const checkLogin = require('../middlewares/checkLogin')


router.get('/findById', checkLogin, async(req, res, next)=>{
    try{

        const user = await User.findById()
        res.status(200).json({
            success : true,
            user : user
        })


    }catch(err){
        console.log(err);
        res.status(500).json({
            success : false,
            msg : 'server error'
        })
        next()
    }
})


router.post('/register',async (req, res, next) =>{
    const { fullname, username, email, password } = req.body

    try{

        let userExist = await User.findOne({email : email})

        if(userExist){
            res.json({
                success : false,
                msg : "user already exist"
            })
        }
        else{
            let user = new User();
            user.fullname = fullname
            user.username = username
            user.email = email

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            let size = 200
            user.avatar = "https://gravatar.com/avatar/?s="+size+'&d=retro';

            await user.save()

            //bellow code generates authorization token


            res.json({
                success : true,
                msg : 'user registered',
                user : user
            })


        }


    }catch(err){
        console.log(err);
    }

})

router.get('/users', checkLogin, async(req, res, next)=>{
    let getAllUser = await User.find()
    res.status(200).json(getAllUser)
})

router.post('/login', async(req, res, next) =>{
    const email = req.body.email
    const password = req.body.password

    try{

        let user = await User.findOne({
            email : email
        }) 

        if(!user){
            res.json({
                success : false,
                msg : 'user not exist'
            })
        }else{
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                res.json({
                    success : false,
                    msg : "invalid password"
                })
            }else{
                const token = jwt.sign({
                    username: user.username, 
                    userId: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1 days"
                })
                res.json({
                    success : true,
                    access_token: token,
                    msg : 'user loged in',
                    user : user
                })
            }
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg : "server error"
        })
    }

})


module.exports = router