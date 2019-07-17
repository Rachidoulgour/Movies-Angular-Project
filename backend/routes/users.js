const router = require('express').Router;
const userModel = require('../models/user');
//const isAutenticated

router.post('/signup', async(req,res)=>{
    try{
        const user = await new userModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).save()
        const token = await user.generateAuthToken()
        res.status(201).send({
            info: "User succesfully created",
            user,
            token
        })
    }catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/all', async(req,res)=>{
    try{
        const users= await userModel.find({})
        res.status(200).send(users)
    }catch(error){
        console.log(error)
        res.status(500).send(error)
    }
});
router.post('/login', async(req,res)=>{
    try{
        const user = await userModel.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(!user) return res.status(400).send('user not found')
        res.send({info:'welcome', user})
    } catch(error){
        res.status(500).send(error)
    }
});
module.exports=router;