const mongoose=require("mongoose");
require("dotenv").config();
const dbconnect=()=>{
        mongoose.connect(process.env.Database_url).
        then(()=>console.log("DB connection successful")).
        catch((error)=>{
            console.log(error);
            process.exit(1);
        })
     
}
module.exports=dbconnect;