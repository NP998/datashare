const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config/keys");
const mongoose=require("mongoose");
const User=mongoose.model("User");

module.exports=(req,res,next)=>{
    const {authorization}=req.headers
    //looks like authorization=Baerer secret_key
    if(!authorization)
     {
      return res.status(401).json({error:"you must be logged in"})
     }
      const token=authorization.replace("Bearer " ,"")
      jwt.verify(token,JWT_SECRET,(err,payload)=>{
                              if(err)
                              {
                                return res.status(402).json({error:"you must be logged in"})   
                              }
                              //destructering
                              const {_id}=payload
                              //here User is basically model
                              User.findById(_id).then(userdata=>{
                                                         req.user=userdata
                                                         next()
                                                       })
                             
                })
      
}