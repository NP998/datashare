const express=require("express");
const  mongoose=require("mongoose");
const router=express.Router();
const requireLogin=require("../middleware/requireLogin");
const Post=mongoose.model("Post")
const User=mongoose.model("User")

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id}) //req.param.id is for request user
    .select('-password') //not show password of other user in profile
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(403).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err=>{
        return res.status(404).json({error:"user dosen't exist"})
    })
})







module.exports=router