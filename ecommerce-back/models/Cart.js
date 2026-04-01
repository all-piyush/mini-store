const mongoose=require('mongoose');
const user  = require('../models/User');
const productschema=new mongoose.Schema({
    product_id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    subcategory:{
        type:String,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    bestseller:{
        type:Boolean,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    sizes:{
       type:[String],
       required:true, 
    },
},{timestamps:true})
const cartschema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    products:[{
        product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    }}],
    createdat:{
        type:Date,
        default:Date.now,
    }
})
const Cart=mongoose.model("Cart",cartschema);
const Product=mongoose.model("Product",productschema);
module.exports={Cart,Product};