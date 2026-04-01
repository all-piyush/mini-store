const {Product}=require('../models/Cart');
const user=require('../models/User');

exports.getproducts=async(req,res)=>{
    try{
        const allproducts=await Product.find();
        if(!allproducts){
            return res.status(400).json({
                success:false,
                message:"unable to find products"
            })
        }
        return res.status(200).json({
            success:true,
            products:allproducts,
            message:"fetched products successfully"
        })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            
            message:"Internal Servor Error"
        })
    }
}