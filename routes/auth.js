const express=require("express");
const  mongoose=require("mongoose");
const router=express.Router();
const User=mongoose.model("User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config/keys");
const requireLogin=require("../middleware/requireLogin");
const nodemailer=require("nodemailer")

const sendgridTransport=require("nodemailer-sendgrid-transport")

//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
const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))
// 2
//router.get("/protected",requireLogin,(req,res)=> {
 //   res.send("hi this is protected data");
//});

router.post("/signup",(req,res)=> {
    const{name,email,password}=req.body;
    if(!email || !password || !name) {
        return res.status(404).json({error:"please fill all the filled"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
     //   console.log(`saved user is  ${savedUser}`);
        if(savedUser){
            return res.status(404).json({error:"user exist"});
        }
        //bcrypt password
        bcrypt.hash(password,10)
        .then((hashedpassword)=>{
                 //save data in mongoose
           const user=new User({
        
              name:name,
              email:email,
              password:hashedpassword
             })
             user.save()
             .then(user=>{
                 //sending mail on forget password
                 transporter.sendMail({
                     to:user.email,
                     from:"no-reply@face.com",
                     subject:"signup success",
                     html:'<h1>welcome to facebook</h1>'
                 })
                 res.json({message:"saved succesfully"})
              })
             .catch(err=>{
                  console.log(err)
              })
         })
        
    })
    .catch(err=>{
        console.log(err);
            
        
    })
});

router.post("/signin",(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password)
        {
        return res.status(422).json({error:"please enter email and password"})
        }
    User.findOne({email:email})
    .then(savedUser=>{
         if(!email)
           {
           return res.status(422).json({error:"User does not exist . please signup first"})
           } 
         bcrypt.compare(password,savedUser.password)
         .then(doMatch=>{
             //domatch tells either true or false
            // console.log(`domatch : ${doMatch}`)
               if(doMatch)
               {
                   // 1
                   //res.json({message:"successfully signin"})
                   //generating token with sign() function . secret key generat in keys.js and require in auth.js
                   const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                   const {_id,name,email}=savedUser
                   res.json({token:token,user:{_id,email,name}});
                    
               }
               else
               {
                return res.status(422).json({error:"Invalid email and passwoed !"}) 
               }
              })
         .catch(err=>{
             console.log(err);
         })
         })   
})
module.exports=router;