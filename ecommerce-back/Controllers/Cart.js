const {Cart,Product}=require('../models/Cart');
const user=require('../models/User')
exports.addproduct=async(req,res)=>{
    try{
        const id=req.body.id;
        const user_id=req.user.id;
        const usercart=await Cart.findOne({user:user_id});
        if(!usercart){
            return res.status(400).json({
                success:false,
                message:"Unable To Find User"
            })
        }
        else{ 
            try{
            let prod=await Product.findOne({product_id:id})
            if(!prod){
                return res.status(400).json({
                    message:"Unable To Find Product",
                    success:false,
                })
            }
            const existingprod=usercart.products.find(item=> item.product.toString()===prod._id.toString());
            if(existingprod){
                existingprod.quantity+=1;
            }
            else{
                usercart.products.push({product:prod._id,quantity:1});
            }
        await usercart.save();
            }
            catch(error){
                return res.status(400).json({
                    message:"unable to add",
                    success:false,
                })
            }
        return res.status(200).json({
            success:true,
            message:"cart added successfully", 
        })   
    }
}
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            
            message:"Internal Servor Error"
        })
    }
}
exports.deleteproduct=async(req,res)=>{
    try{
        const productid=req.body.id;
        const user_id=req.user.id;
        const usercart=await Cart.findOne({user:user_id});
        if(!usercart){
            return res.status(400).json({
                success:false,
                message:"Unable To Find User"
            })
        }
        const prod=await Product.findOne({product_id:productid});
        for(const item of usercart.products){
            if(item.product.toString()=== prod._id.toString()){
                const avaliable=item.quantity;
                if(avaliable>1){
                    item.quantity=avaliable-1;
                }
                else{
                    usercart.products=usercart.products.filter(item=>item.product.toString()!==prod._id.toString());
                }
            }
        }
        await usercart.save();
        return res.status(200).json({
            success:true,
            message:"product removed successfully", 
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Internal Servor Error"
        })
    }
}
exports.getcart=async(req,res)=>{
    try{
        const user_id=req.user.id;
        const user_cart=await Cart.findOne({user:user_id});
        let product_array=[];
            for(const item of user_cart.products){
                const prod=await Product.findById(item.product);
                const obj={product_id:prod.product_id,name:prod.name,
                category:prod.category,subcategory:prod.subcategory,date:prod.date,bestseller:prod.bestseller,
                price:prod.price,description:prod.description,sizes:prod.sizes,count:item.quantity,image:prod.image};
                product_array=[...product_array,obj];
            }
            
        return res.status(200).json({
            message:"Cart found successfully",
            success:true,
            data:product_array
        })
        
    }
    catch(error){
        return res.status(400).json({
            message:"Internal Server Error",
            success:false
        })
    }
}