const mongoose=require("mongoose");
//schema for use signup
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const User=new mongoose.model("User",userSchema);
module.exports=User;
