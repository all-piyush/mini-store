const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{
        type:String,
        maxLength:50,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})
module.exports=mongoose.model("User",userschema);