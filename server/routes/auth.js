const express=require('express');
const router=express.Router();
const User= require('../models/User');
const tempUser= require('../models/tempUser');
const bcrypt= require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET="cognifyz";
const nodemailer = require('nodemailer');



//Route 0 for email verification
router.post('/sendOtp',async (req,res)=>{
const email=req.query.email;
console.log("i am called")
let user=await User.findOne({email})
if(user){
    return res.status(400).json({msg:"Email already exists"})
}
let otp = Math.floor(1000 + Math.random() * 9000);
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'process.env.gmail',
      pass: 'process.env.appPass'
    }
  });
  
var mailOptions = {
    from: 'process.env.gmail',
    to: `${email}`,
    subject: 'Keeper',
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="text-align: center; color: #4CAF50;">Welcome to 📒 Keeper</h2>
            <p style="font-size: 16px; color: #333;">Thank you for registering with Keeper. Your one-time password (OTP) is:</p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #4CAF50;">${otp}</span>
            </div>
            <p style="font-size: 14px; color: #555;">Please use this OTP to complete your registration. If you did not request this, please ignore this email.</p>
            <p style="font-size: 14px; color: #555;">Thank you,<br/>The Keeper Team</p>
        </div>
    `
};
  otp=toString(otp);
  transporter.sendMail(mailOptions, async function(error, info){
    if (error) {
      console.log(error);
    } else {
    //   console.log('Email sent: ' + info.response);
      const salt=await bcrypt.genSalt(10);
      const encOtp=await bcrypt.hash(otp,salt)
   
        let tmpuser= new tempUser({
        email,
        otp:encOtp
    }) 
    await tmpuser.save().then(()=>{
        console.log("added")
        res.json({msg:"otp sended succesfully",status:true})
    })
    }
  });

})



router.post('/verifyOtp',async (req,res)=>{
    const email=req.query.email;
    const otp=req.query.otp;
    try{
    let user=await tempUser.findOne({email})
    if(!user){
        return res.status(400).json({msg:"Please try to login with correct credentials"})
    }
    const otpCompare=await bcrypt.compare(user.otp,otp)
  if(!otpCompare)
        res.json({status:true,msg:"Successfully Login"})
    else
    res.json({a:"jbh"})
    
} catch (error) {
    console.log(error.message)
    res.status(500).send({msg:"Internal server error occured"})
}

})




router.post('/createUser',async (req,res)=>{
    let signup=false
  
    let user=await User.findOne({email:req.query.email})
    if(user){
        return res.status(400).json({msg:"Email already exists"})
    }
    // Password hashing
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.query.password,salt)
    
    // User Creation
    user=await new User({
        name:req.query.name,
        email:req.query.email,
        password:secPass,
    }) 
    const data={
        user:{
            id:user.id
        }
    }
    user.save().then(()=>{
        const authToken =jwt.sign(data,JWT_SECRET);
        signup=true
        // console.log(authToken)
        res.json({authToken,signup,msg:"User Created Successfully"})
    })
})

router.post('/loginUser',async (req,res)=>{
    let login=false
   
    const {email,password}=req.query
    try {
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"Please try to login with correct credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare)
        {
            return res.status(400).json({msg:"Please try to login with correct credentials"})
        }
        login=true
        const data={
            user:{
                id:user.id
            }
        }
            const authToken =jwt.sign(data,JWT_SECRET);
            res.json({authToken,login,msg:"Successfully Login",user_Id:user.id,name:user.name,email})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send({msg:"Internal server error occured"})
    }
})

module.exports=router