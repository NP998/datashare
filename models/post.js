const mongoose=require("mongoose");

//check who posted 
const {ObjectId}=mongoose.Schema.Types

const postSchema=new mongoose.Schema({
      title:{
          type:String,
          required:true
      },
      body:{
        type:String,
        required:true
      },
      photo:{
        type:String,
        required:true
      },
      postedBy:{
          type:ObjectId,
          ref:"User"//User is a schema name or collection name
      }
})
mongoose.model("Post",postSchema)