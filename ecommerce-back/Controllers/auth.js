const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
require("dotenv").config();
exports.auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"No user Found"
            })
        }
        try{ 
            let decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
        }
        catch(error){
             return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired.",
            });
        }
        next();
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error "
        })
    }
    
}
exports.checkauth = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: req.user 
    });
};