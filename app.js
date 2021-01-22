
const express=require("express");
const app=express();
const port=process.env.PORT || 8000;
const mongoose=require("mongoose");
const {MONGOURI}=require("./config/keys");



mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    
});

mongoose.connection.on('connected',()=>{
    console.log("connection succesfully");
});
mongoose.connection.on('error',(err)=>{
    console.log("connection failed !..",err);
});

require("./models/user");
require("./models/post")

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"))
app.use(require("./routes/user.js"))

// for hosting.. 
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(port,()=>{
    console.log(`server listen at port number ${port}`);
});
