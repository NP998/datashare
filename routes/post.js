const express=require("express");
const  mongoose=require("mongoose");
const router=express.Router();
const requireLogin=require("../middleware/requireLogin");
const Post=mongoose.model("Post")

//find all post and show on home screen
router.get("/allpost",requireLogin,(req,res)=>{
    Post.find()
    //postedBy property show only id so use populate method for showing all property of user
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts:posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

//find the client who post
router.post("/createpost",requireLogin,(req,res)=>{
      const {title,body,pic}=req.body
      console.log(pic)
      if(!title || !body || !pic)
      {
        return  res.status(422).json({error:"Please fill all the field"})
      }
      //not post password so that
      req.user.password=undefined
     // console.log(req.user)
     // res.send("ok");
     const post=new Post({
          title:title,
          body:body,
          photo:pic,
          postedBy:req.user
      })
     post.save().then(result=>{
         res.json({post:result})
     })
     .catch(err=>{
         console.log(err)
     })
    })

router.get("/mypost",requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost:mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})    


module.exports=router